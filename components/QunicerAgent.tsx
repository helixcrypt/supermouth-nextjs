'use client'

import { useEffect } from 'react'

const WIDGET_SRC = 'https://chat.quincer.com/api/embed/widget.js'

/** Quincer floating chat widget (site-wide). Mirrors Quincer's official embed snippet. */
export default function QunicerAgent() {
  useEffect(() => {
    const w = window as any

    // One chat per page: if a Quincer chat SECTION embed already registered on this page,
    // the floating widget stands down instead of overwriting its config.
    if (w.__quincerInlineEmbeds) {
      console.warn('[Quincer] A floating chat snippet loaded on a page that already has a chat section — one chat per page, so the floating one stands down. Exclude the site-wide floating snippet from the section’s page to keep the section there.')
      return
    }

    w.ChatWidgetConfig = {
      apiKey: 'cw_live_585864e8db83d5dbeafc7d5e4dd2a35d4a8669a9c037ed93',
      apiUrl: 'https://chat.quincer.com/api', // Uses default persona, or auto-detects from URL patterns
    }

    // The runtime is a singleton: load the script once per page session.
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = WIDGET_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [])

  // TEMPORARY WORKAROUND (added Oct 29 2026; remove once Quincer fixes it):
  // the widget does not scroll to new replies, so on phones Emma's answers and
  // product cards land below the visible area. Keep .cw-messages pinned to the
  // bottom when content arrives, unless the shopper scrolled within the last 4s.
  useEffect(() => {
    let box: HTMLElement | null = null
    let lastUserScroll = 0
    let pending = 0
    const markUser = () => { lastUserScroll = Date.now() }
    const toBottom = () => {
      if (!box || Date.now() - lastUserScroll < 4000) return
      cancelAnimationFrame(pending)
      pending = requestAnimationFrame(() => { if (box) box.scrollTop = box.scrollHeight })
    }
    const inner = new MutationObserver(toBottom)
    const attach = () => {
      const found = document.querySelector<HTMLElement>('.cw-messages')
      if (!found || found === box) return
      if (box) {
        box.removeEventListener('wheel', markUser)
        box.removeEventListener('touchmove', markUser)
        box.removeEventListener('load', toBottom, true)
      }
      box = found
      inner.disconnect()
      inner.observe(box, { childList: true, subtree: true, characterData: true })
      box.addEventListener('wheel', markUser, { passive: true })
      box.addEventListener('touchmove', markUser, { passive: true })
      box.addEventListener('load', toBottom, true) // card images change height after load
      toBottom()
    }
    const outer = new MutationObserver(attach)
    outer.observe(document.body, { childList: true, subtree: true })
    // Replies held while iOS froze the page appear on wake; jump to them.
    const onVisible = () => { if (document.visibilityState === 'visible') { lastUserScroll = 0; toBottom() } }
    document.addEventListener('visibilitychange', onVisible)
    attach()
    return () => {
      outer.disconnect()
      inner.disconnect()
      document.removeEventListener('visibilitychange', onVisible)
      cancelAnimationFrame(pending)
    }
  }, [])

  return null
}
