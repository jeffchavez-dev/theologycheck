'use client'

import { useState } from 'react'
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

const romanNumerals = ['II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function PostsFilter({ featured, rest, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredFeatured = activeTag
    ? featured?.tags.includes(activeTag) ? featured : null
    : featured

  const filteredRest = activeTag
    ? rest.filter(p => p.tags.includes(activeTag))
    : rest

  // If active tag filters out the featured post, show it in the list instead
  const showFeatured = !!filteredFeatured
  const listPosts = !showFeatured && activeTag && featured?.tags.includes(activeTag)
    ? [featured!, ...filteredRest]
    : filteredRest

  const allPosts = featured ? [featured, ...rest] : rest
  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = allPosts.filter(p => p.tags.includes(tag)).length
    return acc
  }, {})

  return (
    <>
      {/* Tag filter bar */}
      <div className="tag-filter-bar">
        <button
          className={`tag-filter-btn${activeTag === null ? ' active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{allPosts.length}</span>
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-filter-btn${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag} <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{tagCounts[tag]}</span>
          </button>
        ))}
      </div>

      {/* Featured / latest post */}
      {showFeatured && filteredFeatured ? (
        <div className="featured-post">
          <span className="featured-badge">Latest Post</span>
          <h2><Link href={`/blog/${filteredFeatured.slug}`}>{filteredFeatured.title}</Link></h2>
          <p className="excerpt">{filteredFeatured.excerpt}</p>
          <div className="post-meta">
            <span>{new Date(filteredFeatured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {filteredFeatured.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
          </div>
        </div>
      ) : !activeTag ? (
        <div className="featured-post" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="excerpt">No posts yet. <Link href="/admin" style={{ color: '#8b1a1a', textDecoration: 'underline' }}>Go to Admin</Link> to write your first post.</p>
        </div>
      ) : null}

      {/* Posts list */}
      {listPosts.length > 0 && (
        <>
          <div className="section-label">{activeTag ? `Posts tagged "${activeTag}"` : 'All Posts'}</div>
          <div className="posts-grid">
            {listPosts.map((post, i) => (
              <div key={post.slug} className="post-card">
                <div className="post-number">{romanNumerals[i] ?? i + 2}</div>
                <div>
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p className="excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    {post.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTag && !showFeatured && listPosts.length === 0 && (
        <div className="featured-post" style={{ textAlign: 'center', padding: '2rem' }}>
          <p className="excerpt">No posts found for &ldquo;{activeTag}&rdquo;.</p>
        </div>
      )}
    </>
  )
}
