# PROD Readiness TODO

Two lists: **A — code fixes I can do right now** (agent), **B — ops/config you must do on Vercel/Firebase/Razorpay/Resend** (human). Work through A one by one, then B.

## A. Code fixes (agent — do first)

- [x] **A1 (P1)** Await `sendFormEmail` in `/api/submit-form` and log email errors — otherwise form emails can be silently dropped on Vercel serverless.
- [x] **A2 (P1)** Validate `?redirect=` on `/login` (must start with `/`, not `//`) — prevent open-redirect after sign-in.
- [x] **A3 (P2)** Add `paymentsError` state to `/account` payment-history fetch — a failed fetch must show an error, not an empty table.
- [x] **A4 (P2)** Handle abandoned/failed checkouts: mark `payment.failed` docs via webhook (or filter `pending` from history) so users don't see forever-"pending" rows.
- [x] **A5 (P2)** Make the online-TTC "from" price consistent (hero `₹19,999` vs sticky `₹14,999` vs metadata).
- [x] **A6 (P3)** Add explicit Razorpay env guard in `create-order` (clear error instead of generic 500 if keys are missing).
- [x] **A7 (P3)** Server-side per-collection Zod validation in `/api/submit-form` (currently accepts arbitrary fields).
- [x] **A8 (P4)** PaymentModal prefill from `userSnapshot` (name/email/contact) instead of empty strings.
- [x] **A9 (P4)** Blog `[table]` robustness: guard rows with fewer cells than the header.

## B. Ops / config (human — Vercel, Firebase, Razorpay, Resend)

- [x] **B1 (P0)** Deploy Firestore indexes to PROD: `npx firebase deploy --only firestore:indexes` — without them, payment history + `create-order` 500.
- [x] **B2 (P0)** Seed plans in PROD Firestore: `npm run plans:seed` then `npm run plans:check`.
- [x] **B3 (P0)** Firebase Security Rules: allow only `users/{uid}` own-doc writes + `uploads/` own uploads; deny client reads of `plans/`, `payments/`, form collections. → deployed to prod via `firebase deploy --only firestore:rules,storage`.
- [x] **B4 (P1)** Firebase authorized domains: add `https://athayogliving.com` (else Google sign-in fails); enable Phone auth. → already configured on prod.
- [x] **B5 (P1)** Razorpay: switch to **live** keys (`rzp_live_*`), whitelist the domain, **activate webhook** (`/api/payments/webhook`, event `payment.captured`, secret = `RAZORPAY_WEBHOOK_SECRET`).
- [x] **B6 (P1)** Vercel env (Production): set `REVALIDATE_TOKEN` (else blog revalidation 503s), verify all `.env.example` vars incl. `FIREBASE_PRIVATE_KEY` (`\n` escapes), `RESEND_API_KEY`, `RAZORPAY_*`, `NEXT_PUBLIC_*`.
- [ ] **B7 (P1)** Resend: verify the sending domain so `noreply@athayogliving.com` can send (else form emails fail silently).
- [x] **B8 (P2)** Prismic: confirm the `page` doc with uid `blogs` exists + blog posts published (else `/blogs` 500s). → verified live: /blogs 200 with posts.
- [x] **B8.5 (P0) 🔴 Deploy current `main` to Vercel PROD** — the live site is serving an OLD build (`robots.txt` shows `/user/*`, no teachers/founder update, sitemap has no blogs). Check Vercel project linkage + production branch = `main`, fix if pointing at the legacy repo, then redeploy and re-verify. → ✅ deployed 2025-08: build 8bb4238 live, all markers verified.
- [ ] **B9 (P2)** Domain/SEO: SSL + domain on Vercel, Search Console verification (meta already present), confirm GTM `GTM-N4LH3M3` + FB pixel `1011750923226651` are your real IDs.
- [ ] **B10 (P3)** Replace the June-dated schedule PDF link (group-classes) with the current month.
- [ ] **B11 (P3)** Proper 512×512 favicon (current `icon.png` is a logo copy).
- [ ] **B12 (P3)** Prod smoke test: login (Google + OTP) → one real ₹ payment → form + email arrives → blog with `[table]` renders → revalidate curl returns 200.
