# Architecture

Athayog Living Web is a **Next.js 16 (App Router)** application deployed on
Vercel. It is a marketing site plus a small customer account/payment system.
This document explains the pieces and how they fit together.

## High-level diagram

```
Browser (React client)
  │  pages: /, /about-us, /group-classes-indiranagar, /aerial-yoga-indiranagar,
  │         /personal-yoga-training-indiranagar, /ld/* (landing pages), /blogs/*, ...
  │  forms: TanStack Form v1 + Zod   ·   payments: PaymentModal (Razorpay checkout.js)
  │  auth: Firebase Auth (Google popup / Google One Tap / Phone OTP + reCAPTCHA)
  ▼
Next.js server (Vercel, Node runtime)
  ├─ src/proxy.ts ............. route guard for /account (session cookie check)
  ├─ Route handlers (/api/*) .. session, logout, payments, plans, submit-form,
  │                            courses, preview/revalidate/exit-preview
  ├─ Server components ........ pages render content; some read Firestore (plans)
  └─ server-only libs ......... firebaseAdmin (Admin SDK), razorpay, forms/email
  ▼
External services
  ├─ Firebase Auth ............ identity (Google, phone)
  ├─ Firestore ............... users, plans, payments, form collections, uploads metadata
  ├─ Firebase Storage ........ resume/file uploads (uploads/)
  ├─ Razorpay ................ orders, checkout, webhooks
  ├─ Prismic ................. blog content (CMS), previews, revalidation
  └─ Resend .................. form-submission emails
```

## Tech stack

| Layer         | Technology                                                        |
| ------------- | ----------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack, React 19, React Compiler)      |
| Language      | TypeScript                                                        |
| Styling       | CSS custom properties (design tokens) + CSS Modules (no Tailwind) |
| Auth          | Firebase Auth (Google + Phone OTP) + Firebase Admin SDK           |
| Database      | Firestore (client SDK + Admin SDK)                                |
| Storage       | Firebase Storage (form file uploads)                              |
| CMS           | Prismic (blogs)                                                   |
| Payments      | Razorpay (orders, HMAC verify, webhook)                           |
| Email         | Resend                                                            |
| Client state  | Zustand (auth store, persisted)                                   |
| Forms         | TanStack Form v1 (`@tanstack/react-form-nextjs`) + Zod            |
| UI primitives | Radix UI (dropdown, dialog, collapsible), Lucide icons            |
| Testing       | Vitest + Testing Library (jsdom, MSW)                             |
| CI / quality  | GitHub Actions, ESLint, Prettier, Husky + lint-staged             |

See `package.json` for exact versions.

## Runtime split (important)

- **Client** (`"use client"`): everything under `components/`, `store/`,
  `hooks/`, page components that use hooks, and `lib/firebase.ts` (client SDK).
- **Server only** (import `"server-only"`): `lib/firebaseAdmin.ts`,
  `lib/razorpay.ts`, `lib/forms/email.ts`, all `src/app/api/*` route handlers,
  `src/proxy.ts`.
- **Rule of thumb**: Firebase Admin credentials and Razorpay secrets must only
  ever be imported from server-only modules. If a file needs Firestore on the
  server, use `getAdminFirestore()` from `firebaseAdmin.ts`, not the client
  `db` from `firebase.ts`.

## Directory map

