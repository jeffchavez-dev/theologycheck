import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function findFile(slug: string) {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files.find(f => f === `${slug}.md` || f.endsWith(`-${slug}.md`)) ?? null
}

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
    })
  }

  if (!fs.existsSync(postsDir)) return NextResponse.json([])
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data } = matter(raw)
    return { slug, title: data.title ?? slug, date: data.date ?? '' }
  }).sort((a, b) => a.date < b.date ? 1 : -1)
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const { title, excerpt, body, tags } = await req.json()
  if (!title || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
  const date = new Date().toISOString().split('T')[0]
  const slug = slugify(title)
  const tagsYaml = tags?.length ? `\ntags:\n${tags.map((t: string) => `  - "${t}"`).join('\n')}` : ''
  const markdown = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt ?? ''}"${tagsYaml}\n---\n\n${body}`
  fs.writeFileSync(path.join(postsDir, `${date}-${slug}.md`), markdown, 'utf8')
  return NextResponse.json({ slug })
}

export async function PUT(req: NextRequest) {
  const { slug, title, excerpt, body, tags } = await req.json()
  if (!slug || !title || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const file = findFile(slug)
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const existing = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
  const date = existing.data.date ?? new Date().toISOString().split('T')[0]
  const tagsYaml = tags?.length ? `\ntags:\n${tags.map((t: string) => `  - "${t}"`).join('\n')}` : ''
  const markdown = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt ?? ''}"${tagsYaml}\n---\n\n${body}`
  fs.writeFileSync(path.join(postsDir, file), markdown, 'utf8')
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 })
  const file = findFile(slug)
  if (file) fs.unlinkSync(path.join(postsDir, file))
  return NextResponse.json({ ok: true })
}
