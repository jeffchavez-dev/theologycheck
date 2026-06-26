'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_KEY = '1689Federal!sm'

interface PostMeta { slug: string; title: string; date: string; draft?: boolean }

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')

  // Post form
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState('')
  const [draft, setDraft] = useState(false)
  const [dropCapParagraph, setDropCapParagraph] = useState(0)
  const [author, setAuthor] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [updateCount, setUpdateCount] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [series, setSeries] = useState('')
  const [seriesOrder, setSeriesOrder] = useState(0)

  // Data lists
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])

  // Add new
  const [newAuthor, setNewAuthor] = useState('')
  const [addingAuthor, setAddingAuthor] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [addingTag, setAddingTag] = useState(false)

  // Inline edit state
  const [editingAuthor, setEditingAuthor] = useState<string | null>(null)
  const [editingAuthorVal, setEditingAuthorVal] = useState('')
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editingTagVal, setEditingTagVal] = useState('')

  // UI feedback
  const [saved, setSaved] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('tc-auth') === '1') setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) { fetchPosts(); fetchAuthors(); fetchTags() }
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

  async function fetchTags() {
    const res = await fetch('/api/tags')
    if (res.ok) setAvailableTags(await res.json())
  }

  // --- Auth ---
  function login() {
    if (password === ADMIN_KEY) {
      sessionStorage.setItem('tc-auth', '1')
      setAuth(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  // --- Post form ---
  function resetForm() {
    setTitle(''); setExcerpt(''); setBody(''); setSelectedTags([])
    setDate(''); setDraft(false); setDropCapParagraph(0); setEditingSlug(null); setError('')
    setUpdatedAt(''); setUpdateCount(0); setSeries(''); setSeriesOrder(0)
    if (authors.length > 0) setAuthor(authors[0])
  }

  async function loadPost(slug: string) {
    const res = await fetch(`/api/posts?slug=${slug}`)
    if (!res.ok) { setError('Could not load post.'); return }
    const post = await res.json()
    setEditingSlug(slug)
    setTitle(post.title); setExcerpt(post.excerpt); setBody(post.body)
    setDate(post.date ?? ''); setDraft(post.draft ?? false); setDropCapParagraph(post.dropCapParagraph ?? 0)
    setSelectedTags(post.tags ?? []); setAuthor(post.author ?? '')
    setUpdatedAt(post.updatedAt ?? ''); setUpdateCount(post.updateCount ?? 0)
    setSeries(post.series ?? ''); setSeriesOrder(post.seriesOrder ?? 0)
    setError('')
    window.scrollTo(0, 0)
  }

  async function handleSave(asDraft: boolean) {
    if (!title || !body) { setError('Title and body are required.'); return }
    const isEdit = editingSlug !== null
    const res = await fetch('/api/posts', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editingSlug, title, excerpt, body, tags: selectedTags, date, draft: asDraft, author, dropCapParagraph, series, seriesOrder }),
    })
    if (res.ok) {
      const msg = asDraft
        ? 'Post saved as draft. It will not appear on the blog until published.'
        : isEdit ? 'Post updated successfully.' : 'Post published successfully.'
      resetForm(); setSaved(msg); setTimeout(() => setSaved(''), 5000); fetchPosts()
    } else {
      const errData = await res.json().catch(() => ({}))
      setError(`Failed to save post: ${errData.error ?? res.status}`)
    }
  }

  async function handleDeletePost(slug: string) {
    if (!confirm(`Delete this post? This cannot be undone.`)) return
    await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' })
    if (editingSlug === slug) resetForm()
    fetchPosts()
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  // --- Tag management ---
  async function handleAddTag() {
    const tag = newTag.trim()
    if (!tag || availableTags.includes(tag)) return
    setAddingTag(true)
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tag }),
    })
    if (res.ok) {
      const data = await res.json()
      setAvailableTags(data.tags)
      setSelectedTags(prev => [...prev, tag])
      setNewTag('')
    }
    setAddingTag(false)
  }

  async function handleRenameTag(oldName: string, newName: string) {
    if (!newName.trim() || newName.trim() === oldName) { setEditingTag(null); return }
    const res = await fetch('/api/tags', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ old: oldName, name: newName.trim() }),
    })
    if (res.ok) {
      const data = await res.json()
      setAvailableTags(data.tags)
      setSelectedTags(prev => prev.map(t => t === oldName ? newName.trim() : t))
    }
    setEditingTag(null)
  }

  async function handleDeleteTag(name: string) {
    if (!confirm(`Delete the tag "${name}"? It will be removed from the tag list (existing posts keep it until re-saved).`)) return
    const res = await fetch(`/api/tags?name=${encodeURIComponent(name)}`, { method: 'DELETE' })
    if (res.ok) {
      const data = await res.json()
      setAvailableTags(data.tags)
      setSelectedTags(prev => prev.filter(t => t !== name))
    }
  }

  // --- Author management ---
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

  async function handleRenameAuthor(oldName: string, newName: string) {
    if (!newName.trim() || newName.trim() === oldName) { setEditingAuthor(null); return }
    const res = await fetch('/api/authors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ old: oldName, name: newName.trim() }),
    })
    if (res.ok) {
      const data = await res.json()
      setAuthors(data.authors)
      if (author === oldName) setAuthor(newName.trim())
    }
    setEditingAuthor(null)
  }

  async function handleDeleteAuthor(name: string) {
    if (!confirm(`Delete the author "${name}"? They will be removed from the author list (existing posts are not changed).`)) return
    const res = await fetch(`/api/authors?name=${encodeURIComponent(name)}`, { method: 'DELETE' })
    if (res.ok) {
      const data = await res.json()
      setAuthors(data.authors)
      if (author === name && data.authors.length > 0) setAuthor(data.authors[0])
    }
  }

  // --- Login screen ---
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

  const manageRowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.5rem 0', borderBottom: '1px solid #ecdec8',
  }
  const manageInputStyle: React.CSSProperties = {
    flex: 1, padding: '4px 8px', fontSize: 13,
    border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2',
    fontFamily: 'EB Garamond, serif',
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <span className="admin-title">{editingSlug ? 'Edit Post' : 'Write New Post'}</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {editingSlug && <button className="btn-delete" onClick={resetForm}>Cancel Edit</button>}
          <Link href="/" className="back-link">← View Site</Link>
        </div>
      </div>

      {/* ── Post form ── */}
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
          <select className="form-input" value={author} onChange={e => setAuthor(e.target.value)}>
            {authors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tag-checkboxes">
            {availableTags.map(tag => (
              <span key={tag} className={`tag-option${selectedTags.includes(tag) ? ' selected' : ''}`} onClick={() => toggleTag(tag)}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <input
              className="form-input"
              style={{ flex: 1, padding: '6px 10px', fontSize: '13px' }}
              placeholder="Add new tag..."
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={handleAddTag} disabled={addingTag || !newTag.trim()}>
              {addingTag ? 'Adding...' : 'Add Tag'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Drop Cap <span style={{ fontFamily: 'Cinzel, serif', color: '#8b1a1a' }}>𝔄</span></label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#2a1a0e' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={dropCapParagraph > 0} onChange={e => setDropCapParagraph(e.target.checked ? 1 : 0)} style={{ accentColor: '#8b1a1a', width: 15, height: 15 }} />
              Enable
            </label>
            {dropCapParagraph > 0 && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                On paragraph
                <input
                  type="number" min={1} max={20} value={dropCapParagraph}
                  onChange={e => setDropCapParagraph(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: 60, padding: '3px 8px', border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2', fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#1a0a04' }}
                />
              </label>
            )}
          </div>
          {dropCapParagraph > 0 && <p style={{ fontSize: 13, color: '#8a6040', fontStyle: 'italic', marginTop: 4, fontFamily: 'EB Garamond, serif' }}>Paragraph 1 is the first paragraph of the post body.</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Series</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#2a1a0e' }}>
              <input type="checkbox" checked={!!series} onChange={e => { setSeries(e.target.checked ? 'New Series' : ''); setSeriesOrder(e.target.checked ? 1 : 0) }} style={{ accentColor: '#8b1a1a', width: 15, height: 15 }} />
              Part of a series
            </label>
          </div>
          {series && (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                className="form-input"
                value={series}
                onChange={e => setSeries(e.target.value)}
                placeholder="Series name (e.g. Divine Simplicity)"
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#2a1a0e' }}>
                Part number
                <input
                  type="number" min={1} max={99} value={seriesOrder}
                  onChange={e => setSeriesOrder(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: 70, padding: '3px 8px', border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2', fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#1a0a04' }}
                />
              </label>
              <p style={{ fontSize: 13, color: '#8a6040', fontStyle: 'italic', fontFamily: 'EB Garamond, serif' }}>Posts in the same series will show prev/next navigation at the bottom.</p>
            </div>
          )}
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

      {/* ── Published posts ── */}
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
                <button className="btn-delete" onClick={() => handleDeletePost(post.slug)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Drafts ── */}
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
                <button className="btn-delete" onClick={() => handleDeletePost(post.slug)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Manage Tags ── */}
      <div className="admin-posts">
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>Manage Tags</div>
        {availableTags.map(tag => (
          <div key={tag} style={manageRowStyle}>
            {editingTag === tag ? (
              <>
                <input
                  style={manageInputStyle}
                  value={editingTagVal}
                  onChange={e => setEditingTagVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleRenameTag(tag, editingTagVal)
                    if (e.key === 'Escape') setEditingTag(null)
                  }}
                  autoFocus
                />
                <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => handleRenameTag(tag, editingTagVal)}>Save</button>
                <button className="btn-delete" onClick={() => setEditingTag(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, fontSize: 14, fontFamily: 'EB Garamond, serif' }}>{tag}</span>
                <button className="btn-delete" style={{ color: '#8b5a2a' }} onClick={() => { setEditingTag(tag); setEditingTagVal(tag) }}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteTag(tag)}>Delete</button>
              </>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <input
            style={{ ...manageInputStyle, flex: 1 }}
            placeholder="New tag name..."
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          />
          <button className="btn-secondary" style={{ padding: '4px 14px', fontSize: 11 }} onClick={handleAddTag} disabled={addingTag || !newTag.trim()}>
            {addingTag ? 'Adding...' : '+ Add'}
          </button>
        </div>
      </div>

      {/* ── Manage Authors ── */}
      <div className="admin-posts">
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>Manage Authors</div>
        {authors.map(a => (
          <div key={a} style={manageRowStyle}>
            {editingAuthor === a ? (
              <>
                <input
                  style={manageInputStyle}
                  value={editingAuthorVal}
                  onChange={e => setEditingAuthorVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleRenameAuthor(a, editingAuthorVal)
                    if (e.key === 'Escape') setEditingAuthor(null)
                  }}
                  autoFocus
                />
                <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => handleRenameAuthor(a, editingAuthorVal)}>Save</button>
                <button className="btn-delete" onClick={() => setEditingAuthor(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, fontSize: 14, fontFamily: 'EB Garamond, serif' }}>{a}</span>
                <button className="btn-delete" style={{ color: '#8b5a2a' }} onClick={() => { setEditingAuthor(a); setEditingAuthorVal(a) }}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteAuthor(a)}>Delete</button>
              </>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <input
            style={{ ...manageInputStyle, flex: 1 }}
            placeholder="New author name..."
            value={newAuthor}
            onChange={e => setNewAuthor(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddAuthor()}
          />
          <button className="btn-secondary" style={{ padding: '4px 14px', fontSize: 11 }} onClick={handleAddAuthor} disabled={addingAuthor || !newAuthor.trim()}>
            {addingAuthor ? 'Adding...' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
