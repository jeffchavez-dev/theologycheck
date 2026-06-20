import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)
  const romanNumerals = ['II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

  return (
    <>
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-line" />
          <p>
            &ldquo;Id ergo quod subsistit in Deo, est suum esse.&rdquo;<br />
            <span className="hero-ref">— Thomas Aquinas, Iª q. 3 a. 4 s. c.</span>
          </p>
        </div>
      </div>

      <div className="main">
        {featured ? (
          <div className="featured-post">
            <span className="featured-badge">Latest Post</span>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <p className="excerpt">{featured.excerpt}</p>
            <div className="post-meta">
              <span>{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {featured.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
            </div>
          </div>
        ) : (
          <div className="featured-post" style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="excerpt">No posts yet. <Link href="/admin" style={{ color: '#8b1a1a', textDecoration: 'underline' }}>Go to Admin</Link> to write your first post.</p>
          </div>
        )}

        {rest.length > 0 && (
          <>
            <div className="section-label">All Posts</div>
            <div className="posts-grid">
              {rest.map((post, i) => (
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

        <div className="divider">✦ ✦ ✦</div>
      </div>
    </>
  )
}
