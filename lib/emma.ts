'use client'

/** Messages a page can open Emma with. The routine interview starts on these. */
export const EMMA_BUILD_ROUTINE = 'Build my routine'
export const EMMA_HAVE_CODE = 'I have a routine code'

/**
 * Open the Emma chat widget and send a message as the shopper.
 * The widget script loads after the page, so wait for it (up to ~10 seconds).
 */
export function openEmma(message: string) {
  if (typeof window === 'undefined') return
  const w = window as any
  let tries = 0
  const go = () => {
    if (w.ChatWidget && typeof w.ChatWidget.open === 'function') {
      try { w.ChatWidget.open(message) } catch { /* widget not ready yet */ }
      return
    }
    if (++tries < 50) setTimeout(go, 200)
  }
  go()
}

/** Routine codes are letters only (e.g. "AFM KNS"); keep anything else out of the chat. */
export function cleanRoutineCode(raw: string | null): string {
  return (raw || '').toUpperCase().replace(/[^A-Z ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40)
}
