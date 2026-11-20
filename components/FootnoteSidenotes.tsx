'use client'
import { useEffect } from 'react'

const COLLAPSE_THRESHOLD = 180 // px — sidenotes taller than this get a toggle

function positionSidenotes(article: HTMLElement, footnotesSection: HTMLElement) {
  const fnMap: Record<string, string> = {}
  footnotesSection.querySelectorAll<HTMLElement>('li[id]').forEach(li => {
    const clone = li.cloneNode(true) as HTMLElement
    clone.querySelector('a[data-footnote-backref]')?.remove()
    fnMap[li.id] = clone.innerHTML.trim()
  })

  const refs = document.querySelectorAll<HTMLAnchorElement>('[data-footnote-ref]')

  // Remove any previously rendered sidenotes before repositioning
  article.querySelectorAll('.fn-sidenote').forEach(el => el.remove())

  let lastBottom = 0
  let num = 1

  refs.forEach(ref => {
    const fnId = ref.getAttribute('href')?.slice(1)
    if (!fnId || !fnMap[fnId]) return

    const sup = ref.closest('sup')
    if (!sup) return

    const articleRect = article.getBoundingClientRect()
    const supTop = sup.getBoundingClientRect().top - articleRect.top + article.scrollTop

    const sidenote = document.createElement('div')
    sidenote.className = 'fn-sidenote'
    sidenote.dataset.fnNum = String(num)

    const inner = document.createElement('div')
    inner.className = 'fn-sidenote-inner'
    inner.innerHTML = `<span class="fn-sidenote-num">${num}</span>${fnMap[fnId]}`
    sidenote.appendChild(inner)
    num++

    article.appendChild(sidenote)

    const top = Math.max(supTop - 4, lastBottom + 8)
    sidenote.style.top = `${top}px`

    // Add expand toggle for tall sidenotes
    if (sidenote.offsetHeight > COLLAPSE_THRESHOLD) {
      sidenote.classList.add('fn-sidenote--collapsible', 'fn-sidenote--collapsed')

      const toggle = document.createElement('button')
      toggle.className = 'fn-sidenote-toggle'
      toggle.textContent = 'Show more'
      toggle.addEventListener('click', () => {
        const isNowCollapsed = sidenote.classList.toggle('fn-sidenote--collapsed')
        toggle.textContent = isNowCollapsed ? 'Show more' : 'Show less'
      })
      sidenote.appendChild(toggle)
    }

    lastBottom = top + sidenote.offsetHeight
  })
}

export default function FootnoteSidenotes() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('.post-page')
    const footnotesSection = document.querySelector<HTMLElement>('[data-footnotes]')
    if (!footnotesSection || !article) return
    if (window.innerWidth < 1100) return

    // Wait for fonts so layout measurements are accurate
    document.fonts.ready.then(() => {
      positionSidenotes(article, footnotesSection)
      footnotesSection.style.display = 'none'
      const hr = footnotesSection.previousElementSibling
      if (hr?.tagName === 'HR') (hr as HTMLElement).style.display = 'none'
    })
  }, [])

  return null
}