```
src/
├── app/                     # App Router: pages + API routes
│   ├── (protected)/account/ # auth-gated account dashboard (+ delete-request)
│   ├── api/                 # route handlers (see sections below)
│   │   ├── auth/session     # POST: exchange Firebase ID token for __session cookie
│   │   ├── auth/logout      # POST: clear __session cookie
│   │   ├── payments/        # create-order, verify, webhook, GET history
│   │   ├── plans/           # GET active plans
│   │   ├── courses/         # GET legacy user courses (session-required)
│   │   ├── submit-form/     # POST: validated form → Firestore + email
│   │   ├── preview | exit-preview | revalidate   # Prismic preview/cache
│   ├── blogs/, blogs/[uid]/ # Prismic blog list + post (SliceZone)
│   ├── ld/                  # AI-generated landing pages (see below)
│   ├── athayog-app/         # mobile-app legal pages (privacy/terms/refund)
│   ├── page.tsx, layout.tsx, globals.css           # root
│   ├── robots.ts, sitemap.ts, opengraph-image.tsx  # SEO files
│   └── … 9+ service/landing pages
├── components/
│   ├── forms/               # FormField, SubmitButton (shared form UI)
│   ├── payments/            # PaymentModal (Razorpay checkout)
│   ├── landing/             # ~25 reusable sections for ld/* pages
│   └── Header, Footer, AccountMenu, MobileDrawer, AuthBootstrap,
│       CookieBanner, TrackingScripts, MapEmbed, Reveal, PostCard, …
├── constants/               # navItems (navigation tree), testimonialVideos
├── hooks/                   # useReveal, useGoogleOneTap
├── lib/                     # firebase, firebaseAdmin, auth, razorpay,
│                            # consent, withAuth, forms/{schemas,validate,email,upload}
├── slices/                  # Prismic slice components (RichText, BlogsTitle)
├── store/                   # Zustand stores (useAuthStore)
├── proxy.ts                 # Next.js proxy: route protection for /account
└── prismicio.ts             # Prismic client factory
```

## Data model (Firestore)

| Collection            | Purpose                                                          | Written by                         |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| `users/{uid}`         | Minimal user profile (uid, name, email, photo, createdAt, phone) | Client SDK on first sign-in        |
| `users/{uid}/courses` | **Legacy** purchase records (pre-Razorpay era)                   | Legacy system (read-only now)      |
| `plans/{planId}`      | Pricing plans (authoritative source for amounts)                 | `scripts/seed-plans.ts`            |
| `payments/{autoId}`   | Razorpay payment records (pending → completed/failed)            | Server (Admin SDK) only            |
| `<form collection>`   | One collection per form (trialClasses, contactMessages, …)       | `POST /api/submit-form`            |
| `uploads/` (Storage)  | Resume / file attachments from forms                             | Client SDK (`lib/forms/upload.ts`) |

> **Firebase Security Rules are NOT stored in this repo.** They must be
> configured in the Firebase console (project rules). The client SDK writes
> `users/{uid}` and uploads files to Storage, so rules must allow exactly that
> and deny everything else.

## Request flows at a glance

- **Public page** → Server Component renders → may call Prismic (`createClient`)
  or Firestore (`getActivePlans`) → HTML to browser.
- **Form submit** → client `useForm` → `POST /api/submit-form` → Zod validation
  → Firestore write → optional Resend email → JSON response.
- **Payment** → `PaymentModal` → `POST /api/payments/create-order` (session
  cookie verified, plan fetched from Firestore, Razorpay order created, pending
  doc written) → Razorpay checkout popup → `POST /api/payments/verify` (HMAC +
  idempotency + status update) → `/payment-success`. Webhook
  (`/api/payments/webhook`) is the server-side safety net (see `payments.md`).
- **Login** → Firebase Auth (client) → `POST /api/auth/session` → `__session`
  cookie → `src/proxy.ts` guards `/account`.
- **Blog** → `/blogs`, `/blogs/[uid]` read Prismic; `/api/preview`,
  `/api/exit-preview`, `/api/revalidate` manage previews and the `prismic`
  cache tag.

## Landing pages (`src/app/ld/*`)

`src/app/ld/` contains marketing landing pages (aerial yoga, personal training,
TTC variants, sound meditation, etc.). They are composed from the reusable
section kit in `src/components/landing/` (hero, features, comparison, pricing
cards, FAQ, testimonials, final CTA…). Each has a `layout.tsx` with metadata
that sets `robots: { index: false, follow: false }` so they stay out of search
indexes (they are ad/lead pages). They use their own small forms
(`MagnetForm`, `PYTAdsForm`) which post to `/api/submit-form` with dedicated
collection names.

## Conventions that keep this codebase consistent

- Tabs (not spaces), double quotes, trailing commas, print width 90 (`.prettierrc`).
- No Tailwind: design tokens live in `src/app/globals.css`; component styles are
  CSS Modules.
- Imports use the `@/` alias (enforced by ESLint `no-restricted-imports`).
- Server-only modules import `"server-only"` so they can never leak to the client.
- `middleware.ts` is deprecated in Next.js 16 — route protection lives in
  `src/proxy.ts` (`export function proxy`).
