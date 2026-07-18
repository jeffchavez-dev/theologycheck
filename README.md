# Theology Check

A Reformed Baptist theology blog at [theologycheck.blog](https://theologycheck.blog).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · Markdown · Vercel · GitHub API

---

## What It Is

Theology Check is a personal theology blog drawing from the Reformed Baptist tradition — classical theism, natural theology, covenant theology, and the 1689 London Baptist Confession. Posts are written in Markdown, stored in GitHub, and served statically via Vercel.

The blog has no traditional CMS. All content management happens through a custom admin dashboard at `/admin`.

---

## How It Works

### Content Storage

Posts live in `/posts/` as `.md` files with gray-matter frontmatter. Filename format: `YYYY-MM-DD-slug.md`.

**Key frontmatter fields:**

| Field | Purpose |
|---|---|
| `title` | Post title |
| `date` | Publication date (`YYYY-MM-DD`) |
| `excerpt` | Summary shown on homepage and in emails |
| `tags` | Array of tag strings |
| `author` | Author name |
| `series` | Series name — groups posts together |
| `seriesOrder` | Position within the series (auto-assigned by admin) |
| `draft: true` | Hidden from public; visible in admin |
| `scheduled: true` | Shows as "Coming Soon" in series; not yet published |
| `dropCapParagraph` | Index of paragraph to apply a decorative drop cap |
| `updatedAt` | ISO timestamp of last edit |
| `updateCount` | Number of edits |

### Why GitHub for Writes

Vercel's filesystem is **read-only** at runtime. All writes (posts, tags, subscribers) go through the **GitHub Contents API** using a personal access token. The local filesystem is only used for reads, available after each Vercel deploy.

### Post Rendering

Posts are parsed from Markdown to HTML using `remark` + `rehype` with plugins for footnotes and smart quotes. The HTML is injected into the post page via `dangerouslySetInnerHTML`.

---

## Admin Dashboard (`/admin`)

Password-protected (stored in `sessionStorage`). Two-column layout: writing form on the left, sticky control panel on the right. Mobile: right panel slides in as a drawer.

**Writing form**
- Title, excerpt, body (Markdown), date, author, tags, drop cap toggle, series assignment

**Markdown toolbar**
- H1–H3, paragraph mark, bold, italic, underline
- Simple quote (`"`) — prefixes line with `>`
- Full pull-quote (`❝¶`) — inserts a centered dark card with attribution template and Share button
- Bullet list, ordered list, horizontal rule, link, footnote

**Right panel**
- Search filter across all posts
- Published, Scheduled, Drafts accordions — each row has Edit / Share / Duplicate / Delete
- Series manager — reorder posts within a series with ▲/▼ arrows
- Subscribers, Tags, Authors accordions

**After publishing** an email modal opens with a ready-to-copy newsletter HTML + subscriber list for the To field.

### Pull-Quote (`❝¶`)

Inserts a `<div class="pull-quote">` wrapper around a Markdown blockquote. On the blog page this renders as a centered dark card with the cathedral cover photo behind the text. A **Share** button appears on hover and generates a 1200×630 image (same aesthetic — cathedral photo, gold border, Cinzel type) copied to the clipboard.

Only blockquotes explicitly wrapped with `.pull-quote` get this treatment. Regular `>` quotes keep the left-border inline style.

### Draft Sharing

Drafts and scheduled posts can be shared for review via `/preview/[slug]`. The **Share** button in the admin copies the preview URL. The preview page shows a contributor-facing banner and links back to the main site.

---

## Series

Posts are grouped into series via the `series` frontmatter field. Series pages live at `/series` and `/series/[slug]`.

- A series only appears publicly if at least one post in it is **published**
- Scheduled posts appear as **"Coming Soon"** entries within a series
- Part numbers reflect list position, not the stored `seriesOrder` value
- `seriesOrder` is auto-assigned when saving a post into a series

---

## Subscription

Subscribe form is in the site footer. On subscribe:

1. Email is saved to `data/subscribers.json` via GitHub API (duplicate-safe)
2. A welcome email is sent via **Resend** from `jeff@theologycheck.blog`

The admin can manage subscribers (edit, delete) from the Subscribers accordion.

### Newsletter

When a post is published, a modal shows:
- Rendered HTML preview of the newsletter email
- "Copy Email HTML" — copies `text/html` to clipboard for pasting into Gmail
- Subscriber list for the To field

---

## Search

Handled server-side via direct filesystem reads — no external index. Extracts contextual snippets around keyword matches and highlights them in results.

---

## Key Files

| File | Purpose |
|---|---|
| `app/admin/page.tsx` | Full admin dashboard |
| `app/api/posts/route.ts` | Post CRUD via GitHub API |
| `app/api/subscribe/route.ts` | Subscription form handler |
| `app/api/subscribers/route.ts` | Subscriber management |
| `app/api/tags/route.ts` | Tag CRUD |
| `app/api/authors/route.ts` | Author CRUD |
| `app/blog/[slug]/page.tsx` | Individual post page |
| `app/preview/[slug]/page.tsx` | Draft/scheduled preview (force-dynamic) |
| `app/search/page.tsx` | Search results |
| `app/series/page.tsx` | Series index |
| `app/series/[slug]/page.tsx` | Individual series page |
| `components/QuoteShare.tsx` | Pull-quote share card (canvas image generator) |
| `components/SiteShell.tsx` | Hides header/footer on `/admin` |
| `components/SeriesNav.tsx` | Prev/next navigation within a series |
| `lib/posts.ts` | `getAllPosts()`, `getPostBySlug()` |
| `lib/seriesUtils.ts` | `seriesSlug()`, `getScheduledPosts()` |
| `data/subscribers.json` | Subscriber list |
| `data/tags.json` | Available tags |
| `data/authors.json` | Available authors |
| `public/og-image.png` | OG share image (cathedral interior, 2000×1199) |

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | GitHub personal access token for content writes |
| `GITHUB_OWNER` | GitHub username (`jeffchavez-dev`) |
| `GITHUB_REPO` | Repo name (`theologycheck`) |
| `RESEND_API_KEY` | Resend API key for welcome emails |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin is at `/admin`.

**Before pushing:**

```bash
npx tsc --noEmit
```

TypeScript errors will fail the Vercel build.

**Deployment:** Push to `main` → Vercel auto-deploys. If Vercel deploys a stale commit:

```bash
git commit --allow-empty -m "Trigger redeploy" && git push
```

---

## Common Pitfalls

- **Never** instantiate SDK clients (Resend, etc.) at module level — Vercel evaluates module-level code at build time when env vars are absent. Always instantiate inside the handler.
- **Never** define React components inside another component — causes remounting and breaks input focus in the admin.
- Unescaped `"` in YAML frontmatter breaks `gray-matter` with a null byte error. All string fields pass through `yamlStr()` in the posts API route.
- `data/subscribers.json` is written dynamically at runtime — always read it via the GitHub API, never from the local filesystem.
