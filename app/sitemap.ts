import { getAllPosts } from '@/lib/posts'
import { getActiveSeries } from '@/lib/seriesUtils'

const BASE_URL = 'https://theologycheck.blog'

export default function sitemap() {
  const posts = getAllPosts().map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const seriesPages = getActiveSeries().map(s => ({
    url: `${BASE_URL}/series/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/study`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/study/mystery-of-christ`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...seriesPages,
    ...posts,
  ]
}
