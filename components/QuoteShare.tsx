'use client'
import { useEffect } from 'react'

export default function QuoteShare() {
  useEffect(() => {
    const blockquotes = document.querySelectorAll<HTMLElement>('.post-content .pull-quote blockquote')
    blockquotes.forEach(bq => {
      if (bq.querySelector('.quote-share-btn')) return
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

  const [, , bgImg] = await Promise.all([
    document.fonts.load('italic 36px "EB Garamond"'),
    document.fonts.load('500 24px "Cinzel"'),
    loadImage('/og-image.png'),
  ])

  // Layout constants
  const pad = 48
  const quoteMarkH = 90   // space for the " glyph + gap
  const attributionH = attribution ? 50 : 0
  const brandingH = 50
  const innerTop = pad + 20
  const innerBottom = H - pad - 20
  const availableForText = innerBottom - innerTop - quoteMarkH - attributionH - brandingH

  // Find the largest font size where the text fits
  const maxW = 900
  let fontSize = 32
  let lineH = fontSize * 1.55
  let lines: string[] = []

  while (fontSize >= 16) {
    ctx.font = `italic ${fontSize}px "EB Garamond"`
    lineH = fontSize * 1.55
    lines = buildLines(ctx, quoteText, maxW)
    const textH = lines.length * lineH
    if (textH <= availableForText) break
    fontSize -= 2
  }

  // ── Draw ──

  // Background — cathedral photo + dark overlay
  if (bgImg) {
    const scale = Math.max(W / bgImg.width, H / bgImg.height)
    const sw = bgImg.width * scale, sh = bgImg.height * scale
    ctx.drawImage(bgImg, (W - sw) / 2, (H - sh) / 2, sw, sh)
  }
  ctx.fillStyle = 'rgba(16, 8, 2, 0.82)'
  ctx.fillRect(0, 0, W, H)

  // Border
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
    [pad, H - pad, 1, -1], [W - pad, H - pad, -1, -1],
  ] as [number, number, number, number][]) {
    ctx.beginPath(); ctx.moveTo(cx + dx * cs, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + dy * cs); ctx.stroke()
  }
  ctx.globalAlpha = 1

  // Vertically center everything inside the border
  const totalContentH = quoteMarkH + lines.length * lineH + attributionH + brandingH
  const contentStartY = innerTop + (innerBottom - innerTop - totalContentH) / 2

  // Opening quote mark
  ctx.font = '500 80px "Cinzel"'
  ctx.fillStyle = '#c49a5a'
  ctx.textAlign = 'center'
  ctx.fillText('"', W / 2, contentStartY + 68)

  // Quote text
  ctx.font = `italic ${fontSize}px "EB Garamond"`
  ctx.fillStyle = '#f0e8d8'
  ctx.textAlign = 'center'
  const textStartY = contentStartY + quoteMarkH
  lines.forEach((line, i) => {
    ctx.fillText(line, W / 2, textStartY + i * lineH)
  })
  const textEndY = textStartY + lines.length * lineH

  // Attribution
  if (attribution) {
    ctx.font = '500 14px "Cinzel"'
    ctx.fillStyle = '#c49a5a'
    ctx.fillText(attribution.toUpperCase(), W / 2, textEndY + 32)
  }

  // Branding
  ctx.font = '500 12px "Cinzel"'
  ctx.fillStyle = '#5a4030'
  ctx.fillText('THEOLOGYCHECK.BLOG', W / 2, H - pad - 8)

  canvas.toBlob(async blob => {
    if (!blob) return
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast(bq, 'Quote card copied to clipboard')
    } catch {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'quote-theologycheck.png'; a.click()
      URL.revokeObjectURL(url)
    }
  }, 'image/png')
}

function buildLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const result: string[] = []
  for (const paragraph of text.split('\n\n')) {
    const words = paragraph.split(' ')
    let line = ''
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > maxWidth && line !== '') {
        result.push(line.trim())
        line = word + ' '
      } else {
        line = test
      }
    }
    if (line.trim()) result.push(line.trim())
  }
  return result
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise(resolve => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
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
