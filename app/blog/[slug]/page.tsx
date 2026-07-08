import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { getScheduledPosts, seriesSlug } from '@/lib/seriesUtils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import EditButton from '@/components/EditButton'
import CopyLink from '@/components/CopyLink'
import QuoteShare from '@/components/QuoteShare'

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
      images: [{ url: '/og-image.png', width: 2000, height: 1199, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Build full series outline (published + scheduled) for the top panel
  let seriesOutline: {
    name: string
    slug: string
    parts: { title: string; slug: string | null; order: number; isCurrent: boolean; isComingSoon: boolean }[]
  } | null = null

  if (post.series) {
    const published = getAllPosts()
      .filter(p => p.series === post.series)
      .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
    const scheduled = getScheduledPosts()
      .filter(p => p.series === post.series)
      .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))

    seriesOutline = {
      name: post.series,
      slug: seriesSlug(post.series),
      parts: [
        ...published.map(p => ({
          title: p.title,
          slug: p.slug,
          order: p.seriesOrder ?? 0,
          isCurrent: p.slug === slug,
          isComingSoon: false,
        })),
        ...scheduled.map(p => ({
          title: p.title,
          slug: null,
          order: p.seriesOrder ?? 0,
          isCurrent: false,
          isComingSoon: true,
        })),
      ].sort((a, b) => a.order - b.order),
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
          {post.tags.map(tag => (<Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`} className="post-tag post-tag-link">{tag}</Link>))}
        </div>
        <h1>{post.title}</h1>
        <div className="post-meta" style={{ justifyContent: 'center' }}>
          {post.author && <><span>By {post.author}</span><span>·</span></>}
          <span>{date}</span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
      </header>

      {/* Series outline panel — shown below title, above content */}
      {seriesOutline && (
        <div className="series-outline">
          <div className="series-outline-header">
            <Link href={`/series/${seriesOutline.slug}`} className="series-outline-title">
              {seriesOutline.name}
            </Link>
            <span className="series-outline-label">Series</span>
          </div>
          <ol className="series-outline-list">
            {seriesOutline.parts.map((part, i) => (
              <li key={i} className={`series-outline-item${part.isCurrent ? ' current' : ''}${part.isComingSoon ? ' coming-soon' : ''}`}>
                {part.isComingSoon || !part.slug ? (
                  <span className="series-outline-item-title">{part.title}</span>
                ) : part.isCurrent ? (
                  <span className="series-outline-item-title">{part.title}</span>
                ) : (
                  <Link href={`/blog/${part.slug}`} className="series-outline-item-title">
                    {part.title}
                  </Link>
                )}
                {part.isComingSoon && <span className="series-outline-soon">Coming Soon</span>}

                {part.isCurrent && <span className="series-outline-reading">← Reading</span>}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />
      <QuoteShare />

      <footer className="post-footer">
        <div className="divider">✦ ✦ ✦</div>
<CopyLink />
        <Link href="/" className="back-link" style={{ marginTop: '1rem', display: 'inline-block' }}>← Back to all posts</Link>
      </footer>

      <EditButton slug={slug} />
    </article>
  )
}
