# Launch Checklist (end-of-month go-live)

The repo can only verify so much — most launch risks live in **console /
dashboard configuration** that CI cannot test (CI uses dummy env vars). Work
through this list top to bottom. Anything marked 🔲 needs a human with access
to the console/dashboard.

## 1. Firestore (console + CLI) — hard blocker if skipped

- [ ] **Deploy indexes**: `npx firebase deploy --only firestore:indexes`
      (`firestore.indexes.json` has plans(active, sortOrder), payments(userId,
      createdAt DESC), payments(razorpayOrderId, status)).
      Without them: `GET /api/payments` and the plan lookup inside
      `create-order` return 500 "index not found", and the webhook fails once
      activated.
- [ ] **Seed plans in the PROD project**: `plans/` must have the 6 docs
      (`npm run plans:seed` with prod credentials, or Firestore console).
      If empty, every payment click returns "Payment system is not configured".
      Verify with `npm run plans:check`.
- [ ] **Security Rules**: `users/{uid}` read/write only by that user,
      `plans/`/`payments/`/form collections deny client access (server Admin SDK
      bypasses rules), Storage `uploads/` restricted. Rules are NOT in this repo —
      configure in Firebase console. Default "allow all" is a leak; overly strict
      rules break sign-in (user-doc creation) and file uploads.

## 2. Firebase Auth (console) — classic launch breaker

- [ ] **Authorized domains** include `https://athayogliving.com` (and the
      Vercel preview domain while testing). Missing → Google sign-in popup fails
      with `auth/unauthorized-domain`.
- [ ] **Phone auth provider enabled** (for OTP) and reCAPTCHA site key bound.
- [ ] Firebase project used by prod env vars is the **same** project you are
      configuring (check `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in Vercel).

## 3. Razorpay (dashboard)

- [ ] **Live keys**: `NEXT_PUBLIC_RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` are
      `rzp_live_*` in Vercel (test keys only for staging).
- [ ] **Domain whitelisted** in Razorpay dashboard (Settings → App/Website) so
      checkout works on athayogliving.com.
- [ ] **Webhook activated**: Settings → Webhooks →
      `https://athayogliving.com/api/payments/webhook`, event `payment.captured`,
      secret = `RAZORPAY_WEBHOOK_SECRET`. Without it, a payment where the user
      closes the checkout popup is captured by Razorpay but never marked completed
      on the site.
- [ ] Run one **real test payment** (small live amount, refund after) end to
      end: login → group-class pricing → checkout → `/payment-success` →
      `/account` shows it in Payment History.

## 4. Vercel environment (Project → Settings → Environment Variables)

- [ ] Every var in `.env.example` is set for Production:
      `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`,
      `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME`, `FIREBASE_CLIENT_EMAIL`,
      `FIREBASE_PRIVATE_KEY` (keep `\n` escapes), `RAZORPAY_KEY_SECRET`,
      `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `REVALIDATE_TOKEN`.
- [ ] `REVALIDATE_TOKEN` is set (generate with `openssl rand -hex 32`).
      Until it is, `POST /api/revalidate` returns 503 and **blog updates won't
      propagate** to the live site.
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` set if Google One Tap is desired
      (optional; popup login works without it).

## 5. Email (Resend)

- [ ] Sending domain verified so `noreply@athayogliving.com` can send.
      Unverified → form-submission emails silently fail (code swallows errors);
      leads still land in Firestore but nobody is notified.
- [ ] Test one form (e.g. /contact-us) and confirm the email arrives at
      info@athayogliving.com.

## 6. Domain & SEO

- [ ] Custom domain + SSL live on Vercel (athayogliving.com).
- [ ] Google Search Console verification matches the `google-site-verification`
      meta in `src/app/layout.tsx`.
- [ ] `robots.txt` + `sitemap.xml` reachable (`/robots.txt`, `/sitemap.xml`).
- [ ] `indexedPages` in `src/app/sitemap.ts` lists the final page set.

## 7. Smoke test runbook (after deploy)

1. Homepage + 2 service pages load (no console errors).
2. `/blogs` lists posts newest-first; open a post with a `[table]` block and
   confirm the table renders.
3. `/contact-us` form: submit → 201 → email received → Firestore doc created.
4. Career form with a file upload (Storage rules + bucket working).
5. Google sign-in on `/login` → `/account` loads → logout.
6. Phone OTP sign-in (reCAPTCHA renders).
7. Payment flow with a real ₹1-style live payment (see §3) → history shows it.
8. `curl -X POST https://athayogliving.com/api/revalidate -H "x-revalidate-token: <token>"` → 200, then a fresh Prismic edit appears.

## Known non-blockers (fine for launch)

- Legacy `users/{uid}/courses` will be empty for new users → "No purchases
  yet" is expected.
- Google One Tap disabled (no client id) → popup login used instead.
- In-memory form rate limit is best-effort (fine for lead forms).
- FB Pixel/GTM fire only after functional consent — double-check pixel IDs in
  `src/components/TrackingScripts.tsx` against the real accounts.
