'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function EditButton({ slug }: { slug: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(sessionStorage.getItem('tc-auth') === '1')
  }, [])

  if (!visible) return null

  return (
    <Link
      href={`/admin?edit=${slug}`}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        background: '#8b1a1a',
        color: '#f0d99a',
        fontFamily: 'Cinzel, serif',
        fontSize: 11,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '0.6rem 1.2rem',
        borderRadius: 2,
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(42,26,14,0.25)',
        zIndex: 200,
      }}
    >
      ✎ Edit Post
    </Link>
  )
}
