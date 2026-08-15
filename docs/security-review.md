# Security Review & Known Issues

**Status: living document.** This is the audit of things that are risky,
unclear, or were discovered after the "AI did most of the work" era. Fix them
in priority order and check them off here.

Legend: 🔴 HIGH · 🟠 MEDIUM · 🟡 LOW · 🔵 INFO

---

## 🔴 1. `/api/courses` leaks any user's purchase history

**File:** `src/app/api/courses/route.ts`

`GET /api/courses?userId=<uid>` returns `users/{userId}/courses` (legacy
purchases) with **no authentication**. Anyone who knows/guesses a Firebase uid
can read that user's course history. The account page also calls it client-side
with the logged-in user's uid.

**Fix:** require the `__session` cookie in the handler and use
`verifySessionCookie` to derive the uid (like `GET /api/payments` does), then
query only that uid. Optionally drop the `userId` query param entirely.

---

## 🟠 2. `/api/plans/seed` is an unauthenticated write endpoint

**File:** `src/app/api/plans/seed/route.ts`

`GET /api/plans/seed` writes the `plans/` collection (batch set, overwriting
docs and resetting `active: true`). It is public. A caller could overwrite plan
prices (the _authoritative_ amounts charged) or mark plans active/inactive,
breaking or corrupting payments.

**Fix options (pick one):**

- Remove the HTTP route and rely on the CLI (`npm run plans:seed`), or
- Gate it behind a server-side secret (header check) or session cookie, or
- Make it a POST that requires a bearer token matching an env var.

---

## 🟠 3. `/api/revalidate` is unauthenticated

**File:** `src/app/api/revalidate/route.ts`

`POST /api/revalidate` calls `revalidateTag("prismic")` — anyone can purge the
Prismic cache (minor DoS / cache churn). Low blast radius (one tag) but trivially
abused.

**Fix:** require a secret header (e.g. `x-revalidate-token` vs an env var), or
hook the Prismic webhook properly (Prismic → Vercel webhook → revalidate).

---

## 🟠 4. `NEXT_PUBLIC_RESEND_API_KEY` exists in `.env.local`

The Resend API key is a **server secret** (`RESEND_API_KEY` is the one used in
code). A `NEXT_PUBLIC_RESEND_API_KEY` copy is present but unused — if any code
ever references it, the key ships to the browser. Remove it from `.env.local`
and Vercel env to eliminate the footgun.

---

## 🟠 5. `.env.example` is missing

`GAPS.md` and `README.md` reference `.env.example`, and local setup depends on
it, but the file does not exist. **Action:** recreate it (see
`docs/deployment.md` for the canonical var table).

---

## 🟡 6. Rate limiting is in-memory only

`src/app/api/submit-form/route.ts` rate-limits by IP in a module-level `Map`.
On Vercel (serverless) each instance has its own map and cold starts reset it —
this is best-effort abuse damping, not protection. **Fix when needed:** move to
Firestore-based counters or a rate-limit service.

---

## 🟡 7. Dead env vars in `.env.local`

`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_FACEBOOK_PIXEL` (GTM/FB ids are hardcoded in
`components/TrackingScripts.tsx`), `NEXT_PUBLIC_GUPSHUP_USER_ID`,
`NEXT_PUBLIC_GUPSHUP_PASSOWRD` (typo), `NEXT_PUBLIC_SHOPIFY_*`,
`NEXT_PUBLIC_WEB` — none are referenced in code. **Action:** delete from
`.env.local` and Vercel to reduce confusion and attack surface.

---

## 🟡 8. `NEXT_PUBLIC_GOOGLE_CLIENT_ID` not set

`hooks/useGoogleOneTap.ts` falls back to popup sign-in when this is missing.
Set it in Vercel + `.env.local` to enable Google One Tap (optional feature).
Make sure the authorized origin/redirect URIs in Google Cloud include
`https://athayogliving.com`.

---

## 🔵 9. Firebase Security Rules are not in the repo

The client SDK writes `users/{uid}` and Storage `uploads/` directly. Rules must
be configured in the Firebase console so that:

- `users/{uid}`: read/write only by the matching signed-in user (allow
  `request.auth.uid == uid`).
- `plans/`, `payments/`, form collections: **no client access** (server Admin
  SDK bypasses rules anyway).
- Storage `uploads/`: only the authenticated owner writes; enforce size/type.

There is no rules file to review here — document what you deploy in this
section when rules are set up.

---

## 🔵 10. Razorpay webhook not yet activated

Payments currently complete via the client-side `/api/payments/verify` (HMAC
verified server-side, so it is still secure). The webhook
(`/api/payments/webhook`) is implemented but **not configured** in the Razorpay
dashboard (see `GAPS.md`). Activate it for server-to-server confirmation and
robustness against popup-close edge cases.

---

## 🔵 11. Price duplication between UI and Firestore

Pages hardcode displayed prices; Firestore `plans/` is the charged price.
They can drift. Consider rendering pricing cards from `GET /api/plans` instead
of hardcoding (see `docs/payments.md`).

---

## 🔵 12. Legacy `courses` API naming confusion

`/api/courses` (legacy) vs `/api/payments` (current) are easy to confuse; the
account page renders both tables. Keep the comments in code and this doc up to
date. Fixing #1 will also clarify this boundary.

---

## How to run your own security review

1. Re-scan for public routes: `find src/app/api -name route.ts` and check each
   handler's auth (session cookie / HMAC / none).
2. Grep for `NEXT_PUBLIC_` usage and make sure nothing secret is prefixed.
3. Check Firebase console rules vs client SDK writes.
4. Check Razorpay dashboard (webhook active? test keys in prod?).
5. Grep for hardcoded secrets/keys in committed files
   (`git grep -iE "sk_|api[_-]?key|secret" -- src scripts`).
6. Keep this doc current.
