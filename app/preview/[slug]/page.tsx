import { getPostBySlug } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
// Never statically generated — always dynamic so drafts/scheduled are accessible
export const dynamic = 'force-dynamic'

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const wordCount = post.content?.replace(/<[^>]+>/g, '').split(/\s+/).length ?? 0
  const readTime = Math.max(1, Math.round(wordCount / 200))

  const today = new Date().toISOString().split('T')[0]
  const isScheduled = post.date > today

  return (
    <>
      {/* Preview banner */}
      <div style={{
        background: '#2a1a0e', color: '#f5efe3', textAlign: 'center',
        padding: '10px 1rem', fontSize: 13, fontFamily: 'EB Garamond, serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c47c2b' }}>
          {isScheduled ? 'Scheduled — Coming Soon' : 'Draft Preview — Not yet published'}
        </span>
        <span style={{ color: '#8a7060', fontSize: 12 }}>
          This post is shared for review only. Please do not distribute further.
        </span>
      </div>

      <article className="post-page">
        <header className="post-header">
          <div className="post-tags">
            {post.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta" style={{ justifyContent: 'center' }}>
            {post.author && <><span>By {post.author}</span><span>·</span></>}
            <span>{date}</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        <footer className="post-footer">
          <div className="divider">✦ ✦ ✦</div>
          <Link href="/" className="back-link">← Theology Check</Link>
        </footer>
      </article>
    </>
  )
}
