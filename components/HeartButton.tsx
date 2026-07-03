'use client'

import { useState, useEffect } from 'react'

export default function HeartButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)
  const [hearted, setHearted] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const key = `hearted:${slug}`
    setHearted(localStorage.getItem(key) === '1')
    fetch(`/api/reactions?slug=${slug}`)
      .then(r => r.json())
      .then(d => setCount(d.count ?? 0))
      .catch(() => setCount(0))
  }, [slug])

  async function handleHeart() {
    if (hearted) return
    setHearted(true)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)
    localStorage.setItem(`hearted:${slug}`, '1')
    try {
      const res = await fetch(`/api/reactions?slug=${slug}`, { method: 'POST' })
      const data = await res.json()
      setCount(data.count ?? (count ?? 0) + 1)
    } catch {
      setCount(c => (c ?? 0) + 1)
    }
  }

  return (
    <div className="heart-wrap">
      <button
        className={`heart-btn${hearted ? ' heart-btn--active' : ''}${animating ? ' heart-btn--pop' : ''}`}
        onClick={handleHeart}
        aria-label={hearted ? 'You liked this post' : 'Like this post'}
        disabled={hearted}
      >
        <svg viewBox="0 0 24 24" className="heart-icon" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="heart-label">{hearted ? 'Liked' : 'Like'}</span>
      </button>
      {count !== null && (
        <span className="heart-count">{count} {count === 1 ? 'heart' : 'hearts'}</span>
      )}
    </div>
  )
}
