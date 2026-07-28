import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Mystery of Christ — Interactive Outline with Study Questions',
  description:
    'An interactive study outline of The Mystery of Christ by Samuel Renihan — a chapter-by-chapter guide to 1689 Federalism and Reformed Baptist covenant theology, with study questions covering the Covenant of Works, Mosaic Covenant, Davidic Covenant, and New Covenant.',
  openGraph: {
    title: 'The Mystery of Christ — Interactive Outline with Study Questions',
    description:
      'An interactive study outline of The Mystery of Christ by Samuel Renihan — chapter-by-chapter 1689 Federalism and Reformed Baptist covenant theology with study questions.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 2000, height: 1199, alt: 'Theology Check' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  keywords: [
    'The Mystery of Christ',
    'Samuel Renihan',
    'Reformed Baptist covenant theology',
    'interactive outline',
    'study questions',
    '1689 Federalism',
    'covenant of works',
    'new covenant theology',
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
