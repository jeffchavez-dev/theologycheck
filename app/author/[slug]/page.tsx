import { getAllAuthorProfiles, getAuthorProfile, nameToSlug } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllAuthorProfiles().map(p => ({ slug: nameToSlug(p.name) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const profile = getAuthorProfile(slug)
  if (!profile) return {}
  return {
    title: `${profile.name} — Theology Check`,
    description: profile.bio,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = getAuthorProfile(slug)
  if (!profile) notFound()

  const posts = getAllPosts().filter(p => p.author === profile.name)

  return (
    <div className="page-container" style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {profile.role}
        </p>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
          {profile.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{profile.bio}</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {profile.academiaUrl && (
            <a href={profile.academiaUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
              Academia.edu →
            </a>
          )}
          {profile.twitterUrl && (
            <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
              Twitter →
            </a>
          )}
        </div>
      </header>

      {posts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Contributions
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {posts.map(post => (
              <li key={post.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text)' }}>
                    {post.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>← Back to all posts</Link>
      </div>
    </div>
  )
}
