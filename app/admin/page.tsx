'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const TAGS = ['Classical Theism', 'Reformed', 'Baptist', '1689 Federalism', 'Covenant Theology', 'Biblical Languages', 'Devotional', 'Book Review']
const ADMIN_KEY = '1689Federal!sm'

interface PostMeta { slug: string; title: string; date: string; draft?: boolean }

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState('')
  const [draft, setDraft] = useState(false)
  const [author, setAuthor] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [updateCount, setUpdateCount] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [newAuthor, setNewAuthor] = useState('')
  const [addingAuthor, setAddingAuthor] = useState(false)
  const [saved, setSaved] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('tc-auth') === '1') setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) { fetchPosts(); fetchAuthors() }
  }, [auth])

  async function fetchPosts() {
    const res = await fetch('/api/posts')
    if (res.ok) setPosts(await res.json())
  }

  async function fetchAuthors() {
    const res = await fetch('/api/authors')
    if (res.ok) {
      const list = await res.json()
      setAuthors(list)
      if (!author && list.length > 0) setAuthor(list[0])
    }
  }

  async function handleAddAuthor() {
    if (!newAuthor.trim()) return
    setAddingAuthor(true)
    const res = await fetch('/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newAuthor.trim() }),
    })
    if (res.ok) {
      const data = await res.json()
      setAuthors(data.authors)
      setAuthor(newAuthor.trim())
      setNewAuthor('')
    }
    setAddingAuthor(false)
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

  function resetForm() {
    setTitle(''); setExcerpt(''); setBody(''); setSelectedTags([])
    setDate(''); setDraft(false); setEditingSlug(null); setError('')
    setUpdatedAt(''); setUpdateCount(0)
    if (authors.length > 0) setAuthor(authors[0])
  }

  async function loadPost(slug: string) {
    const res = await fetch(`/api/posts?slug=${slug}`)
    if (!res.ok) { setError('Could not load post.'); return }
    const post = await res.json()
    setEditingSlug(slug)
    setTitle(post.title)
    setExcerpt(post.excerpt)
    setBody(post.body)
    setDate(post.date ?? '')
    setDraft(post.draft ?? false)
    setSelectedTags(post.tags ?? [])
    setAuthor(post.author ?? '')
    setUpdatedAt(post.updatedAt ?? '')
    setUpdateCount(post.updateCount ?? 0)
    setError('')
    window.scrollTo(0, 0)
  }

  async function handleSave(asDraft: boolean) {
    if (!title || !body) { setError('Title and body are required.'); return }
    const isEdit = editingSlug !== null
    const res = await fetch('/api/posts', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editingSlug, title, excerpt, body, tags: selectedTags, date, draft: asDraft, author }),
    })
    if (res.ok) {
      const msg = asDraft
        ? 'Post saved as draft. It will not appear on the blog until published.'
        : isEdit ? 'Post updated successfully.' : 'Post published successfully.'
      resetForm()
      setSaved(msg)
      setTimeout(() => setSaved(''), 5000)
      fetchPosts()
    } else {
      const errData = await res.json().catch(() => ({}))
      setError(`Failed to save post: ${errData.error ?? res.status}`)
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' })
    if (editingSlug === slug) resetForm()
    fetchPosts()
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  if (!auth) {
    return (
      <div className="main" style={{ maxWidth: 400, paddingTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: '#8b1a1a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Access</p>
        </div>
        <div className="admin-form">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter admin password" />
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
        <span className="admin-title">
          {editingSlug ? 'Edit Post' : 'Write New Post'}
        </span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {editingSlug && (
            <button className="btn-delete" onClick={resetForm}>Cancel Edit</button>
          )}
          <Link href="/" className="back-link">← View Site</Link>
        </div>
      </div>

      <div className="admin-form">
        {saved && <div className="success-msg">{saved}</div>}
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
          <label className="form-label">Publish Date</label>
          <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        {editingSlug && (
          <div style={{ display: 'flex', gap: '2rem', fontSize: 13, color: '#8a6040', fontFamily: 'EB Garamond, serif', fontStyle: 'italic', paddingLeft: 2 }}>
            {updatedAt && <span>Last updated: <strong style={{ fontStyle: 'normal' }}>{updatedAt}</strong></span>}
            <span>Updates since publish: <strong style={{ fontStyle: 'normal' }}>{updateCount}</strong></span>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Author</label>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select className="form-input" style={{ flex: 1 }} value={author} onChange={e => setAuthor(e.target.value)}>
              {authors.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              className="form-input"
              style={{ flex: 1 }}
              value={newAuthor}
              onChange={e => setNewAuthor(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddAuthor()}
              placeholder="Add new author..."
            />
            <button
              className="btn-publish"
              style={{ padding: '0.6rem 1rem', whiteSpace: 'nowrap' }}
              onClick={handleAddAuthor}
              disabled={addingAuthor}
            >
              {addingAuthor ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tag-checkboxes">
            {TAGS.map(tag => (
              <span key={tag} className={`tag-option${selectedTags.includes(tag) ? ' selected' : ''}`} onClick={() => toggleTag(tag)}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Body (Markdown)</label>
          <textarea className="form-input form-textarea" value={body} onChange={e => setBody(e.target.value)} placeholder={`Write your post in Markdown...\n\n## Heading\n\nParagraph text here.\n\n> A blockquote`} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-publish" onClick={() => handleSave(false)}>
            {editingSlug ? 'Update Post' : 'Publish Post'}
          </button>
          <button className="btn-publish" style={{ background: '#8a6040' }} onClick={() => handleSave(true)}>
            Save as Draft
          </button>
        </div>
      </div>

      {posts.filter(p => !p.draft).length > 0 && (
        <div className="admin-posts">
          <div className="section-label" style={{ marginBottom: '0' }}>Published Posts</div>
          {posts.filter(p => !p.draft).map(post => (
            <div key={post.slug} className="admin-post-row">
              <div>
                <div className="admin-post-title">{post.title}</div>
                <div className="admin-post-date">{post.date}</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-delete" style={{ color: '#8b5a2a' }} onClick={() => loadPost(post.slug)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(post.slug)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {posts.filter(p => p.draft).length > 0 && (
        <div className="admin-posts">
          <div className="section-label" style={{ marginBottom: '0' }}>Drafts</div>
          {posts.filter(p => p.draft).map(post => (
            <div key={post.slug} className="admin-post-row">
              <div>
                <div className="admin-post-title" style={{ color: '#8a6040' }}>{post.title}</div>
                <div className="admin-post-date">{post.date} — Draft</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-delete" style={{ color: '#8b5a2a' }} onClick={() => loadPost(post.slug)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(post.slug)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
