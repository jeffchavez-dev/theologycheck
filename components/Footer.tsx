export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className="site-footer">
        <div className="footer-logo">
          <div className="footer-theta"><span>✓</span></div>
          <div>
            <p className="footer-name">Theology Check</p>
            <p className="footer-copy">© {year} Jeff Chavez</p>
          </div>
        </div>
        <div className="footer-links">
          <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
            <i className="ti ti-brand-youtube" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
            <i className="ti ti-brand-facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
            <i className="ti ti-brand-twitter" />
          </a>
        </div>
      </footer>
      <div className="arch-bar-inner" />
      <div className="arch-bar" />
    </>
  )
}
