'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const TAGS = ['Classical Theism', 'Reformed', 'Baptist', '1689 Federalism', 'Covenant Theology', 'Biblical Languages', 'Devotional', 'Book Review']
const ADMIN_KEY = '1689Federal!sm'

interface PostMeta { slug: string; title: string; date: string }

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('tc-auth') === '1') setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) fetchPosts()
  }, [auth])

  async function fetchPosts() {
    const res = await fetch('/api/posts')
    if (res.ok) setPosts(await res.json())
  }

  function login() {
    if (password === ADMIN_KEY) {
      sessionStorage.setItem('tc-auth', '1')
      setAuth(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  async function handlePublish() {
    if (!title || !body) { setError('Title and body are required.'); return }
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, body, tags: selectedTags }),
    })
    if (res.ok) {
      setTitle(''); setExcerpt(''); setBody(''); setSelectedTags([]); setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      fetchPosts()
    } else {
      setError('Failed to save post.')
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' })
    fetchPosts()
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  if (!auth) {
    return (
      <div className="main" style={{ maxWidth: 400, paddingTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="logo-theta" style={{ margin: '0 auto 1rem', width: 54, height: 54 }}>
            <span className="logo-check">✓</span>
          </div>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: '#8b1a1a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Access</p>
        </div>
        <div className="admin-form">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Enter admin password"
            />
          </div>
          {error && <p style={{ color: '#8b1a1a', fontSize: 14 }}>{error}</p>}
          <button className="btn-publish" onClick={login}>Enter</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <span className="admin-title">Write New Post</span>
        <Link href="/" className="back-link">← View Site</Link>
      </div>

      <div className="admin-form">
        {saved && <div className="success-msg">Post published successfully.</div>}
        {error && <p style={{ color: '#8b1a1a', fontSize: 14 }}>{error}</p>}

        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" />
        </div>

        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <input className="form-input" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary shown on homepage" />
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tag-checkboxes">
            {TAGS.map(tag => (
              <span
                key={tag}
                className={`tag-option${selectedTags.includes(tag) ? ' selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >{tag}</span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Body (Markdown)</label>
          <textarea
            className={`form-input form-textarea`}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={`Write your post in Markdown...\n\n## Heading\n\nParagraph text here.\n\n> A blockquote`}
          />
        </div>

        <button className="btn-publish" onClick={handlePublish}>Publish Post</button>
      </div>

      {posts.length > 0 && (
        <div className="admin-posts">
          <div className="section-label" style={{ marginBottom: '0' }}>Published Posts</div>
          {posts.map(post => (
            <div key={post.slug} className="admin-post-row">
              <div>
                <div className="admin-post-title">{post.title}</div>
                <div className="admin-post-date">{post.date}</div>
              </div>
              <button className="btn-delete" onClick={() => handleDelete(post.slug)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
