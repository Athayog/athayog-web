# Athayog Web — Documentation

This folder is the single source of truth for **how this codebase works**. It is
written for two audiences:

1. **Human maintainers** who need to understand or change the platform.
2. **AI agents / assistants** working in this repo, so they do not guess, invent
   architecture, or create black boxes.

## Read this first

| If you want to…                                   | Read                                       |
| ------------------------------------------------- | ------------------------------------------ |
| Understand the whole system in 10 minutes         | [`architecture.md`](architecture.md)       |
| Understand login, sessions and what is protected  | [`auth-security.md`](auth-security.md)     |
| Understand how payments and plans work            | [`payments.md`](payments.md)               |
| Add or change a contact/booking form              | [`forms.md`](forms.md)                     |
| Publish a blog or change SEO/sitemap/robots       | [`content-seo.md`](content-seo.md)         |
| Deploy, configure env vars or update dependencies | [`deployment.md`](deployment.md)           |
| Work here as an AI agent (conventions + pitfalls) | [`ai-workflow.md`](ai-workflow.md)         |
| See known security issues and recommended fixes   | [`security-review.md`](security-review.md) |

## Golden rules (see `ai-workflow.md` for details)

1. **Read `AGENTS.md` and this `docs/` folder before editing anything.**
2. **Never change a flow and leave docs behind** — update the relevant doc in
   the same change. Stale docs are how black boxes are born.
3. **Never bypass server-side checks** (prices are read from Firestore, never
   from the client; payments are verified with Razorpay signatures server-side).
4. **Never commit secrets.** `.env*` files are git-ignored. The only env
   reference file that should be committed is `.env.example`.
5. **Keep `GAPS.md` accurate** — it is the project's TODO/infra tracker and is
   read by every AI agent before starting work.

## How this documentation stays accurate

- Every doc lists the exact source files it describes. When a file is renamed
  or deleted, update the doc.
- When you add a feature, add a "How to update" section or extend an existing
  one.
- `security-review.md` is a living audit: fix an item, check it off there.
