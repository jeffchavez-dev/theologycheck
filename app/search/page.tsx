import Link from 'next/link'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PostResult {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  author: string
  matchSnippet: { before: string; match: string; after: string } | null
}

// Strip markdown syntax so snippets read as plain prose
function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()
}

function getSnippet(
  text: string,
  query: string,
  radius = 90
): { before: string; match: string; after: string } | null {
  const lower = text.toLowerCase()
  const idx = lower.indexOf(query.toLowerCase())
  if (idx === -1) return null

  const start = Math.max(0, idx - radius)
  const end = Math.min(text.length, idx + query.length + radius)
  const before = (start > 0 ? '…' : '') + text.slice(start, idx)
  const match = text.slice(idx, idx + query.length)
  const after = text.slice(idx + query.length, end) + (end < text.length ? '…' : '')
  return { before, match, after }
}

function searchPosts(q: string): PostResult[] {
  const postsDir = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDir)) return []
  const today = new Date().toISOString().split('T')[0]
  const query = q.toLowerCase()

  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data, content } = matter(raw)
      if (data.draft || data.scheduled || (data.date && data.date > today)) return null

      const title: string = data.title ?? ''
      const excerpt: string = data.excerpt ?? ''
      const plainContent = stripMarkdown(content)
      const searchable = [title, excerpt, plainContent].join(' ').toLowerCase()
      if (!searchable.includes(query)) return null

      // Prefer a match in body over title/excerpt for the snippet
      let snippet = getSnippet(plainContent, q)
      if (!snippet) snippet = getSnippet(excerpt, q)
      if (!snippet) snippet = getSnippet(title, q)

      return {
        slug: file.replace(/\.md$/, ''),
        title,
        date: data.date ?? '',
        excerpt,
        tags: data.tags ?? [],
        author: data.author ?? '',
        matchSnippet: snippet,
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as PostResult[]
}

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ q?: string }> }
): Promise<Metadata> {
  const { q } = await searchParams
  return { title: q ? `Search: ${q} — Theology Check` : 'Search — Theology Check' }
}

export default async function SearchPage(
  { searchParams }: { searchParams: Promise<{ q?: string }> }
) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const results = query.length >= 2 ? searchPosts(query) : []

  return (
    <main className="search-page">
      <div className="search-page-header">
        <h1 className="search-page-title">Search</h1>
        {query && (
          <div className="search-meta">
            <span className="search-chip">
              <span>Search:</span> {query}
              <Link href="/search" className="search-chip-clear" aria-label="Clear search">✕</Link>
            </span>
            <span className="search-count">
              {results.length === 0
                ? 'No results found'
                : `Showing ${results.length} result${results.length === 1 ? '' : 's'}`}
            </span>
          </div>
        )}
      </div>

      {!query && (
        <p className="search-empty">Enter a search term in the navigation bar above.</p>
      )}

      {query && results.length === 0 && (
        <p className="search-empty">No posts found for &ldquo;{query}&rdquo;. Try a different search term.</p>
      )}

      {results.length > 0 && (
        <div className="search-results">
          {results.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="search-result-card">
              <div className="search-result-meta">
                <span className="search-result-type">Post</span>
                <span className="search-result-date">
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h2 className="search-result-title">{post.title}</h2>
              {post.matchSnippet && (
                <p className="search-result-snippet">
                  {post.matchSnippet.before}
                  <mark className="search-highlight">{post.matchSnippet.match}</mark>
                  {post.matchSnippet.after}
                </p>
              )}
              {post.tags?.length > 0 && (
                <div className="search-result-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="search-result-tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
