import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <>
      <div className="arch-bar" />
      <div className="arch-bar-inner" />
      <header className="site-header">
        <Link href="/" aria-label="Theology Check home">
          <Image src="/logo.png" alt="Theology Check logo" width={60} height={60} priority style={{ borderRadius: '50%', border: '2px solid #8b1a1a' }} />
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
