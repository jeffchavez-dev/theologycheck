'use client'
import { useState } from 'react'

export default function CopyLink() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} className="copy-link-btn">
      {copied ? '✓ Link Copied!' : '⎘ Copy Link'}
    </button>
  )
}
