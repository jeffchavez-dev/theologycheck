import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A Discourse of the Covenants — Nehemiah Coxe (Interactive Outline)',
  description:
    'An interactive study outline of Nehemiah Coxe\'s A Discourse of the Covenants That God Made with Men Before the Law — a chapter-by-chapter guide to 1689 Federalism covering the Adamic, Noahic, Abrahamic, and Covenant of Circumcision, outlined by Brandon Adams.',
  openGraph: {
    title: 'A Discourse of the Covenants — Nehemiah Coxe (Interactive Outline)',
    description:
      'An interactive study outline of Nehemiah Coxe\'s A Discourse of the Covenants — covering the Adamic, Noahic, Abrahamic, and Covenant of Circumcision from a 1689 Federalism perspective.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 2000, height: 1199, alt: 'Theology Check' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  keywords: [
    'Nehemiah Coxe',
    'Discourse of the Covenants',
    '1689 Federalism',
    'Reformed Baptist covenant theology',
    'Covenant of Circumcision',
    'Abrahamic Covenant',
    'interactive outline',
    'Brandon Adams',
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
