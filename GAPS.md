# Gaps & Infrastructure TODO

Foundational items to cover before building content pages. Add to this list freely; mark `[x]` when done.

---

## Pending

- [ ] **`.env.example`** — Document all required env vars (`NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`)
- [ ] **`next.config.ts` `images` config** — Allow `user.photoURL` and other remote images with `<Image>`
- [ ] **OG image** — Create `src/app/opengraph-image.png` (1200×630) for social sharing previews
- [ ] **`manifest.json`** — PWA manifest / site.webmanifest for installability
- [ ] **Apple Touch Icon** — `apple-touch-icon.png` for iOS home screen
- [ ] **`themeColor`** — Set browser chrome color in metadata
- [ ] **Error tracking** — Sentry or equivalent (6 `console.error` call sites today)
- [ ] **Analytics** — Vercel Analytics, PostHog, or Google Analytics for page views & conversions
- [ ] **Testing framework** — Vitest (unit/integration) + Playwright (E2E)
- [ ] **CI/CD** — GitHub Actions workflow: lint → typecheck → test → build → deploy
- [ ] **Pre-commit hooks** — Husky + lint-staged to enforce format/lint on commit
- [ ] **README overhaul** — Add env setup, project structure, scripts reference, deploy guide
- [ ] **Logging utility** — Replace raw `console.error` with structured logger
- [ ] **API validation** — Zod schemas for API route input validation
- [ ] **Rate limiting** — Protect API routes from abuse
- [ ] **Content pages** — `/about-us`, `/group-classes-indiranagar`, `/contact-us`, `/trial-classes`, etc. (from `src/constants/navItems.ts`)
- [ ] **Privacy-first cookie consent banner** — GDPR/India IT Act compliance

---

## In Progress

- *(none)*

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
