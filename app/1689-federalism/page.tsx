import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1689 Federalism',
  description: 'All posts on 1689 Federalism and Particular Baptist covenant theology.',
}

export default function FederalismPage() {
  const posts = getAllPosts().filter(p => p.tags.includes('1689 Federalism'))

  return (
    <div className="main">
      <div className="study-page-header">
        <div className="section-label">1689 Federalism</div>
        <h1 className="study-book-title">Particular Baptist Covenant Theology</h1>
        <p className="study-book-subtitle">
          Posts on the distinctives of 1689 Federalism and the Particular Baptist understanding of the biblical covenants.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: '#8a6040', fontStyle: 'italic', textAlign: 'center', paddingTop: '2rem' }}>
          No posts yet.
        </p>
      ) : (
        <ul className="federalism-post-list">
          {posts.map(post => (
            <li key={post.slug} className="federalism-post-item">
              <span className="federalism-post-date">
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
              <Link href={`/blog/${post.slug}`} className="federalism-post-title">
                {post.title}
              </Link>
              {post.excerpt && (
                <p className="federalism-post-excerpt">{post.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
