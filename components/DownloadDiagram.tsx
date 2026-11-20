'use client'
import { useState } from 'react'

interface Props {
  targetId: string
  filename: string
}

export default function DownloadDiagram({ targetId, filename }: Props) {
  const [busy, setBusy] = useState(false)

  async function handleDownload() {
    setBusy(true)
    try {
      const el = document.getElementById(targetId)
      if (!el) return

      // For SVG elements, serialize directly → canvas → PNG
      if (el.tagName === 'svg' || el.querySelector('svg')) {
        const svg = el.tagName === 'svg' ? el : el.querySelector('svg')!
        const svgData = new XMLSerializer().serializeToString(svg)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        const img = new Image()
        img.onload = () => {
          const scale = 2
          const canvas = document.createElement('canvas')
          canvas.width = img.width * scale
          canvas.height = img.height * scale
          const ctx = canvas.getContext('2d')!
          ctx.scale(scale, scale)
          ctx.fillStyle = '#faf6ef'
          ctx.fillRect(0, 0, img.width, img.height)
          ctx.drawImage(img, 0, 0)
          URL.revokeObjectURL(url)
          canvas.toBlob(blob => {
            if (!blob) return
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = `${filename}.png`
            a.click()
            setBusy(false)
          }, 'image/png')
        }
        img.src = url
      } else {
        // CSS-based diagrams — use html2canvas
        const h2c = (await import('html2canvas')).default
        const canvas = await h2c(el as HTMLElement, {
          scale: 2,
          backgroundColor: '#faf6ef',
          useCORS: true,
          logging: false,
        })
        canvas.toBlob(blob => {
          if (!blob) return
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = `${filename}.png`
          a.click()
          setBusy(false)
        }, 'image/png')
      }
    } catch {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={busy}
      className="fed-download-btn"
      aria-label={`Download ${filename} as PNG`}
    >
      {busy ? 'Generating…' : '↓ Download PNG'}
    </button>
  )
}
