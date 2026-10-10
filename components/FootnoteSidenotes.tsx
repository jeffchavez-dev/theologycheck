'use client'
import { useEffect } from 'react'

export default function FootnoteSidenotes() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('.post-page')
    const footnotesSection = document.querySelector<HTMLElement>('.footnotes')
    if (!footnotesSection || !article) return

    // Only activate on wide screens
    if (window.innerWidth < 1100) return

    // Extract footnote content keyed by id (e.g. "fn-1")
    const fnMap: Record<string, string> = {}
    footnotesSection.querySelectorAll<HTMLElement>('li[id]').forEach(li => {
      const clone = li.cloneNode(true) as HTMLElement
      clone.querySelector('a[href^="#fnref"]')?.remove()
      fnMap[li.id] = clone.innerHTML.trim()
    })

    // Track vertical placement to avoid overlaps
    let lastBottom = 0

    document.querySelectorAll<HTMLAnchorElement>('sup a[href^="#fn"]').forEach(ref => {
      const fnId = ref.getAttribute('href')?.slice(1)
      if (!fnId || !fnMap[fnId]) return

      const sup = ref.closest('sup')
      if (!sup) return

      const supTop = sup.getBoundingClientRect().top - article.getBoundingClientRect().top + article.scrollTop

      const sidenote = document.createElement('div')
      sidenote.className = 'fn-sidenote'
      sidenote.innerHTML = fnMap[fnId]

      // Attach before measuring height so browser can lay it out
      article.appendChild(sidenote)

      const top = Math.max(supTop - 4, lastBottom + 8)
      sidenote.style.top = `${top}px`
      lastBottom = top + sidenote.offsetHeight
    })

    // Hide the bottom footnotes block and its preceding <hr>
    footnotesSection.style.display = 'none'
    const hr = footnotesSection.previousElementSibling
    if (hr?.tagName === 'HR') (hr as HTMLElement).style.display = 'none'
  }, [])

  return null
}
