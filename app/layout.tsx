import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SiteShell from '@/components/SiteShell'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    default: 'Theology Check',
    template: '%s | Theology Check',
  },
  description: 'Classical. Reformed. Baptist. — A blog on classical theism, Reformed theology, and biblical languages.',
  metadataBase: new URL('https://theologycheck.blog'),
  openGraph: {
    siteName: 'Theology Check',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 2000, height: 1199, alt: 'Theology Check' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell header={<Header />} footer={<Footer />}>
          {children}
        </SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
