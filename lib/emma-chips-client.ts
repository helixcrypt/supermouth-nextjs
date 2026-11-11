'use client'

/**
 * Quick-reply buttons for Emma's own (Quincer) replies, outside the routine interview.
 *
 * Quincer only sometimes draws reply buttons, and often leaves an empty button row. After each
 * Emma reply that ends in a question, the page reads the question and, when Quincer's buttons
 * are missing or empty, draws its own:
 *   - fluoride questions: Fluoride / Fluoride-free (/ Not sure)
 *   - flavor questions: the flavors named in the reply (or the standard four)
 *   - "A, B, or C?" questions: one button per choice
 *   - yes/no questions: Yes / No
 * Fluoride and flavor default to the shopper's earlier pick in this chat: that choice comes
 * first, marked "same as before". Tapping a button sends it as the shopper's message.
 */

import { startLocalInterview } from './routine-local'
import { tryCartIntent } from './emma-cart-client'

export type Fluoride = 'f' | 'ff'

const FLAVORS = ['Dubai Chocolate', 'Cool Mint', 'Mint', 'Strawberry', 'Vanilla', 'Chocolate', 'Bubblegum', 'Watermelon', 'Grape']
const FLAVOR_RE = new RegExp(`\\b(${FLAVORS.join('|')})\\b`, 'gi')
const canonFlavor = (s: string) => FLAVORS.find(f => f.toLowerCase() === s.toLowerCase()) || s

/** The shopper's (or the interview's) latest fluoride choice in this chat, newest first. */
export function priorFluoride(root?: Element | null): Fluoride | null {
  const users = userTexts(root)
  for (let i = users.length - 1; i >= 0; i--) {
    const t = users[i].toLowerCase()
    if (/fluoride[\s-]*free|no fluoride|without fluoride|non[\s-]*fluoride/.test(t)) return 'ff'
    if (/\bfluoride\b|ortho formula/.test(t) && !/not sure|recommend/.test(t)) return 'f'
  }
  return null
}

/** The latest flavor the shopper picked in this chat. */
export function priorFlavor(root?: Element | null): string | null {
  const users = userTexts(root)
  for (let i = users.length - 1; i >= 0; i--) {
    const m = users[i].match(FLAVOR_RE)
    if (m) return canonFlavor(m[m.length - 1])
  }
  return null
}

function userTexts(root?: Element | null): string[] {
  const b = root || document.querySelector('.cw-messages')
  if (!b) return []
  // answers only: skip questions and long messages, which mention fluoride or a flavor without choosing it
  return [...b.querySelectorAll('.cw-msg-user')].map(u => (u as HTMLElement).innerText.trim())
    .filter(t => t && !/\?\s*$/.test(t) && t.length <= 60)
}

// ---------- reading Emma's question ----------

interface Btn { label: string; send: string }

