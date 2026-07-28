'use client'
import { useState, useEffect, useRef } from 'react'
import type { Topic, Subsection, Quote } from './page'

// ── Section notes (admin-editable) ───────────────────────────────────────────
// Key format: "topicNumber-subsectionNumber"  e.g. "1-1.1"

const NOTES: Record<string, string> = {}

// ── Quote row ─────────────────────────────────────────────────────────────────

function QuoteRow({ quote }: { quote: Quote }) {
  const [open, setOpen] = useState(false)
  const hasContent = !!quote.content.trim()

  return (
    <div className="fed-quote">
      <button
        className={`fed-quote-header${hasContent ? ' clickable' : ''}`}
        onClick={() => hasContent && setOpen(o => !o)}
        aria-expanded={open}
      >
        {hasContent && (
          <span className="study-toggle">{open ? '▾' : '▸'}</span>
        )}
        {!hasContent && <span className="study-toggle invisible">▸</span>}
        <span className="fed-quote-number">{quote.number}</span>
        <span className="fed-quote-title">{quote.title}</span>
      </button>
      {open && hasContent && (
        <div className="fed-quote-body">
          <p className="fed-quote-text">{quote.content}</p>
        </div>
      )}
    </div>
  )
}

// ── Subsection row ────────────────────────────────────────────────────────────

function SubsectionRow({
  sub,
  allNotes,
  isAdmin,
  onSaveNote,
  topicNum,
}: {
  sub: Subsection
  allNotes: Record<string, string>
  isAdmin: boolean
  onSaveNote: (key: string, text: string) => void
  topicNum: string
}) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const noteKey = `${topicNum}-${sub.number}`
  const note = allNotes[noteKey] ?? NOTES[noteKey] ?? ''
  const hasChildren = sub.quotes.length > 0

  function startEdit() {
    setDraft(note)
    setEditing(true)
  }
  function saveNote() {
    onSaveNote(noteKey, draft)
    setEditing(false)
  }

  return (
    <div className="study-section">
      <div
        className={`study-section-header${hasChildren ? ' clickable' : ''}`}
        onClick={() => hasChildren && setOpen(o => !o)}
      >
        {hasChildren ? (
          <span className="study-toggle">{open ? '▾' : '▸'}</span>
        ) : (
          <span className="study-toggle invisible">▸</span>
        )}
        <span className="study-section-title">{sub.title}</span>
        {isAdmin && (
          <button className="study-note-edit-btn" onClick={e => { e.stopPropagation(); startEdit() }}>
            {note ? '✏️' : '+'}
          </button>
        )}
      </div>
      {editing && (
        <div className="study-note-editor">
          <textarea
            className="study-note-textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
            placeholder="Add a study note…"
          />
          <div className="study-note-actions">
            <button className="study-note-save" onClick={saveNote}>Save</button>
            <button className="study-note-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
      {note && !editing && (
        <p className="study-section-note">{note}</p>
      )}
      {open && (
        <div className="study-section-body">
          {sub.quotes.map(q => (
            <QuoteRow key={q.number} quote={q} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Topic row ─────────────────────────────────────────────────────────────────

function TopicRow({
  topic,
  open,
  onToggle,
  allNotes,
  isAdmin,
  onSaveNote,
}: {
  topic: Topic
  open: boolean
  onToggle: () => void
  allNotes: Record<string, string>
  isAdmin: boolean
  onSaveNote: (key: string, text: string) => void
}) {
  return (
    <div className="study-chapter">
      <div className="study-chapter-header" onClick={onToggle} role="button" aria-expanded={open}>
        <span className="study-chapter-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-chapter-num">{topic.number}</span>
        <span className="study-chapter-title">{topic.title}</span>
      </div>
      {open && (
        <div className="study-chapter-body">
          {topic.subsections.map(sub => (
            <SubsectionRow
              key={sub.number}
              sub={sub}
              allNotes={allNotes}
              isAdmin={isAdmin}
              onSaveNote={onSaveNote}
              topicNum={topic.number}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function StudyClient({ topics }: { topics: Topic[] }) {
  const [openTopic, setOpenTopic] = useState<string | null>(null)
  const [allTopicsOpen, setAllTopicsOpen] = useState(false)
  const [allNotes, setAllNotes] = useState<Record<string, string>>({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [saving, setSaving] = useState(false)
  const hasFetched = useRef(false)

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('tc-auth') === '1')
    if (hasFetched.current) return
    hasFetched.current = true
    fetch('/api/study-notes/1689-federalism')
      .then(r => r.json())
      .then(data => { if (data && typeof data === 'object') setAllNotes(data) })
      .catch(() => {})
  }, [])

  function toggleTopic(num: string) {
    setAllTopicsOpen(false)
    setOpenTopic(prev => prev === num ? null : num)
  }

  function expandAll() {
    setAllTopicsOpen(true)
    setOpenTopic(null)
  }

  function collapseAll() {
    setAllTopicsOpen(false)
    setOpenTopic(null)
  }

  async function handleSaveNote(key: string, text: string) {
    const updated = { ...allNotes, [key]: text }
    setAllNotes(updated)
    setSaving(true)
    await fetch('/api/study-notes/1689-federalism', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSaving(false)
  }

  return (
    <div className="main">
      <div className="study-page-header">
        <div className="section-label">Study</div>
        <h1 className="study-book-title">1689 Reformed Baptist Federalism</h1>
        <p className="study-book-author">A Topical Reference on Covenant Theology</p>
        <p className="study-book-subtitle">Reference Outline</p>
        {saving && <span className="study-saving">Saving…</span>}
      </div>

      <div className="study-controls">
        <button className="study-btn" onClick={expandAll}>Expand All</button>
        <button className="study-btn" onClick={collapseAll}>Collapse All</button>
      </div>

      <div className="study-outline">
        {topics.map(topic => (
          <TopicRow
            key={topic.number}
            topic={topic}
            open={allTopicsOpen || openTopic === topic.number}
            onToggle={() => toggleTopic(topic.number)}
            allNotes={allNotes}
            isAdmin={isAdmin}
            onSaveNote={handleSaveNote}
          />
        ))}
      </div>

      <p className="study-footer-note">
        This is an interactive study outline on 1689 Reformed Baptist Federalism.
        Quotes compiled from Nehemiah Coxe, Samuel Renihan, Pascal Denault, John Owen,
        A. W. Pink, Jeffrey Johnson, and others.{' '}
        Outline compiled by Simon Wartanian of{' '}
        <a href="https://thecalvinist.net/" target="_blank" rel="noopener noreferrer">The Staunch Calvinist</a>
        {' '}· not by the Theology Check author.
      </p>
    </div>
  )
}
