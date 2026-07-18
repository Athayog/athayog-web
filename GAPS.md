# Gaps & Infrastructure TODO

Foundational items to cover before building content pages. Add to this list freely; mark `[x]` when done.

---

## Pending

- [ ] **Auth flash on initial page load** — Login button shows briefly (~1-2s) on hard refresh / new tab before switching to AccountMenu, even with persisted userSnapshot. Likely causes: (1) async Zustand persist hydration microtask — first render shows unauthenticated state, (2) Firebase `onAuthStateChanged` taking time to verify session, (3) stale snapshot corrected after Firebase callback. Possible fixes: synchronous localStorage read in store init, cookie-based SSR auth state, or neutral skeleton placeholder during loading.
- [ ] **Playwright E2E tests** — Login flow, form submission, blog pages, protected routes
- [ ] **Unit tests for auth** — `useAuthStore`, `AuthBootstrap`, auth helpers (`src/lib/auth.ts`)
- [ ] **Unit tests for components** — `Header`, `MobileDrawer`, `AccountMenu`, `PostCard`, `Reveal`
- [ ] **Unit tests for pages** — Account page, Login page, Blog pages
- [ ] **Performance / Lighthouse audit** — Core Web Vitals baseline and budget
- [ ] **OG image** — Create `src/app/opengraph-image.png` (1200×630) for social sharing previews
- [ ] **`manifest.json`** — PWA manifest / site.webmanifest for installability
- [ ] **Apple Touch Icon** — `apple-touch-icon.png` for iOS home screen
- [ ] **`themeColor`** — Set browser chrome color in metadata
- [ ] **Error tracking** — Sentry or equivalent (6 `console.error` call sites today)
- [ ] **Analytics** — Vercel Analytics, PostHog, or Google Analytics for page views & conversions
- [ ] **CI/CD** — GitHub Actions workflow: lint → typecheck → test → build → deploy
- [ ] **README overhaul** — Add env setup, project structure, scripts reference, deploy guide
- [ ] **Logging utility** — Replace raw `console.error` with structured logger
- [x] **API validation** — Zod schemas for API route input validation (POST /api/submit-form)
- [x] **Rate limiting** — Protect API routes from abuse (in-memory rate limiter on /api/submit-form)
- [ ] **Content pages** — `/what-we-offer`, `/personal-yoga-training-indiranagar`, `/weight-loss-program-indiranagar`, `/yoga-teacher-training`, `/workshops` (from `src/constants/navItems.ts`)
- [ ] **Privacy-first cookie consent banner** — GDPR/India IT Act compliance
- [x] **Razorpay payment integration** — Full server-side flow: order creation, HMAC verify, webhook handler, payment history in My Account. See `src/components/payments/PaymentModal.tsx` and `src/app/api/payments/*/route.ts`.
- [ ] **Razorpay webhook activation** — Before production deploy: configure webhook URL in Razorpay Dashboard (Settings → Webhooks → `https://athayogliving.com/api/payments/webhook`, subscribe to `payment.captured`, copy secret to `.env.local` as `RAZORPAY_WEBHOOK_SECRET`). Without this, payments made when the browser tab closes before the verify callback fires will be lost.
- [ ] **Firestore indexes deployment** — Create composite indexes for `plans` (active↑, sortOrder↑) and `payments` (userId↑, createdAt↓) via Firebase Console or `npx firebase deploy --only firestore:indexes`. Both required for payment flow and payment history to work.

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
- [x] Account dashboard (avatar, details, purchases)
- [x] Legal pages (web + mobile app)
- [x] SEO (`robots.ts`, `sitemap.ts`, metadata, `icon.png`)
- [x] Navigation progress bar (`@bprogress/next`)
- [x] Loading state (`loading.tsx`)
- [x] Error pages (404, error, global-error, forbidden)
- [x] `.prettierrc`, `.vscode/settings.json`, `eslint.config.mjs`
- [x] Global form system (TanStack Form + Zod, FormField, SubmitButton, shared schemas)
- [x] Trial classes page (`/trial-classes` with form)
- [x] Form submission API (`POST /api/submit-form` with Zod validation + Firestore)
- [x] Email forwarding (Resend on form submission, lazy init, non-blocking)
- [x] File upload support (Firebase Storage, `as="file"` in FormField)
- [x] Vitest test framework (39 tests across 4 suites, pre-build gate)
- [x] `.env.example` — documents all env vars
- [x] `AGENTS.md` — `--legacy-peer-deps` rule, form system docs
- [x] Husky + lint-staged (pre-commit format + lint on staged files)
- [x] Image health tests + AGENTS.md rule for alt/priority
- [x] `/about-us` (14 sections, mandala SVG, mockup-integrated)
- [x] `/contact-us` (TanStack Form, Lucide icons)
- [x] `/career` (14-field form, file upload)
- [x] `/group-classes-indiranagar` (schedule table, pricing, testimonials)
