# Contributing to Athayog Living Web

This repository contains the Athayog Living web platform. Contributions and
changes should preserve the site's security, accessibility, performance, and
deployment requirements.

## Before you start

- Read `AGENTS.md`, `GAPS.md`, and the relevant documentation in `docs/`.
- Confirm the issue or requested change is understood before starting work.
- Never commit `.env` files, credentials, private keys, or payment secrets.

## Branches

Create short-lived branches from `main` using:

```text
<type>/<short-description>
```

Examples:

- `feat/trial-class-booking`
- `fix/payment-history-query`
- `docs/update-deployment-guide`

## Commits and pull requests

Use Conventional Commit titles:

```text
<type>(<scope>): <imperative summary>
```

Common types include `feat`, `fix`, `docs`, `refactor`, `perf`, `test`,
`chore`, `build`, and `ci`.

Pull requests should include:

- What changed and why.
- Testing performed.
- Screenshots or recordings for UI changes.
- Deployment or environment-variable notes.
- Follow-up work or known limitations.

All changes should target `main` through a pull request. Keep the pull request
focused and respond to review feedback before merging.

## Local checks

Install dependencies and configure `.env.local` from `.env.example`, then run:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Application changes must pass the full build gate before merging. Documentation
and configuration-only changes should at least pass formatting and a review of
the final diff.

## Project-specific requirements

- Use Next.js 16 conventions documented in `AGENTS.md` and `node_modules/next/dist/docs/`.
- Use CSS Modules and the existing global design tokens; do not add Tailwind.
- Keep server-only Firebase Admin and Razorpay code out of client bundles.
- Keep payment amounts authoritative on the server and verify Razorpay signatures.
- Update the relevant documentation when changing a flow.
- Keep `GAPS.md` accurate after infrastructure or launch-readiness work.
