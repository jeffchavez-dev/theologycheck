import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim().toLowerCase()
  if (!q || q.length < 2) return NextResponse.json([])

  if (!fs.existsSync(postsDir)) return NextResponse.json([])

  const today = new Date().toISOString().split('T')[0]
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  const results = files
    .map(file => {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data, content } = matter(raw)
      if (data.draft || data.scheduled || (data.date && data.date > today)) return null
      const searchable = [
        data.title ?? '',
        data.excerpt ?? '',
        content,
      ].join(' ').toLowerCase()
      if (!searchable.includes(q)) return null
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        author: data.author ?? '',
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1))

  return NextResponse.json(results)
}
