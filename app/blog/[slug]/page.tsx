import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SeriesNav from '@/components/SeriesNav'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Series navigation
  let seriesNav = null
  if (post.series) {
    const allPosts = getAllPosts()
    const seriesPosts = allPosts
      .filter(p => p.series === post.series)
      .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
    const idx = seriesPosts.findIndex(p => p.slug === slug)
    const prev = idx > 0 ? seriesPosts[idx - 1] : null
    const next = idx < seriesPosts.length - 1 ? seriesPosts[idx + 1] : null
    seriesNav = {
      seriesName: post.series,
      part: (post.seriesOrder ?? idx + 1),
      total: seriesPosts.length,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
    }
  }

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
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />

      <footer className="post-footer">
        {seriesNav && <SeriesNav {...seriesNav} />}
        <div className="divider">✦ ✦ ✦</div>
        <Link href="/" className="back-link">← Back to all posts</Link>
      </footer>
    </article>
  )
}
