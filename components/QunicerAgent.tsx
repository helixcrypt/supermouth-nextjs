'use client'

import { useEffect } from 'react'
import { openEmma, cleanRoutineCode, EMMA_BUILD_ROUTINE } from '@/lib/emma'
import { ensureRoutineButtons, hideStateTokens } from '@/lib/routine-buttons-client'
import { installRoutineInterception, resumeLocalInterview, afterEmmaReply, isLocalInterviewActive, hideSideMarks } from '@/lib/routine-local'
import { logEmmaReply } from '@/lib/routine-log-client'

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

  // Routine interview entry points.
  // 1. Links: ?routine=start opens Emma and starts the interview; ?code=AFM opens Emma with that routine code.
  //    (Follow-up emails, printed cards and, later, the dentist portal use these.)
  // 2. Any link to /assessment (the old assessment page) opens Emma instead of navigating.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = cleanRoutineCode(params.get('code'))
    const start = params.get('routine') === 'start'
    if (code || start) {
      openEmma(code ? `My routine code is ${code}` : EMMA_BUILD_ROUTINE, 'link')
      params.delete('code'); params.delete('routine')
      const q = params.toString()
      window.history.replaceState(null, '', window.location.pathname + (q ? `?${q}` : '') + window.location.hash)
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a')
      if (!a) return
      let url: URL
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (url.origin !== window.location.origin || url.pathname !== '/assessment') return
      e.preventDefault()
      openEmma(EMMA_BUILD_ROUTINE, 'menu')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Routine interview buttons: after each Emma reply, make sure the current question's
  // tap buttons are shown (Quincer sometimes leaves them out). Also checks when a
  // restored conversation opens.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    const later = (ms: number) => { clearTimeout(t); t = setTimeout(() => { if (!isLocalInterviewActive()) ensureRoutineButtons() }, ms) }
    const onDone = () => {
      afterEmmaReply()
      later(700)
      // quality log: Emma's replies right after a routine handoff (her text only, token removed)
      setTimeout(() => {
        const b = document.querySelector('.cw-messages')
        if (!b) return
        hideStateTokens(b)
        const bots = b.querySelectorAll('.cw-msg-bot:not(.sm-local)')
        const last = bots[bots.length - 1] as HTMLElement | undefined
        if (last) logEmmaReply(last.innerText)
      }, 400)
    }
    const uninstall = installRoutineInterception()
    resumeLocalInterview()
    window.addEventListener('quincer:done', onDone)
    const first = setTimeout(() => later(0), 4000)
    // hide Emma's interview state tokens as soon as they appear (also while a reply streams in)
    let box: Element | null = null
    const obs = new MutationObserver(() => { if (box) { hideStateTokens(box); hideSideMarks(box) } })
    const attach = setInterval(() => {
      const found = document.querySelector('.cw-messages')
      if (found && found !== box) {
        box = found
        obs.disconnect()
        obs.observe(box, { childList: true, subtree: true, characterData: true })
        hideStateTokens(box)
      }
    }, 1000)
    return () => { uninstall(); window.removeEventListener('quincer:done', onDone); clearTimeout(t); clearTimeout(first); clearInterval(attach); obs.disconnect() }
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
