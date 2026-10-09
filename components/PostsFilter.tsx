'use client'

import { useState, useEffect } from 'react'
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

  // Read ?tag= from URL on mount
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get('tag')
    if (tag && allTags.includes(tag)) setActiveTag(tag)
  }, [allTags])

  function selectTag(tag: string | null) {
    setActiveTag(tag)
    if (tag) {
      router.replace(`/?tag=${encodeURIComponent(tag)}`, { scroll: false })
    } else {
      router.replace('/', { scroll: false })
    }
  }

  const filteredFeatured = activeTag
    ? featured?.tags.includes(activeTag) ? featured : null
    : featured

  const filteredRest = activeTag
    ? rest.filter(p => p.tags.includes(activeTag))
    : rest

  const showFeatured = !!filteredFeatured
  const listPosts = !showFeatured && activeTag && featured?.tags.includes(activeTag)
    ? [featured!, ...filteredRest]
    : filteredRest

  const allPosts = featured ? [featured, ...rest] : rest
  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = allPosts.filter(p => p.tags.includes(tag)).length
    return acc
  }, {})

  const gridPosts = activeTag
    ? allPosts.filter(p => p.tags.includes(activeTag))
    : allPosts

  return (
    <>
      {/* Tag filter bar */}
      <div className="tag-filter-bar">
        <button
          className={`tag-filter-btn${activeTag === null ? ' active' : ''}`}
          onClick={() => selectTag(null)}
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
              {i === 0 && !activeTag && <span className="featured-badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Latest</span>}
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
          <p className="excerpt">No posts found for &ldquo;{activeTag}&rdquo;.</p>
        </div>
      )}
    </>
  )
}
