'use client'
import { useEffect } from 'react'

export default function FootnoteSidenotes() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('.post-page')
    // GFM footnotes: <section data-footnotes class="footnotes">
    const footnotesSection = document.querySelector<HTMLElement>('[data-footnotes]')
    if (!footnotesSection || !article) return

    if (window.innerWidth < 1100) return

    // Extract footnote content keyed by li id (e.g. "user-content-fn-1")
    const fnMap: Record<string, string> = {}
    footnotesSection.querySelectorAll<HTMLElement>('li[id]').forEach(li => {
      const clone = li.cloneNode(true) as HTMLElement
      // Remove the back-reference arrow link
      clone.querySelector('a[data-footnote-backref]')?.remove()
      fnMap[li.id] = clone.innerHTML.trim()
    })

    // GFM inline refs use data-footnote-ref attribute
    const refs = document.querySelectorAll<HTMLAnchorElement>('[data-footnote-ref]')

    let lastBottom = 0
    let num = 1

    refs.forEach(ref => {
      const fnId = ref.getAttribute('href')?.slice(1) // strip leading #
      if (!fnId || !fnMap[fnId]) return

      const sup = ref.closest('sup')
      if (!sup) return

      const articleRect = article.getBoundingClientRect()
      const supTop = sup.getBoundingClientRect().top - articleRect.top + article.scrollTop

      const sidenote = document.createElement('div')
      sidenote.className = 'fn-sidenote'
      sidenote.innerHTML = `<span class="fn-sidenote-num">${num}</span>${fnMap[fnId]}`
      num++
      article.appendChild(sidenote)

      const top = Math.max(supTop - 4, lastBottom + 8)
      sidenote.style.top = `${top}px`
      lastBottom = top + sidenote.offsetHeight
    })

    // Hide bottom footnote section and preceding <hr>
    footnotesSection.style.display = 'none'
    const hr = footnotesSection.previousElementSibling
    if (hr?.tagName === 'HR') (hr as HTMLElement).style.display = 'none'
  }, [])

  return null
}
