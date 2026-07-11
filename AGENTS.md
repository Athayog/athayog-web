# AGENTS.md — Athayog Web

## Framework: Next.js 16 (NOT your training data)

- **Read `node_modules/next/dist/docs/` before writing any Next.js code.** APIs, conventions, and file structure differ from older versions.
- `middleware.ts` is **deprecated**. Use `proxy.ts` with `export function proxy()` instead. See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- `useSearchParams()` must be wrapped in `<Suspense>`.
- Proxy defaults to Node.js runtime (not Edge). The `runtime` config option is not available in proxy files.
- Turbopack is the default bundler.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Format check | `npm run format:check` |
| Format fix | `npm run format` |

Run `npm run build` after changes — it catches TypeScript errors, missing exports, and SSR issues that dev mode misses.

## CSS Strategy: No Tailwind — Global Tokens + CSS Modules

- **Global styles** in `src/app/globals.css`: design tokens (CSS custom properties), reset, typography (`h2`, `.eyebrow`, `.lead`), buttons (`.btn-primary`, `.btn-ghost`, `.btn-light`, `.btn-cream`), layout grids (`.grid-2/3/4`, `.split`, `.wrap`), section variants (`.band`, `.final`), responsive breakpoints (960px, 640px).
- **Component-scoped styles** use CSS Modules: `Component.module.css`.
- Use existing token names (`--ink`, `--brand-deep`, `--cream`, etc.) — never hardcode colors.
- Fonts: `--font-display` (Cormorant Garamond), `--font-label` (Cinzel), `--font-body` (Inter). All via `next/font/google` in `layout.tsx`.

## Auth Architecture

- **Firebase client SDK** (`src/lib/firebase.ts`): `auth`, `googleProvider`, `db` (Firestore).
- **Firebase Admin SDK** (`src/lib/firebaseAdmin.ts`): server-only, guarded by `import "server-only"`. Exposes `verifyIdToken`, `createSessionCookie`, `verifySessionCookie`.
- **Zustand store** (`src/store/useAuthStore.ts`): manages `user`, `loading`, `isAuthenticated`, `redirectPath`. Bootstrapped by `AuthBootstrap` component in `layout.tsx` (not in Navbar).
- **Session cookies**: httpOnly, secure, sameSite=strict, 7-day expiry. Set via `POST /api/auth/session`, cleared via `POST /api/auth/logout`.
- **Route protection**: `src/proxy.ts` verifies `__session` cookie for `/account` routes. Redirects to `/login?redirect=...`.
- **Login flow**: Google popup + Phone OTP (reCAPTCHA). On Firebase auth success, POST ID token to `/api/auth/session` to set server cookie.
- **`withAuth` HOC** (`src/lib/withAuth.tsx`): client-side fallback for components that need auth state.
- **Env vars**: `NEXT_PUBLIC_FIREBASE_*` for client, `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` for admin. Note: env uses `NEXT_PUBLIC_FIREBASE_APPID` (no underscore before ID).

## Code Style

- **Tabs**, not spaces (`.prettierrc`: `useTabs: true`, `tabWidth: 4`).
- **Double quotes** (`singleQuote: false`).
- **Trailing commas** (`trailingComma: "all"`).
- **Print width**: 90.
- **No comments** unless explicitly asked.

## Key File Locations

| Area | Path |
|---|---|
| Global CSS tokens | `src/app/globals.css` |
| Navigation structure | `src/constants/navItems.ts` |
| Header (desktop) | `src/components/Header.tsx` + `Header.module.css` |
| Mobile drawer | `src/components/MobileDrawer.tsx` + `MobileDrawer.module.css` |
| Footer | `src/components/Footer.tsx` + `Footer.module.css` |
| Reveal animation | `src/components/Reveal.tsx` + `src/hooks/useReveal.ts` |
| Legal pages (web) | `src/app/privacy-policy/`, `/terms-of-service/`, `/refund-policy/` |
| Legal pages (mobile app) | `src/app/athayog-app/privacy/`, `/terms/`, `/refund/` — uses "mobile application" wording |
| Firebase client | `src/lib/firebase.ts` |
| Firebase admin | `src/lib/firebaseAdmin.ts` |
| Auth store | `src/store/useAuthStore.ts` |
| Proxy (route protection) | `src/proxy.ts` |
| Login page | `src/app/login/page.tsx` |
| Protected account | `src/app/(protected)/account/page.tsx` |

## Project Context

- **Legacy project**: `/home/harsimransinghbarki/Projects/Work/Athayog` — Next.js + Prismic + MUI. Reference for content, routes, and features. Do NOT copy MUI or Prismic patterns.
- **HTML mockups**: `/home/harsimransinghbarki/Projects/Work/Athayog/DELETE/` — 9 HTML files for design reference.
- **Logo**: `public/Logo.png` used in Header.
- **Radix UI** for navigation (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-collapsible`).
- **No external CSS framework** — pure CSS custom properties + modules.
- **No testing framework** set up yet.
- **JSON-LD structured data**: skip for now, add later.
