import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = 'main'

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function findFile(slug: string) {
  if (!fs.existsSync(postsDir)) return null
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files.find(f => f === `${slug}.md` || f.endsWith(`-${slug}.md`)) ?? null
}

function buildMarkdown(title: string, date: string, excerpt: string, tags: string[], draft: boolean, body: string, author: string, updatedAt: string, updateCount: number, dropCapParagraph = 0, series = '', seriesOrder = 0) {
  const tagsYaml = tags?.length ? `\ntags:\n${tags.map((t: string) => `  - "${t}"`).join('\n')}` : ''
  const draftLine = draft ? `\ndraft: true` : ''
  const dropCapLine = dropCapParagraph > 0 ? `\ndropCapParagraph: ${dropCapParagraph}` : ''
  const seriesLine = series ? `\nseries: "${series}"\nseriesOrder: ${seriesOrder}` : ''
  return `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt ?? ''}"${tagsYaml}${draftLine}${dropCapLine}${seriesLine}\nauthor: "${author ?? ''}"\nupdatedAt: "${updatedAt}"\nupdateCount: ${updateCount}\n---\n\n${body}`
}

async function githubGetSHA(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.sha ?? null
}

async function githubWriteFile(filePath: string, content: string, message: string, sha?: string | null) {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
}

async function githubDeleteFile(filePath: string, sha: string, message: string) {
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
    }
  )
}

// GET — read from filesystem (files are available after Vercel deploy)
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (slug) {
    if (!fs.existsSync(postsDir)) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const file = findFile(slug)
    if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data, content } = matter(raw)
    return NextResponse.json({
      slug,
      title: data.title ?? '',
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      body: content.trim(),
      draft: data.draft ?? false,
      dropCapParagraph: data.dropCapParagraph ?? 0,
      author: data.author ?? '',
      updatedAt: data.updatedAt ?? '',
      updateCount: data.updateCount ?? 0,
      series: data.series ?? '',
      seriesOrder: data.seriesOrder ?? 0,
    })
  }

  if (!fs.existsSync(postsDir)) return NextResponse.json([])
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data } = matter(raw)
    const today = new Date().toISOString().split('T')[0]
    const scheduled = !data.draft && (data.date ?? '') > today
    return { slug, title: data.title ?? slug, date: data.date ?? '', draft: data.draft ?? false, scheduled, series: data.series ?? '', seriesOrder: data.seriesOrder ?? 0 }
  }).sort((a, b) => a.date < b.date ? 1 : -1)
  return NextResponse.json(posts)
}

// POST — create new post via GitHub API
export async function POST(req: NextRequest) {
  const { title, excerpt, body, tags, date: inputDate, draft, author, dropCapParagraph, series, seriesOrder } = await req.json()
  if (!title || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const date = inputDate || new Date().toISOString().split('T')[0]
  const slug = slugify(title)
  const filename = `posts/${date}-${slug}.md`
  const markdown = buildMarkdown(title, date, excerpt ?? '', tags ?? [], draft ?? false, body, author ?? '', date, 0, dropCapParagraph ?? 0, series ?? '', seriesOrder ?? 0)

  const res = await githubWriteFile(filename, markdown, `Add post: ${title}`)
  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'GitHub write failed' }, { status: 500 })
  }
  return NextResponse.json({ slug })
}

// PUT — update existing post via GitHub API
export async function PUT(req: NextRequest) {
  const { slug, title, excerpt, body, tags, date: inputDate, draft, author, dropCapParagraph, series, seriesOrder } = await req.json()
  if (!slug || !title || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const file = findFile(slug)
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const existing = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
  const date = inputDate || existing.data.date || new Date().toISOString().split('T')[0]
  const updatedAt = new Date().toISOString().split('T')[0]
  const updateCount = (existing.data.updateCount ?? 0) + 1
  const markdown = buildMarkdown(title, date, excerpt ?? '', tags ?? [], draft ?? false, body, author ?? existing.data.author ?? '', updatedAt, updateCount, dropCapParagraph ?? existing.data.dropCapParagraph ?? 0, series ?? existing.data.series ?? '', seriesOrder ?? existing.data.seriesOrder ?? 0)

  const githubPath = `posts/${file}`
  const sha = await githubGetSHA(githubPath)
  const res = await githubWriteFile(githubPath, markdown, `Update post: ${title}`, sha)
  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'GitHub write failed' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

// DELETE — delete post via GitHub API
export async function DELETE(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 })

  const file = findFile(slug)
  if (!file) return NextResponse.json({ ok: true })

  const githubPath = `posts/${file}`
  const sha = await githubGetSHA(githubPath)
  if (!sha) return NextResponse.json({ error: 'Could not get file SHA' }, { status: 500 })

  const res = await githubDeleteFile(githubPath, sha, `Delete post: ${slug}`)
  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'GitHub delete failed' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
