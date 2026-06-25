'use client'

import { useEffect } from 'react'

export default function QunicerAgent() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_QUNICER_API_KEY
    const agentId = process.env.NEXT_PUBLIC_QUNICER_AGENT_ID

    if (!apiKey || !agentId) return

    // Load Qunicer script
    const script = document.createElement('script')
    script.src = 'https://cdn.qunicer.com/agent.js'
    script.async = true
    script.setAttribute('data-api-key', apiKey)
    script.setAttribute('data-agent-id', agentId)
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-primary-color', '#00b4d8')
    script.setAttribute('data-position', 'bottom-right')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
