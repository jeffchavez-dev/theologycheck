import Image from 'next/image'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
      <div className="subscribe-section">
        <SubscribeForm />
      </div>
      <footer className="site-footer">
        <div className="footer-logo">
          <Image src="/logo.png" alt="Theology Check logo" width={36} height={36} unoptimized style={{ borderRadius: '50%', border: '1.5px solid #3a1010' }} />
          <div>
            <p className="footer-name">Theology Check</p>
            <p className="footer-copy">{year} Jeff Chavez</p>
            <p className="footer-tagline">
              All original content is freely given and dedicated to the{' '}
              <a href="https://copy.church/free/" target="_blank" rel="noopener noreferrer">
                public domain
              </a>
              .
            </p>
          </div>
        </div>
        <div className="footer-recommended">
          <p className="footer-recommended-title">Recommended</p>
          <ul>
            <li>
              <a href="https://credomag.com/" target="_blank" rel="noopener noreferrer">Credo Magazine</a>
              {' '}— A theology magazine dedicated to exploring Baptist and Reformed convictions.
            </li>
            <li>
              <a href="https://www.reformedclassicalist.com/" target="_blank" rel="noopener noreferrer">The Reformed Classicist</a>
              {' '}— A blog retrieving the classical theological tradition for the Reformed church.
            </li>
            <li>
              <a href="https://watersidejournal.com/" target="_blank" rel="noopener noreferrer">Waterside Journal</a>
              {' '}— A journal of theology, culture, and the Christian life.
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <a href="https://www.youtube.com/@theologycheck" target="_blank" rel="noopener" aria-label="YouTube">
            <i className="ti ti-brand-youtube" />
          </a>
          <a href="https://www.facebook.com/theologycheck.blog" target="_blank" rel="noopener" aria-label="Facebook">
            <i className="ti ti-brand-facebook" />
          </a>
        </div>
      </footer>
      <div className="arch-bar-inner" />
      <div className="arch-bar" />
      <div style={{ textAlign: 'center', padding: '4px 0 8px', fontSize: '11px' }}>
        <Link href="/admin" style={{ color: '#bbb', textDecoration: 'none', letterSpacing: '0.05em' }}>
          θ
        </Link>
      </div>
    </>
  )
}
