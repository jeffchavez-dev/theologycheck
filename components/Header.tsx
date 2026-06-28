import Link from 'next/link'
import Image from 'next/image'
import { getActiveSeries } from '@/lib/seriesUtils'

export default function Header() {
  const series = getActiveSeries()

  return (
    <>
      <div className="arch-bar" />
      <div className="arch-bar-inner" />
      <header className="site-header">
        <Link href="/" aria-label="Theology Check home">
          <Image src="/logo.png" alt="Theology Check logo" width={60} height={60} priority unoptimized style={{ borderRadius: '50%', border: '2px solid #8b1a1a' }} />
        </Link>
        <div className="header-text">
          <Link href="/" className="site-title">Theology Check</Link>
          <p className="site-tagline">Drawing From The Fountain Of The Past</p>
        </div>
        <nav className="nav">
          <Link href="/">Blog</Link>
          <div className="nav-series-wrap">
            <Link href="/series" className="nav-series-link">Series</Link>
            {series.length > 0 && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  {series.map(s => (
                    <Link key={s.slug} href={`/series/${s.slug}`} className="nav-dropdown-item">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about">About</Link>
        </nav>
      </header>
    </>
  )
}
