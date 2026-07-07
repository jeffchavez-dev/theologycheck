'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export default function SiteShell({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const isAdmin = usePathname() === '/admin'
  return (
    <>
      {!isAdmin && header}
      {children}
      {isAdmin ? <AdminFooter /> : footer}
    </>
  )
}

// Minimal admin footer — just the θ link back to site
function AdminFooter() {
  return (
    <div style={{ textAlign: 'center', padding: '4px 0 8px', fontSize: '11px' }}>
      <a href="/" style={{ color: '#bbb', textDecoration: 'none', letterSpacing: '0.05em' }}>
        θ
      </a>
    </div>
  )
}
