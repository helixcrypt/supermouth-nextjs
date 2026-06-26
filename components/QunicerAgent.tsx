'use client'

import { useEffect } from 'react'

export default function QunicerAgent() {
  useEffect(() => {
    // Set config before loading script
    ;(window as any).ChatWidgetConfig = {
      apiKey: 'cw_live_82559d7e8f5e985571c5a7fb467721207cc530dc8f7eed57',
      apiUrl: 'https://chat.quincer.com/api',
    }

    // Avoid duplicate script injection
    if (document.querySelector('script[src="https://chat.quincer.com/api/embed/widget.js"]')) return

    const script = document.createElement('script')
    script.src = 'https://chat.quincer.com/api/embed/widget.js'
    script.defer = true
    document.body.appendChild(script)

    return () => {
      const existing = document.querySelector('script[src="https://chat.quincer.com/api/embed/widget.js"]')
      if (existing) document.body.removeChild(existing)
    }
  }, [])

  return null
}
