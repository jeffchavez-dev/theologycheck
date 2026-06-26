import Link from 'next/link'

interface SeriesPost {
  slug: string
  title: string
}

interface Props {
  seriesName: string
  part: number
  total: number
  prev: SeriesPost | null
  next: SeriesPost | null
}

export default function SeriesNav({ seriesName, part, total, prev, next }: Props) {
  return (
    <div className="series-nav">
      <div className="series-nav-label">
        <span className="series-nav-name">{seriesName}</span>
        <span className="series-nav-part">Part {part} of {total}</span>
      </div>
      <div className="series-nav-links">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="series-nav-prev">
            <span className="series-nav-arrow">←</span>
            <span>
              <span className="series-nav-dir">Previous</span>
              <span className="series-nav-title">{prev.title}</span>
            </span>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/blog/${next.slug}`} className="series-nav-next">
            <span>
              <span className="series-nav-dir">Next</span>
              <span className="series-nav-title">{next.title}</span>
            </span>
            <span className="series-nav-arrow">→</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
