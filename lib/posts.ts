import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
// remark-footnotes is a CJS module with a .default property
// eslint-disable-next-line @typescript-eslint/no-require-imports
const footnotes = require('remark-footnotes').default

const postsDir = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  author?: string
  content?: string
  dropCapParagraph?: number
  series?: string
  seriesOrder?: number
  scheduled?: boolean
}

// Strip the YYYY-MM-DD- date prefix from a filename to get the URL slug
export function fileToSlug(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
}

// Find the file on disk that corresponds to a date-free slug
export function findFileBySlug(slug: string): string | null {
  if (!fs.existsSync(postsDir)) return null
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files.find(f =>
    f === `${slug}.md` ||
    (/^\d{4}-\d{2}-\d{2}-/.test(f) && f.replace(/^\d{4}-\d{2}-\d{2}-/, '') === `${slug}.md`)
  ) ?? null
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = fileToSlug(file)
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
        scheduled: data.scheduled || false,
        series: data.series || '',
        seriesOrder: data.seriesOrder ?? 0,
      }
    })
    .filter(post => !post.draft && !post.scheduled && post.date <= new Date().toISOString().split('T')[0])
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = findFileBySlug(slug)
  if (!file) return null
  const filePath = path.join(postsDir, file)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(footnotes, { inlineNotes: true }).use(remarkGfm).use(html, { sanitize: false }).process(content)
  const dropCapParagraph: number = data.dropCapParagraph ?? 0
  let htmlContent = processed.toString()
  if (dropCapParagraph > 0) {
    let count = 0
    htmlContent = htmlContent.replace(/<p>/g, () => {
      count++
      return count === dropCapParagraph ? '<p class="drop-cap-para">' : '<p>'
    })
  }
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || '',
    content: htmlContent,
    dropCapParagraph,
    series: data.series || '',
    seriesOrder: data.seriesOrder ?? 0,
  }
}
