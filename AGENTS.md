# AGENTS.md — Athayog Web

## Framework: Next.js 16 (NOT your training data)

- **Read `node_modules/next/dist/docs/` before writing any Next.js code.** APIs, conventions, and file structure differ from older versions.
- `middleware.ts` is **deprecated**. Use `proxy.ts` with `export function proxy()` instead. See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- `useSearchParams()` must be wrapped in `<Suspense>`.
- Proxy defaults to Node.js runtime (not Edge). The `runtime` config option is not available in proxy files.
- Turbopack is the default bundler.

## Commands

| Task         | Command                   |
| ------------ | ------------------------- |
| Dev server   | `npm run dev` (port 3000) |
| Build        | `npm run build`           |
| Lint         | `npm run lint`            |
| Format check | `npm run format:check`    |
| Format fix   | `npm run format`          |

Run `npm run build` after changes — it catches TypeScript errors, missing exports, and SSR issues that dev mode misses.

**CRITICAL: NEVER use `--legacy-peer-deps` or `--force` without explicit user permission.** Prismic has an unresolved peer dependency conflict with Next.js 16 that forces `--legacy-peer-deps` on every `npm install`. If you encounter this, warn the user before proceeding — never silently apply the flag.

**Always consult `GAPS.md` before starting work** — it tracks pending, in-progress, and completed infrastructure tasks. If idle between tasks, check GAPS.md and ask the user if they want to pick up an In Progress item or continue with the current workstream.

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

| Area                     | Path                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Global CSS tokens        | `src/app/globals.css`                                                                     |
| Navigation structure     | `src/constants/navItems.ts`                                                               |
| Header (desktop)         | `src/components/Header.tsx` + `Header.module.css`                                         |
| Mobile drawer            | `src/components/MobileDrawer.tsx` + `MobileDrawer.module.css`                             |
| Footer                   | `src/components/Footer.tsx` + `Footer.module.css`                                         |
| Reveal animation         | `src/components/Reveal.tsx` + `src/hooks/useReveal.ts`                                    |
| Legal pages (web)        | `src/app/privacy-policy/`, `/terms-of-service/`, `/refund-policy/`                        |
| Legal pages (mobile app) | `src/app/athayog-app/privacy/`, `/terms/`, `/refund/` — uses "mobile application" wording |
| Firebase client          | `src/lib/firebase.ts`                                                                     |
| Firebase admin           | `src/lib/firebaseAdmin.ts`                                                                |
| Auth store               | `src/store/useAuthStore.ts`                                                               |
| Proxy (route protection) | `src/proxy.ts`                                                                            |
| Login page               | `src/app/login/page.tsx`                                                                  |
| Protected account        | `src/app/(protected)/account/page.tsx`                                                    |
| Form field component     | `src/components/forms/FormField.tsx`                                                      |
| Form submit button       | `src/components/forms/SubmitButton.tsx`                                                   |
| Zod schemas + adapter    | `src/lib/forms/schemas.ts`, `validate.ts`                                                 |
| Form submission API      | `src/app/api/submit-form/route.ts`                                                        |

## Form System

- **TanStack Form v1** (`@tanstack/react-form-nextjs`) + **Zod** for validation.
- `useForm` must be imported from `@tanstack/react-form-nextjs` (NOT plain `@tanstack/react-form`).
- `FormField` is the single reusable field component — renders label, input/textarea, hint, and error.
- `SubmitButton` wraps submit with `isSubmitting` prop for loading state.
- `src/lib/forms/schemas.ts` exports reusable Zod fragments (`strings.name`, `strings.email`, `strings.phone`, `strings.message`, plus `optional.*` variants).
- `src/lib/forms/validate.ts` exports `zodField()` — wraps a Zod schema into a TanStack Form validator function.
- New forms: define a Zod schema → call `useForm({ defaultValues, validators, onSubmit })` → compose `<FormField>` + `<SubmitButton>`.
- API: `POST /api/submit-form` accepts `{ collection, data }` — validates with Zod server-side, writes to Firestore, returns 201/400/429/500.

## Testing

- **Vitest v4** with jsdom for unit/integration tests. **Testing Library v16** for component rendering.
- `npm test` — runs all tests once. `npm run test:watch` — watch mode.
- `npm run build` runs tests as a pre-build gate (`vitest run && next build`).
- **Test files** live in `__tests__/` directories alongside the code they test: `src/lib/forms/__tests__/`, `src/components/forms/__tests__/`, `src/app/api/submit-form/__tests__/`.
- **No testing framework for components outside `forms/` yet** — `Header`, `MobileDrawer`, `AccountMenu`, `PostCard`, `Reveal`, pages, and auth store tests are pending (see `GAPS.md`).
- **No E2E testing yet** — Playwright is planned for critical flows (login, form submission, blog browsing, protected routes).
- `vitest.config.ts` uses `@vitejs/plugin-react`, `jsdom` environment, and `@` path aliases matching Next.js.
- When adding component tests, use the pattern from `FormField.test.tsx`: create a wrapper that sets up a fresh form/react context per test.

## Project Context

- **Legacy project**: `/home/harsimransinghbarki/Projects/Work/Athayog` — Next.js + Prismic + MUI. Reference for content, routes, and features. Do NOT copy MUI or Prismic patterns.
- **HTML mockups**: `/home/harsimransinghbarki/Projects/Work/Athayog/DELETE/` — 9 HTML files for design reference.
- **Logo**: `public/Logo.png` used in Header.
- **Radix UI** for navigation (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-collapsible`).
- **No external CSS framework** — pure CSS custom properties + modules.
- **JSON-LD structured data**: skip for now, add later.
