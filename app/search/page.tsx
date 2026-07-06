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
      const searchable = [data.title ?? '', data.excerpt ?? '', content].join(' ').toLowerCase()
      if (!searchable.includes(query)) return null
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
              {post.excerpt && <p className="search-result-excerpt">{post.excerpt}</p>}
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
