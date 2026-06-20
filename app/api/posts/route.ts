import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'posts')

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  if (!fs.existsSync(postsDir)) return NextResponse.json([])
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m)
    const dateMatch = content.match(/^date:\s*(.+)$/m)
    return { slug, title: titleMatch?.[1] ?? slug, date: dateMatch?.[1] ?? '' }
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

export async function DELETE(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 })
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(`-${slug}.md`) || f === `${slug}.md`)
  files.forEach(f => fs.unlinkSync(path.join(postsDir, f)))
  return NextResponse.json({ ok: true })
}
