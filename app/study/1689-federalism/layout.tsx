import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1689 Reformed Baptist Federalism — Interactive Reference Outline',
  description:
    'An interactive study outline on 1689 Reformed Baptist Federalism — a topical reference of quotes from Nehemiah Coxe, Samuel Renihan, Pascal Denault, John Owen, and other Reformed Baptist theologians on covenant theology, 1689 Federalism, and the distinction between the Old and New Covenants.',
  openGraph: {
    title: '1689 Reformed Baptist Federalism — Interactive Reference Outline',
    description:
      'An interactive study outline on 1689 Reformed Baptist Federalism — a topical reference of quotes from Coxe, Renihan, Denault, Owen, and others on covenant theology and the distinction between the Old and New Covenants.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 2000, height: 1199, alt: 'Theology Check' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  keywords: [
    '1689 Federalism',
    'Reformed Baptist covenant theology',
    'Nehemiah Coxe',
    'Samuel Renihan',
    'Pascal Denault',
    'interactive outline',
    'covenant of works',
    'new covenant',
    'Abrahamic covenant',
    'Mosaic covenant',
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
