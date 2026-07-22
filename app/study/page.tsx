import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Study',
  description: 'Interactive study outlines of key Reformed Baptist theology books.',
}

const studies = [
  {
    slug: 'mystery-of-christ',
    title: 'The Mystery of Christ',
    subtitle: 'His Covenant, and His Kingdom',
    author: 'Samuel Renihan',
    chapters: 14,
    description: 'A thorough biblical-theological study of the covenant framework — from Adam through the New Covenant — tracing kingdom and covenant through every major redemptive-historical epoch.',
  },
]

export default function StudyIndexPage() {
  return (
    <div className="main">
      <div className="study-index-header">
        <div className="section-label">Study</div>
        <p className="study-index-intro">
          Interactive outlines of key books in Reformed Baptist theology — expand chapters, explore sections, and follow the biblical references.
        </p>
      </div>

      <div className="series-index-grid">
        {studies.map(s => (
          <Link key={s.slug} href={`/study/${s.slug}`} className="series-index-card">
            <div className="series-index-card-label">{s.author} · {s.chapters} chapters</div>
            <h2 className="series-index-card-title">{s.title}</h2>
            <p className="study-index-card-subtitle">{s.subtitle}</p>
            {s.description && (
              <p className="series-index-card-excerpt">{s.description}</p>
            )}
            <span className="series-index-card-cta">Open study →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
