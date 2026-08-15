# Authentication & Security

## Identity model

Users authenticate with **Firebase Auth**:

- **Google** — popup (`signInWithPopup`) on the login page, plus optional
  **Google One Tap** (`hooks/useGoogleOneTap.ts`) when
  `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set (it is currently **not** set in
  `.env.local`, so One Tap silently falls back to popup sign-in).
- **Phone OTP** — Firebase `RecaptchaVerifier` widget + `signInWithPhoneNumber`
  on the login page. No manual reCAPTCHA site key is used; Firebase manages the
  widget via the console config.

There are **no roles/claims** in the app today: a user is either signed in or
not. The account area shows profile, legacy purchases and payment history.

## Sign-in flow (end to end)

1. User signs in on `/login` (Google popup, One Tap, or OTP).
2. `store/useAuthStore.ts` (`handleSignIn` / `handleSignInWithOtp`) receives the
   Firebase `User`.
3. If no `users/{uid}` doc exists, the **client SDK** creates one
   (`users/{uid}` with uid, displayName, email, photoURL, phoneNumber, createdAt).
4. The store calls `user.getIdToken()` and `POST /api/auth/session` with
   `{ idToken }`.
5. `api/auth/session/route.ts` uses the **Admin SDK**
   (`createSessionCookie(idToken, 7 days)`) and sets the `__session` cookie:
   `httpOnly`, `secure` (in production), `sameSite=strict`, `maxAge` 7 days,
   `path=/`.
6. `useAuthStore` persists `isAuthenticated` + a small `userSnapshot` to
   `localStorage` (`auth-storage`) so the UI renders instantly on reload
   (no auth flash).
7. `AuthBootstrap` (mounted in the root layout) subscribes to
   `auth.onAuthStateChanged` and refreshes the session cookie on every
   page load for signed-in users.

**Logout**: `handleLogout` calls Firebase `signOut()` **and**
`POST /api/auth/logout`, which deletes the `__session` cookie. Both must happen
so the server-side cookie cannot outlive the client session.

## Session cookie

| Property     | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| Name         | `__session`                                                  |
| Lifetime     | 7 days (`SESSION_EXPIRY` in `api/auth/session/route.ts`)     |
| Attributes   | `httpOnly`, `secure` (prod), `sameSite=strict`, `path=/`     |
| Verification | Admin SDK `verifySessionCookie(cookie, checkRevoked = true)` |

Changing the lifetime: edit `SESSION_EXPIRY` in
`src/app/api/auth/session/route.ts` (also used for `maxAge`).

## Route protection

- **Server side**: `src/proxy.ts` is a Next.js 16 **proxy** (the successor to
  the deprecated `middleware.ts`). Its `matcher` is `["/account/:path*"]`.
    - No `__session` cookie → redirect to `/login?redirect=/account/...`.
    - Cookie present → `verifySessionCookie(..., true)`; failure → same redirect.
- **Client side (fallback)**: `lib/withAuth.tsx` wraps account components. If
  the persisted store says unauthenticated, it redirects to `/login`; while the
  store is `loading` it shows `AccountSkeleton`.
- `/api/payments` (GET payment history) also verifies the session cookie
  server-side before returning data.

> Defense in depth: the proxy is the real gate for `/account`. `withAuth` is a
> UX fallback and must never be treated as the only protection.

## Data access APIs and their auth

| Endpoint                          | Auth                                              | Notes                                           |
| --------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| `POST /api/auth/session`          | none (exchanges ID token; Admin SDK validates it) |                                                 |
| `POST /api/auth/logout`           | none (just deletes cookie)                        |                                                 |
| `POST /api/payments/create-order` | session cookie required                           | reads plan from Firestore (authoritative price) |
| `POST /api/payments/verify`       | none (relies on Razorpay HMAC signature)          | idempotent                                      |
| `POST /api/payments/webhook`      | Razorpay HMAC signature                           | server-to-server                                |
| `GET /api/payments`               | session cookie required                           | filtered by `decoded.uid`                       |
| `GET /api/courses`                | session cookie required                           | legacy purchases for the session uid            |
| `GET /api/plans`                  | none (public pricing)                             |                                                 |
| `POST /api/revalidate`            | `x-revalidate-token` header                       | must match `REVALIDATE_TOKEN` (503 if unset)    |
| `POST /api/submit-form`           | none (public forms) + IP rate limit               | in-memory, best-effort                          |

## Secrets and env hygiene

- **Public (safe in client bundle, `NEXT_PUBLIC_*`)**:
  `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`,
  `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
  (Firebase API keys and Razorpay key IDs are not secrets by design; they are
  restricted by Firebase project settings / Razorpay dashboard.)
- **Secret (server only, never `NEXT_PUBLIC_`)**:
  `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `RAZORPAY_KEY_SECRET`,
  `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `REVALIDATE_TOKEN`.
- `.env*` files are git-ignored. The committed reference file is `.env.example`
  (root). Keep it in sync when adding/removing env vars.
- Never log `FIREBASE_PRIVATE_KEY`, `RAZORPAY_KEY_SECRET` or full request
  bodies containing them.

## How to update auth behavior

- **Change session length** → `SESSION_EXPIRY` in `api/auth/session/route.ts`.
- **Add a login provider** → enable it in the Firebase console, add the SDK
  call in `lib/auth.ts`, wire a button in `src/app/login/page.tsx`, and ensure
  the store creates the `users/{uid}` doc the same way `handleSignIn` does.
- **Protect a new route** → add the path to `PROTECTED_PATHS` (and/or the
  `matcher`) in `src/proxy.ts`.
- **Require email verification** → would need a new check in the proxy and
  account pages; not currently implemented.
- **Roles (admin etc.)** → would use Firebase custom claims + a check in
  `proxy.ts`/route handlers. Not currently implemented.

## Security checklist before every deploy

- [ ] `.env.local`/Vercel env contains the **server secrets** (not `NEXT_PUBLIC_`).
- [ ] Firebase Security Rules block client reads of `plans/`, `payments/`,
      form collections, and other users' data; allow only `users/{uid}` own-doc
      writes and `uploads/` own uploads.
- [ ] Razorpay webhook configured with `RAZORPAY_WEBHOOK_SECRET` (see payments.md).
- [ ] No `console.log` of secrets; no new `NEXT_PUBLIC_` secret additions.
- [ ] `npm run build` (eslint + vitest + next build) passes locally and in CI.
- [ ] Any new route handler checks its own auth (cookie / HMAC / token) and has
      a test covering the unauthenticated case.
