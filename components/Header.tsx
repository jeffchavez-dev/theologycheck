import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

const hasLogo = fs.existsSync(path.join(process.cwd(), 'public', 'logo.png'))

export default function Header() {
  return (
    <>
      <div className="arch-bar" />
      <div className="arch-bar-inner" />
      <header className="site-header">
        <Link href="/" className="logo-wrap" aria-label="Theology Check home">
          {hasLogo ? (
            <Image src="/logo.png" alt="Theology Check logo" width={54} height={54} style={{ borderRadius: '50%' }} />
          ) : (
            <div className="logo-theta">
              <span className="logo-check">✓</span>
            </div>
          )}
        </Link>
        <div className="header-text">
          <Link href="/" className="site-title">Theology Check</Link>
          <p className="site-tagline">A Reformed Baptist and Biblical Language Geek Retrieving Classical Theism</p>
        </div>
        <nav className="nav">
          <Link href="/">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
    </>
  )
}
