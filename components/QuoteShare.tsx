'use client'
import { useEffect } from 'react'

export default function QuoteShare() {
  useEffect(() => {
    const blockquotes = document.querySelectorAll<HTMLElement>('.post-content blockquote')
    blockquotes.forEach(bq => {
      // Only attach to full pull-quote cards (multi-paragraph = ❝¶ style)
      if (bq.querySelectorAll('p').length < 2) return
      if (bq.querySelector('.quote-share-btn')) return // already added
      const btn = document.createElement('button')
      btn.textContent = 'Share'
      btn.className = 'quote-share-btn'
      bq.appendChild(btn)
      btn.addEventListener('click', () => shareQuote(bq))
    })
  }, [])

  return null
}

async function shareQuote(bq: HTMLElement) {
  const paragraphs = [...bq.querySelectorAll<HTMLElement>('p')]
  const lastP = paragraphs[paragraphs.length - 1]
  const hasAttribution = paragraphs.length > 1 && lastP?.textContent?.trim().startsWith('—')
  const attribution = hasAttribution ? lastP.textContent?.trim() ?? '' : ''
  const quotePs = hasAttribution ? paragraphs.slice(0, -1) : paragraphs
  const quoteText = quotePs.map(p => p.textContent?.trim()).filter(Boolean).join('\n\n')

  const W = 1200, H = 630
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  await Promise.all([
    document.fonts.load('italic 36px "EB Garamond"'),
    document.fonts.load('500 24px "Cinzel"'),
  ])

  // Background
  ctx.fillStyle = '#160d06'
  ctx.fillRect(0, 0, W, H)

  // Subtle vignette-like border inset
  const pad = 48
  ctx.strokeStyle = '#c49a5a'
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.35
  ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2)
  ctx.globalAlpha = 1

  // Corner ornaments
  const cs = 14
  ctx.strokeStyle = '#c49a5a'
  ctx.lineWidth = 1.5
  ctx.globalAlpha = 0.7
  for (const [cx, cy, dx, dy] of [
    [pad, pad, 1, 1], [W - pad, pad, -1, 1],
    [pad, H - pad, 1, -1], [W - pad, H - pad, -1, -1]
  ] as [number, number, number, number][]) {
    ctx.beginPath(); ctx.moveTo(cx + dx * cs, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + dy * cs); ctx.stroke()
  }
  ctx.globalAlpha = 1

  // Opening quote mark
  ctx.font = '500 108px "Cinzel"'
  ctx.fillStyle = '#c49a5a'
  ctx.textAlign = 'center'
  ctx.fillText('“', W / 2, 210)

  // Quote text — word wrap
  ctx.font = 'italic 30px "EB Garamond"'
  ctx.fillStyle = '#f0e8d8'
  ctx.textAlign = 'center'
  const lineH = 46
  const maxW = 860
  const startY = attribution ? 280 : 300
  const usedLines = wrapText(ctx, quoteText, W / 2, startY, maxW, lineH)
  const textBottom = startY + usedLines * lineH

  // Attribution
  if (attribution) {
    ctx.font = '500 15px "Cinzel"'
    ctx.fillStyle = '#c49a5a'
    ctx.fillText(attribution.toUpperCase(), W / 2, textBottom + 36)
  }

  // Branding
  ctx.font = '500 13px "Cinzel"'
  ctx.fillStyle = '#5a4030'
  ctx.fillText('THEOLOGYCHECK.BLOG', W / 2, H - 52)

  canvas.toBlob(async blob => {
    if (!blob) return
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast(bq, 'Quote card copied to clipboard')
    } catch {
      // fallback: download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'quote-theologycheck.png'; a.click()
      URL.revokeObjectURL(url)
    }
  }, 'image/png')
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string, x: number, y: number,
  maxWidth: number, lineHeight: number
): number {
  const words = text.split(' ')
  let line = ''
  let row = 0
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, y + row * lineHeight)
      line = word + ' '
      row++
    } else {
      line = test
    }
  }
  if (line.trim()) { ctx.fillText(line.trim(), x, y + row * lineHeight); row++ }
  return row
}

function showToast(near: HTMLElement, msg: string) {
  const t = document.createElement('div')
  t.textContent = msg
  Object.assign(t.style, {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    background: '#1a0f08', color: '#c49a5a', fontFamily: 'Cinzel, serif',
    fontSize: '12px', letterSpacing: '0.08em', padding: '10px 20px',
    border: '1px solid #c49a5a44', zIndex: '9999', pointerEvents: 'none',
    textTransform: 'uppercase',
  })
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 2500)
}
