import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Mystery of Christ — Interactive Outline with Study Questions',
  description:
    'The Mystery of Christ Interactive Outline with Study Questions — a chapter-by-chapter study of Samuel Renihan\'s covenant theology covering the Covenant of Works, Mosaic Covenant, Davidic Covenant, and New Covenant.',
  openGraph: {
    title: 'The Mystery of Christ — Interactive Outline with Study Questions',
    description:
      'Explore Samuel Renihan\'s The Mystery of Christ chapter by chapter with an interactive outline and study questions covering Reformed Baptist covenant theology.',
    type: 'article',
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
