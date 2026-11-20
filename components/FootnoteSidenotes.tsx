'use client'
import { useEffect } from 'react'

const COLLAPSE_THRESHOLD = 180 // px — sidenotes taller than this get a toggle
const GAP = 8

function restack(sidenotes: HTMLElement[], startBottom = 0) {
  let lastBottom = startBottom
  for (const sn of sidenotes) {
    const naturalTop = parseFloat(sn.dataset.naturalTop ?? '0')
    const top = Math.max(naturalTop, lastBottom + GAP)
    sn.style.top = `${top}px`
    lastBottom = top + sn.offsetHeight
  }
}

function positionSidenotes(article: HTMLElement, footnotesSection: HTMLElement) {
  const fnMap: Record<string, string> = {}
  footnotesSection.querySelectorAll<HTMLElement>('li[id]').forEach(li => {
    const clone = li.cloneNode(true) as HTMLElement
    clone.querySelector('a[data-footnote-backref]')?.remove()
    fnMap[li.id] = clone.innerHTML.trim()
  })

  const refs = document.querySelectorAll<HTMLAnchorElement>('[data-footnote-ref]')

  article.querySelectorAll('.fn-sidenote').forEach(el => el.remove())

  let lastBottom = 0
  let num = 1
  const rendered: HTMLElement[] = []

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

    const top = Math.max(supTop - 4, lastBottom + GAP)
    sidenote.dataset.naturalTop = String(supTop - 4)
    sidenote.style.top = `${top}px`

    if (sidenote.offsetHeight > COLLAPSE_THRESHOLD) {
      sidenote.classList.add('fn-sidenote--collapsible', 'fn-sidenote--collapsed')

      const toggle = document.createElement('button')
      toggle.className = 'fn-sidenote-toggle'
      toggle.textContent = 'Show more'
      toggle.addEventListener('click', () => {
        const isNowCollapsed = sidenote.classList.toggle('fn-sidenote--collapsed')
        toggle.textContent = isNowCollapsed ? 'Show more' : 'Show less'
        // Restack from this sidenote onward, anchored to the bottom of whatever precedes it
        const idx = rendered.indexOf(sidenote)
        const prevBottom = idx > 0
          ? parseFloat(rendered[idx - 1].style.top) + rendered[idx - 1].offsetHeight
          : 0
        restack(rendered.slice(idx), prevBottom)
      })
      sidenote.appendChild(toggle)
    }

    lastBottom = top + sidenote.offsetHeight
    rendered.push(sidenote)
  })
}

export default function FootnoteSidenotes() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('.post-page')
    const footnotesSection = document.querySelector<HTMLElement>('[data-footnotes]')
    if (!footnotesSection || !article) return
    if (window.innerWidth < 1100) return

    document.fonts.ready.then(() => {
      positionSidenotes(article, footnotesSection)
      footnotesSection.style.display = 'none'
      const hr = footnotesSection.previousElementSibling
      if (hr?.tagName === 'HR') (hr as HTMLElement).style.display = 'none'
    })
  }, [])

  return null
}
