@AGENTS.md

# Theology Check — Project Guide for Claude

## Overview
Reformed Baptist theology blog at **theologycheck.blog**.
Stack: **Next.js 16 App Router** · TypeScript · Markdown posts · Vercel (hosting) · GitHub (storage)

Owner: Jeff Chavez (`jeffchavez0828@gmail.com`)

---

## Architecture

### Why GitHub for writes
Vercel's filesystem is **read-only** at runtime. All content writes (posts, tags, authors, subscribers) go through the **GitHub Contents API** using `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`. The local filesystem is only used for reads (available after each Vercel deploy).

### Post storage
- Posts live in `/posts/` as `.md` files with gray-matter frontmatter
- Filename format: `YYYY-MM-DD-slug.md`
- Key frontmatter fields: `title`, `date`, `excerpt`, `tags[]`, `draft`, `scheduled`, `author`, `series`, `seriesOrder`, `dropCapParagraph`, `updatedAt`, `updateCount`
- All string YAML fields must be escaped with `yamlStr()` in `app/api/posts/route.ts` to prevent parse failures from quotes

### Auth
Admin uses a simple password check. Session stored in `sessionStorage` key `tc-auth = '1'`. Password is hardcoded in `app/admin/page.tsx` as `ADMIN_KEY`.

---

## Key Files

| File | Purpose |
|------|---------|
| `app/admin/page.tsx` | Full admin dashboard (posts, metadata, subscribers, tags, authors) |
| `app/api/posts/route.ts` | CRUD for posts via GitHub API + `revalidatePath()` |
| `app/api/subscribe/route.ts` | Subscription form → saves to `data/subscribers.json` + sends welcome email via Resend |
| `app/api/subscribers/route.ts` | GET/PUT/DELETE for subscriber management |
| `app/api/tags/route.ts` | Tag CRUD, stored in `data/tags.json` |
| `app/api/authors/route.ts` | Author CRUD, stored in `data/authors.json` |
| `app/blog/[slug]/page.tsx` | Individual post page |
| `components/PostsFilter.tsx` | Homepage tag filter, URL-synced via `?tag=` param |
| `components/Footer.tsx` | Site footer + subscribe form |
| `components/SubscribeForm.tsx` | Email subscribe form (client component) |
| `components/Header.tsx` | Site nav |
| `components/SeriesNav.tsx` | Prev/next navigation within a series |
| `lib/posts.ts` | `getAllPosts()`, `getPostBySlug()` |
| `lib/seriesUtils.ts` | `seriesSlug()`, `getScheduledPosts()` |
| `data/subscribers.json` | Subscriber list (written via GitHub API on each subscription) |
| `data/tags.json` | Available tags |
| `data/authors.json` | Available authors |
| `public/og-image.png` | OG share image (cathedral interior, 2000×1199) |

---

## Features

### Admin dashboard (`/admin`)
- Two-column layout: left = writing form, right = sticky control panel
- Mobile: right panel slides in as a drawer via hamburger button
- **Accordion** component is defined **outside** `AdminPage` (critical — defining it inside causes focus loss on inputs due to remounting)
- Only one accordion open at a time (`openSection: string | null`)
- Sections: Published · Scheduled · Drafts · Series · Subscribers · Tags · Authors
- Markdown toolbar above body textarea with H1–H3, ¶, B, I, U, quote, bullet, ordered, hr, link, footnote
- **Email modal** opens after Publish/Update (not Draft/Schedule) — shows ready-to-forward welcome email HTML with subscriber list below

### Subscription
- Form in footer: `components/SubscribeForm.tsx`
- On subscribe: email saved to `data/subscribers.json` via GitHub API; duplicate check returns `already: true`; Resend sends a formatted welcome email to `jeffchavez0828@gmail.com` from `jeff@theologycheck.blog`
- `theologycheck.blog` domain is **verified** in Resend — use `jeff@theologycheck.blog` as sender
- Admin can edit/delete subscribers inline in the Subscribers accordion

### Email workflow (manual)
When a new post is published, the admin email modal shows:
1. Rendered HTML preview of the newsletter email (banner + title + excerpt + CTA)
2. "Copy Email HTML" button (copies `text/html` to clipboard for Gmail paste)
3. "Send to: email1, email2, ..." subscriber list for the To field

### Tags / Authors
Managed in admin accordions. Renaming a tag renames it across all posts via the API.

### Series
- Posts linked by `series` + `seriesOrder` frontmatter
- Series pages at `/series` and `/series/[slug]`
- Prev/next navigation rendered by `SeriesNav`

### Tag filtering
Homepage filter syncs to `?tag=` URL param. Tag chips on post pages are `<Link>` to `/?tag=name`.

### ISR / revalidation
After every POST/PUT in `app/api/posts/route.ts`, `revalidatePath()` is called for `/`, `/series`, `/blog/[slug]`, and the series page — so changes go live on Vercel within seconds without a full redeploy.

### YAML safety
`yamlStr(s)` in `app/api/posts/route.ts` escapes `\` and `"` in all frontmatter string fields. Always use it when building markdown frontmatter.

---

## Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub personal access token for content writes |
| `GITHUB_OWNER` | GitHub username (`jeffchavez-dev`) |
| `GITHUB_REPO` | Repo name (`theologycheck`) |
| `RESEND_API_KEY` | Resend API key for sending emails |

---

## Deployment
- Push to `main` → Vercel auto-deploys
- If Vercel redeploys an old commit by mistake, push an empty commit: `git commit --allow-empty -m "Trigger redeploy" && git push`
- TypeScript errors will fail the build — always run `npx tsc --noEmit` before pushing

## Common pitfalls
- **Never** instantiate `new Resend(key)` or similar SDK clients at module level — Vercel evaluates module-level code during build when env vars are absent. Always instantiate inside the handler function.
- **Never** define React components inside another component — causes remounting on every render (breaks input focus, resets state).
- Unescaped `"` in YAML frontmatter will break `gray-matter` and crash the build with a null byte error.
- `data/subscribers.json` is written dynamically — read it via GitHub API, not the local filesystem.
