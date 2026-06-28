import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from './posts'

const postsDir = path.join(process.cwd(), 'posts')

export function seriesSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getScheduledPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const today = new Date().toISOString().split('T')[0]
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        author: data.author || '',
        series: data.series || '',
        seriesOrder: data.seriesOrder ?? 0,
        draft: data.draft || false,
      }
    })
    .filter(p => !p.draft && p.date > today)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}

export interface SeriesInfo {
  name: string
  slug: string
  publishedCount: number
  firstExcerpt: string
  firstSlug: string
}

export function getActiveSeries(): SeriesInfo[] {
  if (!fs.existsSync(postsDir)) return []
  const today = new Date().toISOString().split('T')[0]

  const byName = new Map<string, { count: number; firstDate: string; firstExcerpt: string; firstSlug: string }>()

  fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .forEach(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(raw)
      if (!data.series || data.draft || (data.date ?? '') > today) return
      const name = data.series as string
      const existing = byName.get(name)
      if (!existing || data.date < existing.firstDate) {
        byName.set(name, {
          count: (existing?.count ?? 0) + 1,
          firstDate: data.date ?? '',
          firstExcerpt: data.excerpt ?? '',
          firstSlug: slug,
        })
      } else {
        byName.set(name, { ...existing, count: existing.count + 1 })
      }
    })

  return Array.from(byName.entries()).map(([name, info]) => ({
    name,
    slug: seriesSlug(name),
    publishedCount: info.count,
    firstExcerpt: info.firstExcerpt,
    firstSlug: info.firstSlug,
  }))
}
