'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_KEY = '1689Federal!sm'

interface PostMeta { slug: string; title: string; date: string; draft?: boolean; scheduled?: boolean; series?: string; seriesOrder?: number }

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
  const [scheduled, setScheduled] = useState(false)
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

  // Accordion open state
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['published']))
  function toggleSection(name: string) {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(name)) { next.delete(name) } else { next.add(name) }
      return next
    })
  }

  useEffect(() => {
    if (sessionStorage.getItem('tc-auth') === '1') setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) {
      fetchPosts(); fetchAuthors(); fetchTags()
      const editSlug = new URLSearchParams(window.location.search).get('edit')
      if (editSlug) loadPost(editSlug)
    }
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

  function login() {
    if (password === ADMIN_KEY) {
      sessionStorage.setItem('tc-auth', '1')
      setAuth(true); setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  function resetForm() {
    setTitle(''); setExcerpt(''); setBody(''); setSelectedTags([])
    setDate(''); setDraft(false); setScheduled(false); setDropCapParagraph(0); setEditingSlug(null); setError('')
    setUpdatedAt(''); setUpdateCount(0); setSeries(''); setSeriesOrder(0)
    if (authors.length > 0) setAuthor(authors[0])
  }

  async function loadPost(slug: string) {
    const res = await fetch(`/api/posts?slug=${slug}`)
    if (!res.ok) { setError('Could not load post.'); return }
    const post = await res.json()
    setEditingSlug(slug)
    setTitle(post.title); setExcerpt(post.excerpt); setBody(post.body)
    setDate(post.date ?? ''); setDraft(post.draft ?? false); setScheduled(post.scheduled ?? false)
    setDropCapParagraph(post.dropCapParagraph ?? 0)
    setSelectedTags(post.tags ?? []); setAuthor(post.author ?? '')
    setUpdatedAt(post.updatedAt ?? ''); setUpdateCount(post.updateCount ?? 0)
    setSeries(post.series ?? ''); setSeriesOrder(post.seriesOrder ?? 0)
    setError('')
    window.scrollTo(0, 0)
  }

  async function handleSave(asDraft: boolean, asScheduled = false) {
    if (!title || !body) { setError('Title and body are required.'); return }
    if (asScheduled && !date) { setError('A publish date is required for scheduled posts.'); return }
    const isEdit = editingSlug !== null
    const res = await fetch('/api/posts', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editingSlug, title, excerpt, body, tags: selectedTags, date, draft: asDraft, scheduled: asScheduled, author, dropCapParagraph, series, seriesOrder }),
    })
    if (res.ok) {
      const data = await res.json()
      if (!isEdit && data.slug) setEditingSlug(data.slug)
      setDraft(asDraft); setScheduled(asScheduled)
      const msg = asScheduled
        ? `Post scheduled — publishes ${date}.`
        : asDraft ? 'Saved as draft.' : isEdit ? 'Post updated.' : 'Post published.'
      setSaved(msg); setTimeout(() => setSaved(''), 5000); fetchPosts()
    } else {
      const errData = await res.json().catch(() => ({}))
      setError(`Failed: ${errData.error ?? res.status}`)
    }
  }

  async function handleDeletePost(slug: string) {
    if (!confirm(`Delete this post? This cannot be undone.`)) return
    await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' })
    if (editingSlug === slug) resetForm()
    fetchPosts()
  }

  function applyMarkdown(action: string) {
    const ta = document.getElementById('post-body') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const val = body
    const sel = val.slice(start, end)
    const lineStart = val.lastIndexOf('\n', start - 1) + 1

    const wrapInline = (marker: string, placeholder: string) => {
      const text = sel || placeholder
      const result = `${marker}${text}${marker}`
      const newBody = val.slice(0, start) + result + val.slice(end)
      setBody(newBody)
      setTimeout(() => { ta.focus(); ta.setSelectionRange(start + marker.length, start + marker.length + text.length) }, 0)
    }

    const prefixLine = (prefix: string) => {
      const lineEnd = val.indexOf('\n', start) === -1 ? val.length : val.indexOf('\n', start)
      const line = val.slice(lineStart, lineEnd)
      const stripped = line.replace(/^(#{1,3} |> |- |\d+\. )/, '')
      const newLine = prefix + stripped
      const newBody = val.slice(0, lineStart) + newLine + val.slice(lineEnd)
      setBody(newBody)
      const cur = lineStart + prefix.length + stripped.length
      setTimeout(() => { ta.focus(); ta.setSelectionRange(cur, cur) }, 0)
    }

    const wrapBlock = (before: string, after: string, placeholder: string) => {
      const text = sel || placeholder
      const result = `\n${before}${text}${after}\n`
      const newBody = val.slice(0, start) + result + val.slice(end)
      setBody(newBody)
      const s = start + 1 + before.length
      setTimeout(() => { ta.focus(); ta.setSelectionRange(s, s + text.length) }, 0)
    }

    switch (action) {
      case 'h1': prefixLine('# '); break
      case 'h2': prefixLine('## '); break
      case 'h3': prefixLine('### '); break
      case 'p': prefixLine(''); break
      case 'bold': wrapInline('**', 'bold text'); break
      case 'italic': wrapInline('*', 'italic text'); break
      case 'underline': {
        const text = sel || 'underlined text'
        const result = `<u>${text}</u>`
        const newBody = val.slice(0, start) + result + val.slice(end)
        setBody(newBody)
        setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 3, start + 3 + text.length) }, 0)
        break
      }
      case 'quote': prefixLine('> '); break
      case 'bullet': prefixLine('- '); break
      case 'ordered': prefixLine('1. '); break
      case 'link': {
        const text = sel || 'link text'
        const result = `[${text}](url)`
        const newBody = val.slice(0, start) + result + val.slice(end)
        setBody(newBody)
        const urlStart = start + text.length + 3
        setTimeout(() => { ta.focus(); ta.setSelectionRange(urlStart, urlStart + 3) }, 0)
        break
      }
      case 'footnote': {
        const existing = [...val.matchAll(/\[\^(\d+)\]/g)].map(m => parseInt(m[1]))
        const n = existing.length > 0 ? Math.max(...existing) + 1 : 1
        const marker = `[^${n}]`
        const definition = `\n[^${n}]: `
        const newBody = val.slice(0, start) + marker + val.slice(end) + definition
        setBody(newBody)
        const defPos = newBody.length
        setTimeout(() => { ta.focus(); ta.setSelectionRange(defPos, defPos) }, 0)
        break
      }
      case 'hr': {
        const result = `\n\n---\n\n`
        const newBody = val.slice(0, start) + result + val.slice(end)
        setBody(newBody)
        const cur = start + result.length
        setTimeout(() => { ta.focus(); ta.setSelectionRange(cur, cur) }, 0)
        break
      }
    }
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  async function handleAddTag() {
    const tag = newTag.trim()
    if (!tag || availableTags.includes(tag)) return
    setAddingTag(true)
    const res = await fetch('/api/tags', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tag }),
    })
    if (res.ok) {
      const data = await res.json()
      setAvailableTags(data.tags); setSelectedTags(prev => [...prev, tag]); setNewTag('')
    }
    setAddingTag(false)
  }

  async function handleRenameTag(oldName: string, newName: string) {
    if (!newName.trim() || newName.trim() === oldName) { setEditingTag(null); return }
    const res = await fetch('/api/tags', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
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
    if (!confirm(`Delete the tag "${name}"?`)) return
    const res = await fetch(`/api/tags?name=${encodeURIComponent(name)}`, { method: 'DELETE' })
    if (res.ok) {
      const data = await res.json()
      setAvailableTags(data.tags); setSelectedTags(prev => prev.filter(t => t !== name))
    }
  }

  async function handleAddAuthor() {
    if (!newAuthor.trim()) return
    setAddingAuthor(true)
    const res = await fetch('/api/authors', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newAuthor.trim() }),
    })
    if (res.ok) {
      const data = await res.json()
      setAuthors(data.authors); setAuthor(newAuthor.trim()); setNewAuthor('')
    }
    setAddingAuthor(false)
  }

  async function handleRenameAuthor(oldName: string, newName: string) {
    if (!newName.trim() || newName.trim() === oldName) { setEditingAuthor(null); return }
    const res = await fetch('/api/authors', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
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
    if (!confirm(`Delete author "${name}"?`)) return
    const res = await fetch(`/api/authors?name=${encodeURIComponent(name)}`, { method: 'DELETE' })
    if (res.ok) {
      const data = await res.json()
      setAuthors(data.authors)
      if (author === name && data.authors.length > 0) setAuthor(data.authors[0])
    }
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

  const manageInputStyle: React.CSSProperties = {
    flex: 1, padding: '4px 8px', fontSize: 13,
    border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2',
    fontFamily: 'EB Garamond, serif',
  }

  const published = posts.filter(p => !p.draft && !p.scheduled)
  const scheduledPosts = posts.filter(p => p.scheduled)
  const drafts = posts.filter(p => p.draft)

  // Series manager
  const publishedBySeries = new Map<string, PostMeta[]>()
  const scheduledBySeries = new Map<string, PostMeta[]>()
  posts.filter(p => p.series && !p.draft && !p.scheduled).forEach(p => {
    const arr = publishedBySeries.get(p.series!) ?? []; arr.push(p); publishedBySeries.set(p.series!, arr)
  })
  posts.filter(p => p.series && p.scheduled).forEach(p => {
    const arr = scheduledBySeries.get(p.series!) ?? []; arr.push(p); scheduledBySeries.set(p.series!, arr)
  })
  const activeSeries = [...publishedBySeries.keys()]

  const existingSeries = [...new Set(posts.map(p => p.series).filter(Boolean))] as string[]

  function Accordion({ id, label, count, children }: { id: string; label: string; count?: number; children: React.ReactNode }) {
    const open = openSections.has(id)
    return (
      <div className="admin-accordion">
        <button className="admin-accordion-header" onClick={() => toggleSection(id)}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {label}
            {count !== undefined && count > 0 && (
              <span className="admin-accordion-badge">{count}</span>
            )}
          </span>
          <span className="admin-accordion-chevron">{open ? '▴' : '▾'}</span>
        </button>
        {open && <div className="admin-accordion-body">{children}</div>}
      </div>
    )
  }

  return (
    <div className="admin-layout-wrap">
      {/* ── Header bar ── */}
      <div className="admin-topbar">
        <span className="admin-title">{editingSlug ? `Editing: ${title || '…'}` : 'New Post'}</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {editingSlug && <button className="btn-delete" onClick={resetForm}>✕ Cancel</button>}
          <Link href="/" className="back-link">← View Site</Link>
        </div>
      </div>

      <div className="admin-layout">
        {/* ── LEFT: Writing form ── */}
        <div className="admin-form-panel">
          {saved && <div className="success-msg" style={{ marginBottom: '1rem' }}>{saved}</div>}
          {error && <p style={{ color: '#8b1a1a', fontSize: 14, marginBottom: '1rem' }}>{error}</p>}

          <div className="admin-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" />
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt</label>
              <input className="form-input" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary shown on homepage" />
            </div>

            <div className="form-group">
              <label className="form-label">Body (Markdown)</label>
              <div className="md-toolbar-wrap">
                <div className="md-toolbar">
                  <span className="md-toolbar-group">
                    <button type="button" className="md-btn" title="Heading 1" onClick={() => applyMarkdown('h1')}>H1</button>
                    <button type="button" className="md-btn" title="Heading 2" onClick={() => applyMarkdown('h2')}>H2</button>
                    <button type="button" className="md-btn" title="Heading 3" onClick={() => applyMarkdown('h3')}>H3</button>
                    <button type="button" className="md-btn" title="Paragraph" onClick={() => applyMarkdown('p')}>¶</button>
                  </span>
                  <span className="md-toolbar-sep" />
                  <span className="md-toolbar-group">
                    <button type="button" className="md-btn md-btn-wide" title="Bold" onClick={() => applyMarkdown('bold')}><strong>B</strong></button>
                    <button type="button" className="md-btn md-btn-wide" title="Italic" onClick={() => applyMarkdown('italic')}><em>I</em></button>
                    <button type="button" className="md-btn md-btn-wide" title="Underline" onClick={() => applyMarkdown('underline')}><u>U</u></button>
                  </span>
                  <span className="md-toolbar-sep" />
                  <span className="md-toolbar-group">
                    <button type="button" className="md-btn" title="Blockquote" onClick={() => applyMarkdown('quote')}>"</button>
                    <button type="button" className="md-btn" title="Bullet list" onClick={() => applyMarkdown('bullet')}>•</button>
                    <button type="button" className="md-btn" title="Numbered list" onClick={() => applyMarkdown('ordered')}>1.</button>
                    <button type="button" className="md-btn" title="Horizontal rule" onClick={() => applyMarkdown('hr')}>—</button>
                  </span>
                  <span className="md-toolbar-sep" />
                  <span className="md-toolbar-group">
                    <button type="button" className="md-btn" title="Link" onClick={() => applyMarkdown('link')}>🔗</button>
                    <button type="button" className="md-btn" title="Footnote" onClick={() => applyMarkdown('footnote')}>[^]</button>
                  </span>
                </div>
                <textarea id="post-body" className="form-input form-textarea" value={body} onChange={e => setBody(e.target.value)} placeholder={`Write your post in Markdown…\n\n## Heading\n\nParagraph text here.\n\n> A blockquote`} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'sticky', bottom: 0, background: '#f5efe3', padding: '1rem 0', borderTop: '1px solid #e8d8b0' }}>
              <button className="btn-publish" onClick={() => handleSave(false)}>
                {editingSlug ? 'Update Post' : 'Publish Post'}
              </button>
              <button className="btn-publish" style={{ background: '#8a6040' }} onClick={() => handleSave(true)}>
                Draft
              </button>
              <button className="btn-publish" style={{ background: '#3a5a7a' }} onClick={() => handleSave(false, true)}>
                {scheduled ? 'Reschedule' : 'Schedule'}
              </button>
              {editingSlug && (
                <a href={`/preview/${editingSlug}`} target="_blank" rel="noopener noreferrer" className="btn-publish" style={{ background: '#3a5a3a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  Preview ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Control panel ── */}
        <div className="admin-control-panel">

          {/* ── Post metadata ── */}
          <div className="admin-meta-panel">
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Date</label>
                <input className="form-input admin-meta-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Author</label>
                <select className="form-input admin-meta-input" value={author} onChange={e => setAuthor(e.target.value)}>
                  {authors.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            {editingSlug && updatedAt && (
              <div style={{ fontSize: 11, color: '#8a6040', fontFamily: 'EB Garamond, serif', fontStyle: 'italic' }}>
                Updated {updatedAt} · {updateCount}×
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Tags</label>
              <div className="tag-checkboxes">
                {availableTags.map(tag => (
                  <span key={tag} className={`tag-option${selectedTags.includes(tag) ? ' selected' : ''}`} onClick={() => toggleTag(tag)}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Drop Cap 𝔄</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'EB Garamond, serif', fontSize: 14, color: '#2a1a0e' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={dropCapParagraph > 0} onChange={e => setDropCapParagraph(e.target.checked ? 1 : 0)} style={{ accentColor: '#8b1a1a', width: 14, height: 14 }} />
                  Enable
                </label>
                {dropCapParagraph > 0 && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Para
                    <input type="number" min={1} max={20} value={dropCapParagraph} onChange={e => setDropCapParagraph(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: 48, padding: '2px 6px', border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2', fontFamily: 'EB Garamond, serif', fontSize: 14 }} />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Series</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: 'EB Garamond, serif', fontSize: 14, color: '#2a1a0e' }}>
                <input type="checkbox" checked={!!series} onChange={e => { setSeries(e.target.checked ? (existingSeries[0] ?? 'New Series') : ''); setSeriesOrder(e.target.checked ? 1 : 0) }} style={{ accentColor: '#8b1a1a', width: 14, height: 14 }} />
                Part of a series
              </label>
              {series && (
                <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <datalist id="series-list">
                    {existingSeries.map(s => <option key={s} value={s} />)}
                  </datalist>
                  <input className="form-input admin-meta-input" list="series-list" value={series} onChange={e => setSeries(e.target.value)} placeholder="Series name" />
                  {existingSeries.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {existingSeries.map(s => (
                        <button key={s} type="button" onClick={() => setSeries(s)} style={{ fontFamily: 'EB Garamond, serif', fontSize: 11, padding: '2px 7px', borderRadius: 2, cursor: 'pointer', border: `1px solid ${series === s ? '#8b1a1a' : '#c49a5a'}`, background: series === s ? '#f5d0d0' : 'transparent', color: series === s ? '#6a1010' : '#4a3020' }}>{s}</button>
                      ))}
                    </div>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'EB Garamond, serif', fontSize: 14, color: '#2a1a0e' }}>
                    Part
                    <input type="number" min={1} max={99} value={seriesOrder} onChange={e => setSeriesOrder(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: 52, padding: '2px 6px', border: '1px solid #c49a5a', borderRadius: 2, background: '#fffaf2', fontFamily: 'EB Garamond, serif', fontSize: 14 }} />
                  </label>
                </div>
              )}
            </div>
          </div>

          <Accordion id="published" label="Published" count={published.length}>
            {published.length === 0 && <p className="admin-empty">No published posts yet.</p>}
            {published.map(post => (
              <div key={post.slug} className="admin-panel-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="admin-post-title" style={{ fontSize: 13 }}>{post.title}</div>
                  <div className="admin-post-date">{post.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="admin-panel-btn">View</a>
                  <button className="admin-panel-btn" onClick={() => loadPost(post.slug)}>Edit</button>
                  <button className="admin-panel-btn danger" onClick={() => handleDeletePost(post.slug)}>✕</button>
                </div>
              </div>
            ))}
          </Accordion>

          <Accordion id="scheduled" label="Scheduled" count={scheduledPosts.length}>
            {scheduledPosts.length === 0 && <p className="admin-empty">No scheduled posts.</p>}
            {scheduledPosts.map(post => (
              <div key={post.slug} className="admin-panel-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="admin-post-title" style={{ fontSize: 13, color: '#3a6a9a' }}>{post.title}</div>
                  <div className="admin-post-date">Publishes {post.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <a href={`/preview/${post.slug}`} target="_blank" rel="noopener noreferrer" className="admin-panel-btn">Preview</a>
                  <button className="admin-panel-btn" onClick={() => loadPost(post.slug)}>Edit</button>
                  <button className="admin-panel-btn danger" onClick={() => handleDeletePost(post.slug)}>✕</button>
                </div>
              </div>
            ))}
          </Accordion>

          <Accordion id="drafts" label="Drafts" count={drafts.length}>
            {drafts.length === 0 && <p className="admin-empty">No drafts.</p>}
            {drafts.map(post => (
              <div key={post.slug} className="admin-panel-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="admin-post-title" style={{ fontSize: 13, color: '#8a6040' }}>{post.title}</div>
                  <div className="admin-post-date">Draft</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <a href={`/preview/${post.slug}`} target="_blank" rel="noopener noreferrer" className="admin-panel-btn">Preview</a>
                  <button className="admin-panel-btn" onClick={() => loadPost(post.slug)}>Edit</button>
                  <button className="admin-panel-btn danger" onClick={() => handleDeletePost(post.slug)}>✕</button>
                </div>
              </div>
            ))}
          </Accordion>

          {activeSeries.length > 0 && (
            <Accordion id="series" label="Series" count={activeSeries.length}>
              {activeSeries.map(seriesName => {
                const pub = (publishedBySeries.get(seriesName) ?? []).sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
                const sched = (scheduledBySeries.get(seriesName) ?? []).sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
                return (
                  <div key={seriesName} style={{ borderBottom: '1px solid #ecdec8' }}>
                    <div style={{ padding: '0.5rem 0.75rem', background: '#fff8ee', fontSize: 12, fontFamily: 'Cinzel, serif', color: '#8b1a1a', letterSpacing: '0.06em' }}>{seriesName}</div>
                    {pub.map((post, i) => (
                      <div key={post.slug} className="admin-panel-row" style={{ paddingLeft: '1.25rem' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontFamily: 'Cinzel, serif', color: '#8a6040', marginBottom: 1 }}>Part {post.seriesOrder ?? i + 1}</div>
                          <div className="admin-post-title" style={{ fontSize: 12 }}>{post.title}</div>
                        </div>
                        <button className="admin-panel-btn" onClick={() => loadPost(post.slug)}>Edit</button>
                      </div>
                    ))}
                    {sched.map((post, i) => (
                      <div key={post.slug} className="admin-panel-row" style={{ paddingLeft: '1.25rem', opacity: 0.7 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontFamily: 'Cinzel, serif', color: '#3a6a9a', marginBottom: 1 }}>Part {post.seriesOrder ?? pub.length + i + 1} · Scheduled</div>
                          <div className="admin-post-title" style={{ fontSize: 12 }}>{post.title}</div>
                        </div>
                        <button className="admin-panel-btn" onClick={() => loadPost(post.slug)}>Edit</button>
                      </div>
                    ))}
                  </div>
                )
              })}
            </Accordion>
          )}

          <Accordion id="tags" label="Tags" count={availableTags.length}>
            {availableTags.map(tag => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', borderBottom: '1px solid #ecdec8' }}>
                {editingTag === tag ? (
                  <>
                    <input style={{ ...manageInputStyle, flex: 1 }} value={editingTagVal} onChange={e => setEditingTagVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleRenameTag(tag, editingTagVal); if (e.key === 'Escape') setEditingTag(null) }} autoFocus />
                    <button className="admin-panel-btn" onClick={() => handleRenameTag(tag, editingTagVal)}>Save</button>
                    <button className="admin-panel-btn danger" onClick={() => setEditingTag(null)}>✕</button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 13, fontFamily: 'EB Garamond, serif' }}>{tag}</span>
                    <button className="admin-panel-btn" onClick={() => { setEditingTag(tag); setEditingTagVal(tag) }}>Edit</button>
                    <button className="admin-panel-btn danger" onClick={() => handleDeleteTag(tag)}>✕</button>
                  </>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '6px', padding: '0.6rem 0.75rem' }}>
              <input style={{ ...manageInputStyle, flex: 1 }} placeholder="New tag…" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} />
              <button className="admin-panel-btn" onClick={handleAddTag} disabled={addingTag || !newTag.trim()}>{addingTag ? '…' : '+ Add'}</button>
            </div>
          </Accordion>

          <Accordion id="authors" label="Authors" count={authors.length}>
            {authors.map(a => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', borderBottom: '1px solid #ecdec8' }}>
                {editingAuthor === a ? (
                  <>
                    <input style={{ ...manageInputStyle, flex: 1 }} value={editingAuthorVal} onChange={e => setEditingAuthorVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleRenameAuthor(a, editingAuthorVal); if (e.key === 'Escape') setEditingAuthor(null) }} autoFocus />
                    <button className="admin-panel-btn" onClick={() => handleRenameAuthor(a, editingAuthorVal)}>Save</button>
                    <button className="admin-panel-btn danger" onClick={() => setEditingAuthor(null)}>✕</button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 13, fontFamily: 'EB Garamond, serif' }}>{a}</span>
                    <button className="admin-panel-btn" onClick={() => { setEditingAuthor(a); setEditingAuthorVal(a) }}>Edit</button>
                    <button className="admin-panel-btn danger" onClick={() => handleDeleteAuthor(a)}>✕</button>
                  </>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '6px', padding: '0.6rem 0.75rem' }}>
              <input style={{ ...manageInputStyle, flex: 1 }} placeholder="New author…" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddAuthor()} />
              <button className="admin-panel-btn" onClick={handleAddAuthor} disabled={addingAuthor || !newAuthor.trim()}>{addingAuthor ? '…' : '+ Add'}</button>
            </div>
          </Accordion>

        </div>
      </div>
    </div>
  )
}
