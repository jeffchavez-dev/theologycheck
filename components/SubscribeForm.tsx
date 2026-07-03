'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="subscribe-wrap">
      <div className="subscribe-label">Stay in the Tradition</div>
      <p className="subscribe-desc">New posts delivered to your inbox — no noise, no spam.</p>
      {status === 'success' && (
        <p className="subscribe-success">✓ Check your inbox to confirm your subscription.</p>
      )}
      {status === 'error' && (
        <p className="subscribe-error">{errorMsg}</p>
      )}
      {status !== 'success' && (
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            className="subscribe-input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="subscribe-btn" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}
