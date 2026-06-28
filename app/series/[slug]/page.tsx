import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import { getScheduledPosts, getActiveSeries, seriesSlug } from '@/lib/seriesUtils'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getActiveSeries().map(s => ({ slug: s.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const series = getActiveSeries().find(s => s.slug === slug)
  if (!series) return {}
  return {
    title: series.name,
    description: `A series of ${series.publishedCount} posts on ${series.name}.`,
  }
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const allSeries = getActiveSeries()
  const seriesInfo = allSeries.find(s => s.slug === slug)
  if (!seriesInfo) notFound()

  const seriesName = seriesInfo.name

  const published = getAllPosts()
    .filter(p => p.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))

  const comingSoon = getScheduledPosts()
    .filter(p => p.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))

  return (
    <div className="main">
      <div className="series-page-header">
        <div className="section-label">Series</div>
        <h1 className="series-page-title">{seriesName}</h1>
        <p className="series-page-count">
          {published.length} published · {comingSoon.length > 0 ? `${comingSoon.length} coming soon` : 'more coming'}
        </p>
      </div>

      <div className="series-page-list">
        {published.map((post, i) => {
          const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="series-post-row">
              <div className="series-post-num">Part {post.seriesOrder ?? i + 1}</div>
              <div className="series-post-body">
                <div className="series-post-title">{post.title}</div>
                {post.excerpt && <div className="series-post-excerpt">{post.excerpt}</div>}
                <div className="series-post-date">{date}</div>
              </div>
            </Link>
          )
        })}

        {comingSoon.map((post, i) => (
          <div key={post.slug} className="series-post-row series-post-soon">
            <div className="series-post-num">Part {post.seriesOrder ?? published.length + i + 1}</div>
            <div className="series-post-body">
              <div className="series-post-title">{post.title}</div>
              <div className="series-post-date">Coming soon · publishes {post.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link href="/series" className="back-link">← All series</Link>
      </div>
    </div>
  )
}
