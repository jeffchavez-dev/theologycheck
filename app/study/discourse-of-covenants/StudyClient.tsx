'use client'
import { useState, useEffect, useRef } from 'react'
import type { Chapter, OutlineNode } from './page'

// ── Recursive outline node ────────────────────────────────────────────────────

function Node({ node, depth }: { node: OutlineNode; depth: number }) {
  const [open, setOpen] = useState(false)
  const hasChildren = node.children.length > 0

  return (
    <div className={`coxe-node coxe-node--d${Math.min(depth, 5)}`}>
      <div
        className={`coxe-node-row${hasChildren ? ' clickable' : ''}`}
        onClick={() => hasChildren && setOpen(o => !o)}
        role={hasChildren ? 'button' : undefined}
      >
        {hasChildren ? (
          <span className="coxe-toggle">{open ? '▾' : '▸'}</span>
        ) : (
          <span className="coxe-toggle invisible">▸</span>
        )}
        <span className="coxe-node-text">{node.text}</span>
      </div>
      {open && hasChildren && (
        <div className="coxe-children">
          {node.children.map((child, i) => (
            <Node key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chapter row ───────────────────────────────────────────────────────────────

function ChapterRow({
  chapter,
  open,
  onToggle,
}: {
  chapter: Chapter
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="study-chapter">
      <div
        className="study-chapter-header"
        onClick={onToggle}
        role="button"
        aria-expanded={open}
      >
        <span className="study-chapter-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-chapter-num">Ch. {chapter.number}</span>
        <span className="study-chapter-title">{chapter.title}</span>
      </div>
      {open && (
        <div className="study-chapter-body">
          {chapter.nodes.map((node, i) => (
            <Node key={i} node={node} depth={0} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StudyClient({ chapters }: { chapters: Chapter[] }) {
  const [openChapter, setOpenChapter] = useState<number | null>(null)
  const [allOpen, setAllOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('tc-auth') === '1')
  }, [])

  function toggleChapter(num: number) {
    setAllOpen(false)
    setOpenChapter(prev => prev === num ? null : num)
  }

  return (
    <div className="main">
      <div className="study-page-header">
        <div className="section-label">Study</div>
        <h1 className="study-book-title">A Discourse of the Covenants</h1>
        <p className="study-book-author">Nehemiah Coxe</p>
        <p className="study-book-subtitle">That God Made with Men Before the Law</p>
        <p className="study-book-attribution">
          Outline by Brandon Adams · not by the Theology Check author
        </p>
      </div>

      <div className="study-controls">
        <button className="study-btn" onClick={() => setAllOpen(true)}>Expand All</button>
        <button className="study-btn" onClick={() => { setAllOpen(false); setOpenChapter(null) }}>Collapse All</button>
      </div>

      <div className="study-outline">
        {chapters.map(ch => (
          <ChapterRow
            key={ch.number}
            chapter={ch}
            open={allOpen || openChapter === ch.number}
            onToggle={() => toggleChapter(ch.number)}
          />
        ))}
      </div>

      <p className="study-footer-note">
        This is an interactive study outline of <em>A Discourse of the Covenants That God Made
        with Men Before the Law</em> by Nehemiah Coxe, outlining the Adamic, Noahic, Abrahamic,
        and Covenant of Circumcision from a 1689 Federalism perspective.
        Outline by <a href="https://www.credomag.com/author/brandon-adams/" target="_blank" rel="noopener noreferrer">Brandon Adams</a>
        {' '}· not a substitute for reading the original work.
      </p>
    </div>
  )
}
