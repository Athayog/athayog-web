# Working in this repo as an AI agent

This guide exists so that AI agents (and humans) produce changes that are
**reviewable, consistent, and never black-boxed**. Read it before starting work.

## Before you start (mandatory)

1. Read **`AGENTS.md`** (root) — it is the authoritative repo instruction file.
2. Read **`GAPS.md`** — pending/in-progress infra tasks. Don't duplicate work.
3. Read **`docs/README.md`** and the doc relevant to your task
   (architecture, auth-security, payments, forms, content-seo, deployment).
4. Check `git log` and `git status` so you understand what changed recently and
   whether the tree is clean.

## Non-negotiable conventions

- **Tabs**, not spaces; **double quotes**; trailing commas; print width 90
  (`.prettierrc`). Run `npm run format:check` after editing.
- **No Tailwind.** Global tokens in `src/app/globals.css`; component styles in
  `Component.module.css`. Use existing token names (`--ink`, `--brand-deep`,
  `--cream`, …), never hardcode colors.
- Imports use `@/` alias (ESLint enforces it). `import "server-only"` on any
  module touching Admin SDK / secrets.
- `useForm` comes from `@tanstack/react-form-nextjs`, never
  `@tanstack/react-form`.
- Route protection is `src/proxy.ts` (`export function proxy`), **not**
  `middleware.ts` (deprecated in Next.js 16). `useSearchParams()` must be
  wrapped in `<Suspense>`.
- Every page: `<main>` landmark, exactly one `<h1>`, proper metadata, sitemap
  entry if public.

## Style rules for content you write

- The site's visible copy uses **no em dashes** (this was a deliberate cleanup).
  Use natural commas, periods, colons, semicolons. Metadata titles/descriptions
  are allowed to keep em dashes.
- Prefer existing wording over rewording; a copy change should read as a
  minimal, natural edit. Don't invent claims (prices, accreditations) — read
  the page and the Firestore plans first.
- Keep new strings in the same JSX wrapping style as the surrounding code.

## Black-box prevention rules

These are the rules that keep the project from becoming a mystery again:

1. **Every behavior change must update the docs.** If you change a flow
   (auth, payments, forms, SEO, deployment), update the matching doc in
   `docs/` and the relevant table (e.g. the form collection registry in
   `docs/forms.md`, the env table in `docs/deployment.md`).
2. **Keep `GAPS.md` current** — mark completed items, add new pending items.
3. **Never "fix" a flow by bypassing a server-side check.** Prices come from
   Firestore `plans/`, payment verification requires Razorpay HMAC, account
   data requires the session cookie. If you think a check is wrong, raise it
   with the maintainer before deleting it.
4. **Registry files must stay in sync.** The form collections enum + subjects
   in `src/app/api/submit-form/route.ts`; the plans list in
   `scripts/seed-plans.ts`; `PLAN_NAMES` in `payment-success/page.tsx`;
   `indexedPages` in `src/app/sitemap.ts`. Changing one side without the
   others is a bug.
5. **Env vars**: never commit `.env*`; update `.env.example` when adding a
   variable; never add secrets with the `NEXT_PUBLIC_` prefix.
6. **Explain, don't guess.** If you don't know why something exists, read the
   git history / docs before changing or deleting it. Leave a code comment or
   doc note instead of silently removing "dead" code.

## Verification checklist (run before finishing)

- [ ] `npm run format:check` (or `npm run format` then re-check) — clean.
- [ ] `npm run lint` — clean.
- [ ] `npm run build` — this is the real gate: `eslint . && vitest run && next build`. Dev mode doesn't catch everything.
- [ ] Tests: add/update tests for new API routes or components
      (`__tests__/` folders; MSW for API tests; the build runs vitest anyway).
- [ ] Docs updated for the change (see black-box rules).
- [ ] `git status` shows only intended files.

## Next.js 16 pitfalls (things that burned this repo before)

- `middleware.ts` → use `src/proxy.ts` with `export function proxy()`.
- Prismic peer dependency conflicts → handled by `.npmrc`
  (`legacy-peer-deps=true`); never add `--legacy-peer-deps` manually.
- `firebase-admin` must stay v12 (CJS) for Vercel; v13+ fails with
  `ERR_REQUIRE_ESM`. Check `node_modules/next/dist/docs/` before any Next.js
  API change.
- Metadata for `"use client"` pages goes in a sibling `layout.tsx`.
- The root layout must not fetch user data — `AuthBootstrap` handles auth state
  mounting (see `auth-security.md`).
