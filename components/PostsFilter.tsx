'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  author?: string
}

interface Props {
  featured: Post | null
  rest: Post[]
  allTags: string[]
}

export default function PostsFilter({ featured, rest, allTags }: Props) {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [activeMonth, setActiveMonth] = useState<string | null>(null)

  const allPosts = useMemo(() => (featured ? [featured, ...rest] : rest), [featured, rest])

  // Read ?tag= and ?month= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tag = params.get('tag')
    const month = params.get('month')
    if (tag && allTags.includes(tag)) setActiveTag(tag)
    if (month && /^\d{4}-\d{2}$/.test(month)) setActiveMonth(month)
  }, [allTags])

  function selectTag(tag: string | null) {
    setActiveTag(tag)
    const params = new URLSearchParams(window.location.search)
    if (tag) params.set('tag', tag); else params.delete('tag')
    router.replace(params.toString() ? `/?${params}` : '/', { scroll: false })
  }

  function selectMonth(month: string | null) {
    setActiveMonth(month)
    const params = new URLSearchParams(window.location.search)
    if (month) params.set('month', month); else params.delete('month')
    router.replace(params.toString() ? `/?${params}` : '/', { scroll: false })
  }

  const tagCounts = useMemo(() =>
    allTags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = allPosts.filter(p => p.tags.includes(tag)).length
      return acc
    }, {}),
    [allTags, allPosts]
  )

  const archiveMonths = useMemo(() => {
    const map = new Map<string, number>()
    allPosts.forEach(p => {
      const ym = p.date.slice(0, 7)
      map.set(ym, (map.get(ym) ?? 0) + 1)
    })
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([ym, count]) => ({
        ym,
        label: new Date(ym + '-02T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
        count,
      }))
  }, [allPosts])

  const gridPosts = useMemo(() =>
    allPosts.filter(p => {
      const tagMatch = !activeTag || p.tags.includes(activeTag)
      const monthMatch = !activeMonth || p.date.startsWith(activeMonth)
      return tagMatch && monthMatch
    }),
    [allPosts, activeTag, activeMonth]
  )

  return (
    <div className="home-with-sidebar">
      {/* Main content */}
      <div className="home-main-content">
        {/* Tag filter bar */}
        <div className="tag-filter-bar">
          <button
            className={`tag-filter-btn${activeTag === null && activeMonth === null ? ' active' : ''}`}
            onClick={() => { selectTag(null); selectMonth(null) }}
          >
            All <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{allPosts.length}</span>
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => selectTag(activeTag === tag ? null : tag)}
            >
              {tag} <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{tagCounts[tag]}</span>
            </button>
          ))}
        </div>

        {/* Card grid */}
        {gridPosts.length > 0 ? (
          <div className="posts-card-grid">
            {gridPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="home-post-card">
                <div className="home-post-card-meta">
                  <span className="home-post-card-type">Post</span>
                  <span className="home-post-card-date">
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                {i === 0 && !activeTag && !activeMonth && (
                  <span className="featured-badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Latest</span>
                )}
                <h2 className="home-post-card-title">{post.title}</h2>
                <p className="home-post-card-excerpt">{post.excerpt}</p>
                {post.tags?.length > 0 && (
                  <div className="home-post-card-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="search-result-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : allPosts.length === 0 ? (
          <div className="featured-post" style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="excerpt">No posts yet. <Link href="/admin" style={{ color: '#8b1a1a', textDecoration: 'underline' }}>Go to Admin</Link> to write your first post.</p>
          </div>
        ) : (
          <div className="featured-post" style={{ textAlign: 'center', padding: '2rem' }}>
            <p className="excerpt">No posts found{activeTag ? ` for "${activeTag}"` : ''}{activeMonth ? ` in ${archiveMonths.find(m => m.ym === activeMonth)?.label ?? activeMonth}` : ''}.</p>
          </div>
        )}
      </div>

      {/* Archive sidebar — appears after main in DOM so mobile stacks it below */}
      <aside className="home-archive-sidebar">
        <div className="archive-sidebar-label">Archives</div>
        <ul className="archive-list">
          {archiveMonths.map(({ ym, label, count }) => (
            <li key={ym}>
              <button
                className={`archive-month-btn${activeMonth === ym ? ' active' : ''}`}
                onClick={() => selectMonth(activeMonth === ym ? null : ym)}
              >
                <span className="archive-month-name">{label}</span>
                <span className="archive-month-count">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
