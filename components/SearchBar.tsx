'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setOpen(false)
    setQuery('')
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); setQuery('') }
  }

  return (
    <div className={`search-bar-wrap${open ? ' search-bar-open' : ''}`}>
      {open ? (
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search posts…"
            aria-label="Search"
          />
          <button type="submit" className="search-icon-btn" aria-label="Submit search">
            <SearchIcon />
          </button>
          <button type="button" className="search-close-btn" onClick={() => { setOpen(false); setQuery('') }} aria-label="Close search">✕</button>
        </form>
      ) : (
        <button className="search-icon-btn" onClick={() => setOpen(true)} aria-label="Open search">
          <SearchIcon />
        </button>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
