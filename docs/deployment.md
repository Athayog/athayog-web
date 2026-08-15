# Deployment, Environment & Updates

## Environments

| Environment | Where                                       | Notes                                                               |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Local dev   | `npm run dev` (port 3000)                   | needs `.env.local` (copy `.env.example`)                            |
| CI          | GitHub Actions (`.github/workflows/ci.yml`) | dummy env vars baked in; runs format, lint, typecheck, tests, build |
| Production  | Vercel (athayogliving.com)                  | env vars set in Vercel dashboard                                    |

## Environment variables

Reference file: **`.env.example`** (root, committed). `.env.local` is
git-ignored. Keep both in sync.

| Variable                              | Used in                               | Public?    | Notes                                                               |
| ------------------------------------- | ------------------------------------- | ---------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`        | `lib/firebase.ts`                     | public     | Firebase web API key (restricted by project settings)               |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`    | `lib/firebase.ts`                     | public     |                                                                     |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`     | `lib/firebase.ts`, `firebaseAdmin.ts` | public     | also used to init the Admin SDK                                     |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `lib/firebase.ts`                     | public     |                                                                     |
| `NEXT_PUBLIC_FIREBASE_APPID`          | `lib/firebase.ts`                     | public     | note: no underscore before `APPID`                                  |
| `FIREBASE_CLIENT_EMAIL`               | `firebaseAdmin.ts`, `scripts/*`       | **secret** | service account email                                               |
| `FIREBASE_PRIVATE_KEY`                | `firebaseAdmin.ts`, `scripts/*`       | **secret** | service account private key (escaped `\n` in env)                   |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`         | `create-order` route, PaymentModal    | public     | Razorpay key id                                                     |
| `RAZORPAY_KEY_SECRET`                 | `create-order`, `verify`              | **secret** |                                                                     |
| `RAZORPAY_WEBHOOK_SECRET`             | `webhook` route                       | **secret** | must match Razorpay dashboard (⚠️ not yet configured — see GAPS.md) |
| `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` | `prismicio.ts`                        | public     |                                                                     |
| `RESEND_API_KEY`                      | `lib/forms/email.ts`                  | **secret** | form-submission emails                                              |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`        | `useGoogleOneTap.ts`                  | public     | ⚠️ **not currently set** — One Tap falls back to popup sign-in      |

### Known dead/unused vars (present in `.env.local`, not referenced in code)

`NEXT_PUBLIC_RESEND_API_KEY` (⚠️ remove — see security-review.md),
`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`,
`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL` (GTM/FB ids are hardcoded in
`components/TrackingScripts.tsx`), `NEXT_PUBLIC_GUPSHUP_USER_ID`,
`NEXT_PUBLIC_GUPSHUP_PASSOWRD` (typo included), `NEXT_PUBLIC_SHOPIFY_*`,
`NEXT_PUBLIC_WEB`. Platform vars (`VERCEL_*`, `TURBO_*`, `NX_DAEMON`) are
injected by Vercel/Next, not config.

## Firestore

- **Indexes**: `firestore.indexes.json` → deploy with
  `npx firebase deploy --only firestore:indexes` (pending per GAPS.md).
- **Security Rules**: not in the repo; must be configured in the Firebase
  console. The client SDK writes `users/{uid}` and Storage `uploads/` directly,
  so rules must allow exactly those paths (see `security-review.md`).
- **Plans**: seed with `npm run plans:seed`, verify with `npm run plans:check`
  (see `payments.md`).

## Razorpay dashboard

- Webhook URL `https://athayogliving.com/api/payments/webhook`, event
  `payment.captured`, secret = `RAZORPAY_WEBHOOK_SECRET` (pending per GAPS.md).
- Test vs live keys: switch `NEXT_PUBLIC_RAZORPAY_KEY_ID` +
  `RAZORPAY_KEY_SECRET` together.

## CI / quality gates

- `.github/workflows/ci.yml`: format:check → lint → typecheck (`tsc --noEmit`)
  → vitest → `next build`, on push/PR to `main`. Uses dummy env vars.
- Local: `npm run build` = `eslint . && vitest run && next build`.
- Pre-commit: Husky + lint-staged run prettier + eslint on staged files.
- `.npmrc` sets `legacy-peer-deps=true` (needed for the Prismic ↔ Next.js 16
  peer conflict; do not fight it, do not re-add `--legacy-peer-deps` flags).

## Scripts

| Command                              | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `npm run dev`                        | dev server                                     |
| `npm run build`                      | eslint + vitest + next build (production gate) |
| `npm run check`                      | prettier check + eslint + vitest (no build)    |
| `npm run lint`                       | eslint                                         |
| `npm run format` / `format:check`    | prettier write / check                         |
| `npm test` / `test:watch`            | vitest                                         |
| `npm run plans:seed` / `plans:check` | seed / verify Firestore plans                  |

## Updating dependencies (how to stay safe)

1. **Read `node_modules/next/dist/docs/` before touching Next.js code** — this
   project is on Next.js 16 and APIs differ from older versions (e.g.
   `proxy.ts` not `middleware.ts`, `useSearchParams` needs `<Suspense>`,
   Turbopack is the default bundler).
2. Patch/minor updates: `npm update` and re-run `npm run build`. Watch for
   firebase-admin — it must stay **CommonJS-compatible** for Vercel
   (`jose@4`); v13+ broke with `ERR_REQUIRE_ESM` (that's why it's pinned to v12).
3. Major upgrades: change the version, run `npm run build`, and check the
   framework docs in `node_modules/next/dist/docs/`.
4. **Never** add `--legacy-peer-deps` or `--force` to installs manually — the
   project already handles the Prismic conflict via `.npmrc`.
5. After any dependency change, run the full gate: `npm run format:check`,
   `npm run lint`, `npm test`, `npm run build`, then deploy and smoke-test
   login, one form, and one payment.
6. Update `README.md` stack table and this doc if the stack changes.

## Deploy checklist

- [ ] `npm run build` green locally.
- [ ] Firestore indexes deployed (if changed).
- [ ] Razorpay webhook + secret configured (or intentionally still pending).
- [ ] `.env.example` matches all env vars used by new code.
- [ ] `GAPS.md` updated (mark completed items).
- [ ] `security-review.md` updated for anything fixed/added.
