# Content (Prismic blogs) & SEO

## Prismic (blogs)

Blog content lives in **Prismic** (custom type `blog_post`), not in the repo.
The web app only provides the rendering.

| File                                              | Role                                                    |
| ------------------------------------------------- | ------------------------------------------------------- |
| `src/prismicio.ts`                                | Client factory: repository name, route mapping, caching |
| `src/app/blogs/page.tsx`                          | Blog index (list of posts)                              |
| `src/app/blogs/[uid]/page.tsx`                    | Individual post (SliceZone + metadata)                  |
| `src/slices/RichText`, `src/slices/BlogsTitle`    | Custom slice components                                 |
| `src/app/api/preview/route.ts`                    | Prismic preview URL redirect                            |
| `src/app/api/exit-preview/route.ts`               | Clears preview cookie                                   |
| `src/app/api/revalidate/route.ts`                 | `revalidateTag("prismic")` cache purge                  |
| `src/components/PostCard.tsx`, `RichTextBlog.tsx` | Post card + rich text rendering                         |

### Caching behavior (`src/prismicio.ts`)

- **Production**: `{ next: { tags: ["prismic"] }, cache: "force-cache" }` —
  pages are cached and only rebuilt when `/api/revalidate` is called (or the
  deployment is rebuilt).
- **Development**: `revalidate: 5` (ISR every 5s).

### Publishing workflow

1. Edit/create a `blog_post` in Prismic (title, rich text, meta title,
   meta description, meta image, publication date).
2. Previews: in Prismic use the preview URL (points at `/api/preview`) — works
   locally and in prod.
3. To publish new content to the live site, trigger `/api/revalidate` (POST)
   after publishing so cached pages rebuild. (⚠️ the endpoint is currently
   unauthenticated — see `security-review.md`.)

## SEO

### Metadata

- **Server component pages**: `export const metadata` with `title`,
  `description`, `alternates.canonical`. OG/Twitter/JSON-LD inheritance comes
  from the root layout — don't repeat it.
- **`"use client"` pages** (e.g. login, career): metadata lives in a sibling
  `layout.tsx` in the same folder.
- **Blog posts**: `generateMetadata` reads Prismic fields (`meta_title`,
  `meta_description`, `meta_image`).
- Exactly one `<h1>` per page, content wrapped in `<main>`.

### Files

| File                          | What it does                                                                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/robots.ts`           | Blocks AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.) entirely; allows search engines; disallows `/login`, `/account`, `/payment-success`, `/thank-you`, `/athayog-app/*` |
| `src/app/sitemap.ts`          | `indexedPages` array (14 static paths) + all Prismic blog posts                                                                                                                   |
| `src/app/opengraph-image.tsx` | Dynamic OG image (next/og, Edge runtime)                                                                                                                                          |
| `public/manifest.json`        | PWA manifest (brand name/colors)                                                                                                                                                  |
| `src/app/layout.tsx`          | Root metadata (title template, OG, twitter), `google-site-verification`                                                                                                           |

### Indexing rules to remember

- `/ld/*` landing pages are **noindex** (set in each `ld/*/layout.tsx` via
  `robots: { index: false, follow: false }`).
- `/payment-success` and `/thank-you` are noindex.
- When adding a **public** page: add it to `indexedPages` in `sitemap.ts` and
  give it metadata + `<main>` + one `<h1>`.
- When adding a **marketing/ads** page: put it under `/ld/` with a noindex
  layout so it never competes in search.

## How to update content

- Blog text/SEO → edit in Prismic, then revalidate.
- Page copy → edit the `src/app/*/page.tsx` JSX (see `ai-workflow.md` for
  conventions; be careful with the site's em-dash-free copy style in visible
  page text).
- Sitemap/robots → edit `src/app/sitemap.ts` / `src/app/robots.ts` and rebuild.
- OG image → `src/app/opengraph-image.tsx` (brand colors/tokens from
  `globals.css`).
