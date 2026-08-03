# Memory — Theology Check Blog Session

Last updated: 2026-07-05

## What was built

### Subscription system
- `app/api/subscribe/route.ts` — POST endpoint: saves email to `data/subscribers.json` via GitHub API, sends formatted HTML welcome email via Resend from `jeff@theologycheck.blog`, returns `already: true` for duplicate emails
- `app/api/subscribers/route.ts` — GET/PUT/DELETE for subscriber management (admin use)
- `components/SubscribeForm.tsx` — Client component with email input, success/already/error states
- `components/Footer.tsx` — Updated to include `SubscribeForm` above the footer
- `data/subscribers.json` — Stores subscriber list (3 real subscribers as of session end)

### Admin dashboard improvements
- `app/admin/page.tsx` — Major updates:
  - Subscribers accordion with inline Edit/✕ per row (calls PUT/DELETE `/api/subscribers`)
  - Email modal opens after every Publish/Update (not Draft/Schedule) showing formatted HTML newsletter preview + "Copy Email HTML" button + subscriber list for To field
  - `Accordion` component moved **outside** `AdminPage` to fix input focus loss bug
  - Single-open accordion behavior (`openSection: string | null` replacing `openSections: Set`)
  - Subscriber edit/delete state: `editingSubscriber`, `editingSubscriberVal`

### Content
- `posts/2026-01-07-the-24-thomistic-theses.md` — Fully migrated from WordPress with all 24 theses, English + Latin text, 26 footnotes across Ontology/Cosmology/Psychology/Theodicy sections

### Project documentation
- `CLAUDE.md` — Comprehensive project guide covering architecture, all features, key files table, env vars, deployment notes, and common pitfalls. Auto-loaded every session.

## Decisions made

- **Email sender**: `jeff@theologycheck.blog` — domain verified in Resend, use this for all outbound emails
- **Subscriber storage**: `data/subscribers.json` in GitHub (same pattern as tags/authors) — read via GitHub API at runtime since file updates after deploy
- **Welcome email flow**: Jeff receives a ready-to-forward formatted HTML email on each new subscriber; he manually forwards it. No automated send to subscriber.
- **Duplicate prevention**: API returns `{ ok: true, already: true }` for known emails — UI shows "You're already subscribed" message, no email sent
- **Accordion architecture**: `Accordion` must stay outside `AdminPage` component — defining it inside caused remounting on every keystroke, breaking all input focus
- **Heart reactions**: Decided against — removed completely (no Upstash dependency)

## Problems solved

- **Resend build error**: `new Resend(key)` at module level throws during Vercel build when env var absent. Fixed by instantiating inside the handler after key is confirmed.
- **Accordion input focus loss**: `Accordion` defined inside `AdminPage` was remounted on every state change. Moved outside the component.
- **Vercel redeploy wrong commit**: Vercel "Redeploy" button redeploys the selected commit, not the latest. Push an empty commit to force a fresh build from latest: `git commit --allow-empty -m "Trigger redeploy" && git push`
- **TypeScript errors blocking deploy**: `findIndex`/`filter` callbacks in `app/api/subscribers/route.ts` had implicit `any`. Fixed by adding `Subscriber` interface.

## Current state

Everything is deployed and working on theologycheck.blog:
- Subscribe form live in footer — emails Jeff on new subscriber, stores email in `data/subscribers.json`
- Admin subscribers accordion shows 3 real subscribers with edit/delete
- Email modal works on publish — copy HTML + subscriber emails visible
- `theologycheck.blog` domain verified in Resend
- 3 active subscribers: yumnfries@gmail.com, jeffchavez.ai@gmail.com, partikular.waters@gmail.com
- JSM skills installed: architect, imprint, recover, remember, review

## Next session starts with

Run `/remember restore` then check if there are any pending WordPress posts to migrate or new features Jeff wants to add. The CLAUDE.md has full project context — read it before any code changes.

## Open questions

- Jeff hasn't set up a custom inbox for `jeff@theologycheck.blog` yet — Cloudflare Email Routing was recommended to forward replies to Gmail (domain appears to be on Cloudflare)
- The `remember` skill is flagged High Risk by Snyk — worth reviewing before heavy use
