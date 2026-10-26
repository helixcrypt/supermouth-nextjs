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
      apiKey: 'cw_live_1263a1242a91bbe2959217091769e01bba6ef1a0262d670b',
      apiUrl: 'https://chat.quincer.com/api', // Uses default persona, or auto-detects from URL patterns
    }

    // The runtime is a singleton: load the script once per page session.
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = WIDGET_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return null
}
