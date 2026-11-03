'use client'

import { startLocalInterview, startCodeEntry, startFromCode } from './routine-local'

/** Messages a page can open Emma with. The routine interview starts on these. */
export const EMMA_BUILD_ROUTINE = 'Build my routine'
export const EMMA_HAVE_CODE = 'I have a routine code'

/**
 * Open the Emma chat widget and send a message as the shopper.
 * The widget script loads after the page, so wait for it (up to ~10 seconds).
 */
export function openEmma(message: string, source = 'menu') {
  if (typeof window === 'undefined') return
  // the routine interview runs on the page, inside Emma's window
  if (message === EMMA_BUILD_ROUTINE) { startLocalInterview(source); return }
  if (message === EMMA_HAVE_CODE) { startCodeEntry(source); return }
  const withCode = message.match(/^My routine code is ([A-Za-z ]+)$/)
  if (withCode) { startFromCode(withCode[1].trim(), source === 'link' ? 'code_link' : source); return }
  const w = window as any
  let tries = 0
  // ChatWidget exists as soon as the script loads, but open() does nothing until the
  // widget has fetched its config and built its window, so wait for that window.
  const go = () => {
    const ready = w.ChatWidget && typeof w.ChatWidget.open === 'function' && document.querySelector('.cw-messages')
    if (ready) {
      try { w.ChatWidget.open(message) } catch { /* not ready yet */ }
      // confirm it opened; otherwise try again shortly
      setTimeout(() => { if (!document.querySelector('.cw-open') && ++tries < 60) go() }, 400)
      return
    }
    if (++tries < 60) setTimeout(go, 250)
  }
  go()
}

/** Routine codes are letters only (e.g. "AFM KNS"); keep anything else out of the chat. */
export function cleanRoutineCode(raw: string | null): string {
  return (raw || '').toUpperCase().replace(/[^A-Z ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40)
}
