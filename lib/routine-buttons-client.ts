'use client'

/**
 * Guarantees tap buttons during Emma's routine interview.
 *
 * Quincer generates reply buttons on its own each turn and sometimes skips them or shows
 * different ones. After each Emma reply ("quincer:done"), we read the shopper's messages since
 * the interview began, ask /api/routine-buttons which question is current (same logic as Emma's
 * tool), and, if Quincer's buttons are missing or different, draw the right ones in Quincer's
 * own chip style. Tapping one sends it as the shopper's message, like Quincer's chips do.
 */

const START = /^(build my routine|find my routine|find my oral care routine|start over)$/i
const CODE_ASK = /^i have a routine code$/i
const CODE_IN_TEXT = /routine code is\s+([a-z ]+)$/i
const CODE_ONLY = /^\s*([BLKAP][FNO][MSCVX]B?\s*)+$/i

type Segment = { answers: string[]; routine_code?: string } | null

function userTexts(box: Element): string[] {
  return [...box.querySelectorAll('.cw-msg-user')].map(e => (e as HTMLElement).innerText.trim()).filter(Boolean)
}

/** The interview's answers: user messages after the last start, or after a routine code. */
export function currentSegment(msgs: string[]): Segment {
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i]
    const inText = m.match(CODE_IN_TEXT)
    if (inText) return { routine_code: inText[1].trim(), answers: msgs.slice(i + 1) }
    if (CODE_ONLY.test(m) && i > 0 && CODE_ASK.test(msgs[i - 1])) return { routine_code: m.trim(), answers: msgs.slice(i + 1) }
    if (START.test(m)) return { answers: msgs.slice(i + 1) }
    if (CODE_ASK.test(m)) return null          // waiting for the shopper to type a code
  }
  return null
}

function lastBot(box: Element): HTMLElement | null {
  const bots = box.querySelectorAll('.cw-msg-bot')
  return bots.length ? (bots[bots.length - 1] as HTMLElement) : null
}

function existingChips(box: Element): string[] | null {
  const kids = [...box.children]
  const last = kids[kids.length - 1]
  if (!last || !last.classList.contains('cw-reply-chips')) return null
  return [...last.querySelectorAll('.cw-slot-chip')].map(b => (b.textContent || '').trim())
}

function draw(box: Element, labels: string[]) {
  box.querySelectorAll('.cw-reply-chips').forEach(n => n.remove())
  const wrap = document.createElement('div')
  wrap.className = 'cw-slot-chips cw-reply-chips sm-routine-chips'
  const row = document.createElement('div')
  row.className = 'cw-slot-chips-row'
  for (const label of labels) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'cw-slot-chip'
    b.textContent = label
    b.addEventListener('click', () => {
      if (b.getAttribute('disabled')) return
      wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
      const w = window as any
      if (w.ChatWidget?.open) w.ChatWidget.open(label)
    })
    row.appendChild(b)
  }
  wrap.appendChild(row)
  box.appendChild(wrap)
  wrap.scrollIntoView({ block: 'end', behavior: 'smooth' })
}

let busy = false
export async function ensureRoutineButtons() {
  if (busy) return
  const box = document.querySelector('.cw-messages')
  if (!box) return
  const bot = lastBot(box)
  // only when Emma's latest reply is the newest message and asks something
  const kids = [...box.children].filter(k => !k.classList.contains('cw-reply-chips'))
  if (!bot || kids[kids.length - 1] !== bot || !/\?\s*$/.test(bot.innerText.trim())) return
  const seg = currentSegment(userTexts(box))
  if (!seg) return
  busy = true
  try {
    const r = await fetch('/api/routine-buttons', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seg), cache: 'no-store',
    })
    const j = await r.json()
    const labels: string[] = Array.isArray(j?.buttons) ? j.buttons.slice(0, 3) : []
    if (!labels.length) return
    // the conversation may have moved on while we were asking
    if (lastBot(box) !== bot) return
    const shown = existingChips(box)
    if (shown && shown.join('|') === labels.join('|')) return
    draw(box, labels)
  } catch { /* leave Quincer's buttons as they are */ } finally {
    busy = false
  }
}
