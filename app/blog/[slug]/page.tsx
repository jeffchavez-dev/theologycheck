import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const wordCount = post.content?.replace(/<[^>]+>/g, '').split(/\s+/).length ?? 0
  const readTime = Math.max(1, Math.round(wordCount / 200))

  return (
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
        className={`post-content${post.dropCap ? ' drop-cap' : ''}`}
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />

      <footer className="post-footer">
        <div className="divider">✦ ✦ ✦</div>
        <Link href="/" className="back-link">← Back to all posts</Link>
      </footer>
    </article>
  )
}
