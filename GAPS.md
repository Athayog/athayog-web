# Gaps & Infrastructure TODO

Foundational items to cover before building content pages. Add to this list freely; mark `[x]` when done.

---

## Pending

- [ ] **Razorpay webhook activation** — Before production deploy: configure webhook URL in Razorpay Dashboard (Settings → Webhooks → `https://athayogliving.com/api/payments/webhook`, subscribe to `payment.captured`, copy secret to `.env.local` as `RAZORPAY_WEBHOOK_SECRET`).
- [ ] **Firestore indexes deployment** — Deploy composite indexes from `firestore.indexes.json`: `firebase deploy --only firestore:indexes`.
- [ ] **TTC page clarification** — `/yoga-teacher-training-residential` is currently serving as the Online TTC page (temp). The real Residential program needs a redesign.
- [ ] **Proper favicon/icon** — Current `icon.png` is a copy of Logo.png. Needs a proper square icon (512×512).
- [ ] **Analytics** — Pick one: Vercel Analytics or GA, for page views & lead conversions.
- [ ] **Thank you page FB tag** — Add Facebook conversion tag on form submission success.

---

## In Progress

- _(none)_

---

## Completed

- [x] Design system (`globals.css` tokens, typography, buttons, grids, sections)
- [x] Navigation (`Header.tsx` + `MobileDrawer.tsx` + `AccountMenu.tsx`)
- [x] Footer (`Footer.tsx`)
- [x] Scroll reveal (`Reveal.tsx` + `useReveal.ts`)
- [x] Firebase auth (client SDK + Admin SDK + Zustand store)
- [x] Session cookies + route protection (`proxy.ts`)
- [x] Login page (Google + Phone OTP)
- [x] Account dashboard (avatar, details, purchases, payment history)
- [x] Legal pages (web + mobile app)
- [x] SEO (`robots.ts`, `sitemap.ts`, metadata, `icon.png`)
- [x] Navigation progress bar (`@bprogress/next`)
- [x] Loading + error pages (`loading.tsx`, 404, error, global-error, forbidden)
- [x] `.prettierrc`, `.vscode/settings.json`, `eslint.config.mjs`
- [x] Global form system (TanStack Form + Zod, FormField, SubmitButton, shared schemas)
- [x] Trial classes page (`/trial-classes` with form)
- [x] Form submission API (`POST /api/submit-form` with Zod validation + Firestore + rate limiting)
- [x] Email forwarding (Resend on form submission, lazy init, non-blocking)
- [x] File upload support (Firebase Storage, `as="file"` in FormField)
- [x] Vitest (41 tests, pre-build gate: `eslint . && vitest run && next build`)
- [x] Husky + lint-staged (pre-commit: format + lint on staged files)
- [x] ESLint `no-restricted-imports` — enforce `@/` path aliases
- [x] `--legacy-peer-deps` warning in AGENTS.md
- [x] `.env.example` — documents all env vars
- [x] `/about-us` — 14 sections, mandala SVG, Reveal animations
- [x] `/contact-us` — TanStack Form, Lucide icons
- [x] `/career` — 14-field form, file upload
- [x] `/group-classes-indiranagar` — schedule table, pricing tiers, PaymentModal integration
- [x] Razorpay payment flow — `PaymentModal`, `create-order`, HMAC verify, webhook handler
- [x] Payment history on `/account` — session-authenticated `GET /api/payments`
- [x] Legacy courses API — reads `users/{userId}/courses`, maps legacy field names
- [x] Account page skeleton — green breathing animation (`--skeleton` CSS variable, 14s breathe keyframes)
- [x] `loading.tsx` for account route + `withAuth` skeleton replacement
- [x] Logo fix — explicit `width: 140px; height: 36px` on brand image
- [x] `data-scroll-behavior="smooth"` on `<html>` for Next.js route transition compat
- [x] Dropdown spacing fix — reduced container top padding from 16px to 6px
- [x] OG image — `opengraph-image.tsx` via next/og (Edge, 1200×630 brand design)
- [x] Metadata on all pages — 9 pages added (title, description, canonical, OG inherits from root)
- [x] Sitemap fixes — removed 3 404s, added trial-classes + weight-loss
- [x] OpenGraph images + Twitter images in root layout metadata
- [x] `manifest.json` — PWA manifest
- [x] `themeColor` — Browser chrome color in metadata
- [x] `viewport` — Responsive viewport config
- [x] Apple Touch Icon (`apple-touch-icon.png` — placeholder from Logo.png)
- [x] README overhaul — Tech stack, setup, scripts, project structure, deployment
- [x] LICENSE — Proprietary all-rights-reserved
- [x] Auth flash fix — AccountMenu renders from persisted cache immediately, no loading gate
- [x] Privacy-first cookie consent banner — GDPR/India IT Act compliance (Essential + Functional categories, MapEmbed wrapper for 7 pages)
- [x] `/picnics` — Excursions & Picnics page with feature cards, 10-field registration form, CTA
- [x] Vitest test suites (28 test files, 116 tests covering Auth store, session cookies, route proxy protection, navigation UI, cookie consent privacy, and payment API/modal flows)
- [x] Broken link fixes — `/yoga-teacher-training` → `/yoga-teacher-training-bangalore` (4 pages), `/yoga-academy` → `/yoga-teacher-training-bangalore` (Footer)
- [x] GitHub Actions CI/CD workflow (`.github/workflows/ci.yml` — automated formatting, linting, typechecking, Vitest tests, and Next.js production build verification)
- [x] Aerial yoga landing page (`/aerial-yoga-indiranagar`) — MagnetForm with TanStack + Zod, pricing cards, schedule, FAQs, CTA
- [x] Career/contact-us/trial-classes padding fix — added `padding: 84px 0` to `.page` on three form pages
- [x] firebase-admin v12 downgrade — fixes `ERR_REQUIRE_ESM` on Vercel (jose@6 → jose@4, CJS-compatible)
