import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import footnotes from 'remark-footnotes'

const postsDir = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  author?: string
  content?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
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
        draft: data.draft || false,
      }
    })
    .filter(post => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(footnotes, { inlineNotes: true }).use(html, { sanitize: false }).process(content)
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || '',
    content: processed.toString(),
  }
}
