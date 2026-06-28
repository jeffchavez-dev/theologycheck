import Link from 'next/link'
import { getActiveSeries } from '@/lib/seriesUtils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Series',
  description: 'Theological series — collections of posts exploring a single topic in depth.',
}

export default function SeriesIndexPage() {
  const series = getActiveSeries()

  return (
    <div className="main">
      <div className="series-index-header">
        <div className="section-label">Series</div>
        <p className="series-index-intro">
          In-depth explorations of a single theological topic, published in sequence.
        </p>
      </div>

      {series.length === 0 ? (
        <p style={{ color: '#8a6040', fontStyle: 'italic', textAlign: 'center', paddingTop: '2rem' }}>
          No series yet.
        </p>
      ) : (
        <div className="series-index-grid">
          {series.map(s => (
            <Link key={s.slug} href={`/series/${s.slug}`} className="series-index-card">
              <div className="series-index-card-label">
                {s.publishedCount} {s.publishedCount === 1 ? 'post' : 'posts'}
              </div>
              <h2 className="series-index-card-title">{s.name}</h2>
              {s.firstExcerpt && (
                <p className="series-index-card-excerpt">{s.firstExcerpt}</p>
              )}
              <span className="series-index-card-cta">Read series →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