/** The closing question; with colons=true, only the part after a colon ("Which flavor: A, B or C?" gives "A, B or C?"). */
function lastQuestion(text: string, colons = true): string {
  const t = text.trim().replace(/\s+/g, ' ')
  if (!/\?\s*$/.test(t)) return ''
  const parts = t.split(colons ? /(?<=[.!?:])\s+/ : /(?<=[.!?])\s+/)
  return parts[parts.length - 1] || ''
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Buttons for a question, or none when it's open-ended. */
export function buttonsFor(reply: string, box?: Element | null): Btn[] {
  const q = lastQuestion(reply)
  if (!q) return []
  const ql = lastQuestion(reply, false).toLowerCase()   // the whole sentence, for spotting the topic
  const all = reply.toLowerCase()

  // fluoride
  if (/fluoride/.test(ql) && /fluoride[\s-]*free|or not|non[\s-]*fluoride/.test(ql) && !/flavor/.test(ql)) {
    const prior = priorFluoride(box)
    const list: Btn[] = [{ label: 'Fluoride', send: 'Fluoride' }, { label: 'Fluoride-free', send: 'Fluoride-free' }]
    if (prior) {
      const i = prior === 'f' ? 0 : 1
      const [p] = list.splice(i, 1)
      list.unshift({ label: `${p.label} (same as before)`, send: `${p.send}, same as before` })
    }
    if (/not sure|recommend|help me (choose|decide)/.test(ql)) list.push({ label: 'Not sure', send: 'Not sure, what do you recommend?' })
    return list
  }

  // flavor
  if (/flavou?r|taste/.test(ql) && !/^(do|does|is|are|can|could|would|should|want|shall)\b/.test(ql)) {
    let named = [...new Set((all.match(FLAVOR_RE) || []).map(canonFlavor))]
    if (named.includes('Cool Mint')) named = named.filter(f => f !== 'Mint')
    if (named.includes('Dubai Chocolate') && !/\bchocolate\b/i.test(all.replace(/dubai chocolate/gi, ''))) named = named.filter(f => f !== 'Chocolate')
    if (named.length < 2) named = ['Mint', 'Strawberry', 'Vanilla', 'Chocolate']
    const prior = priorFlavor(box)
    const hit = prior && named.find(f => f === prior || f.endsWith(prior) || prior.endsWith(f))
    const list: Btn[] = named.slice(0, 6).map(f => ({ label: f, send: f }))
    if (hit) {
      const i = list.findIndex(b => b.label === hit)
      const [p] = list.splice(i, 1)
      list.unshift({ label: `${hit} (same as before)`, send: `${hit}, same as before` })
    }
    return list
  }

  // "A, B, or C?"
  const body = q.replace(/\?\s*$/, '')
    .replace(/^(so\s+)?(would you (like|prefer|rather)|do you (want|prefer|need)|should i|shall i|want me to|can i|could i|are you (looking for|after)|is (it|this|that) for|which (one|would you like|sounds good|works))\s*(me to\s+)?(for\s+)?/i, '')
  // "do you wear braces or aligners?" is still a yes/no question: the choice didn't survive the prefix
  const stillAsking = /^(do|does|did|are|is|was|were|have|has|can|could|will|would)\b/i.test(body)
  if (!stillAsking && /\bor\b/i.test(body) && !/\bor (anything|something) else\b/i.test(body)) {
    const opts = body.split(/\s*,\s*(?:or\s+)?|\s+or\s+/i).map(s => s.replace(/^(to\s+|just\s+)/i, '').trim()).filter(Boolean)
    if (opts.length >= 2 && opts.length <= 4 && opts.every(o => o.length <= 42 && o.split(' ').length <= 7)) {
      return opts.map(o => {
        const label = /routine/i.test(o) && /build|put together|full|make/i.test(o) ? 'Build my routine' : cap(o)
        return { label, send: label }
      })
    }
  }

  // yes / no
  if (/^(so\s+)?(would|do|does|did|should|shall|can|could|is|are|was|will|want|ready|sound|shall|have|has)\b/i.test(q)) {
    return [{ label: 'Yes', send: 'Yes' }, { label: 'No', send: 'No' }]
  }
  return []
}

// ---------- drawing ----------

function shownChips(box: Element): string[] | null {
  const kids = [...box.children]
  const last = kids[kids.length - 1]
  if (!last || !last.classList.contains('cw-reply-chips')) return null
  return [...last.querySelectorAll('.cw-slot-chip')].map(b => (b.textContent || '').trim()).filter(Boolean)
}

/** After an Emma reply: draw buttons when her question has none. */
export function ensureEmmaChips() {
  const box = document.querySelector('.cw-messages')
  if (!box) return
  const bots = box.querySelectorAll('.cw-msg-bot:not(.sm-local)')
  const bot = bots[bots.length - 1] as HTMLElement | undefined
  if (!bot) return
  // only when this reply is Emma's latest word (product panels and chip rows may follow it)
  const after: Element[] = []
  for (let n = bot.nextElementSibling; n; n = n.nextElementSibling) after.push(n)
  if (after.some(n => n.classList.contains('cw-msg-user') || n.classList.contains('cw-msg-bot'))) return
  const shown = shownChips(box)
  const btns = buttonsFor(bot.innerText, box)
  // keep Quincer's buttons when it drew a real choice; a lone button ("Yes, braces or aligners" with no "No") gets ours
  if (shown && (shown.length > 1 || (shown.length === 1 && btns.length < 2))) return
  if (!btns.length) return
  if (shown && shown.length) box.querySelectorAll('.cw-reply-chips:not(.sm-emma-chips):not(.sm-routine-chips)').forEach(n => n.remove())
  box.querySelectorAll('.cw-reply-chips').forEach(n => { if (!n.querySelector('.cw-slot-chip')) n.remove() })
  const wrap = document.createElement('div')
  wrap.className = 'cw-slot-chips cw-reply-chips sm-emma-chips'
  const row = document.createElement('div')
  row.className = 'cw-slot-chips-row'
  row.style.flexWrap = 'wrap'
  for (const b of btns) {
    const el = document.createElement('button')
    el.type = 'button'
    el.className = 'cw-slot-chip'
    el.textContent = b.label
    el.addEventListener('click', e => {
      if (el.getAttribute('disabled')) return
      e.preventDefault(); e.stopPropagation()
      wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
      wrap.remove()
      const w = window as any
      if (b.send === 'Build my routine') { startLocalInterview('emma_chip'); return }
      if (tryCartIntent(b.send)) return          // "Add these to your cart": the page adds them
      // "Yes" to "Want me to add it to your cart?"
      if (b.send === 'Yes' && /\b(add|put)\b[^?]*\bcart\b[^?]*\?\s*$/i.test(bot.innerText.trim()) && tryCartIntent('Yes, add it to my cart')) return
      w.ChatWidget?.open?.(b.send)
    })
    row.appendChild(el)
  }
  wrap.appendChild(row)
  box.appendChild(wrap)
  try { wrap.scrollIntoView({ block: 'end', behavior: 'smooth' }) } catch { /* ignore */ }
}
