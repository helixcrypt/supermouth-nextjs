'use client'

/**
 * Product cards for Emma's routine recommendation, drawn by the page.
 *
 * Why: Quincer drops a reply that makes several tool calls, and showing one product card per
 * person through Quincer's own tool pushed a family recommendation over that limit. So Emma
 * now makes one call (routine_recommend) and the page shows the cards: it reads the state
 * token at the end of Emma's reply, asks /api/routine-cards for the same systems the tool
 * picked, and draws one card per person under her message. After a step-down, only the
 * person whose system changed gets a new card.
 */

import { hideStateTokens, tokenFor } from './routine-buttons-client'

let shown: Record<string, string> = {}   // person -> system already shown

export function resetRoutineCards() { shown = {} }

type Card = { person: string; system: string | null; flavor?: string; floss?: string; price: number | null; url: string | null; image?: string; unavailable?: boolean; addons: { title: string; price: number; url: string; image?: string }[] }

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function money(n: number | null | undefined) { return typeof n === 'number' ? `$${n.toFixed(2)}` : '' }

function cardEl(title: string, sub: string, price: string, url: string | null, image?: string) {
  const a = document.createElement(url ? 'a' : 'div') as HTMLAnchorElement
  if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener' }
  a.className = 'sm-card'
  a.setAttribute('style', 'display:flex;gap:10px;align-items:center;padding:8px;border:1px solid rgba(0,0,0,.12);border-radius:10px;background:#fff;color:#1d2a33;text-decoration:none;margin-top:6px')
  if (image) {
    const img = document.createElement('img')
    img.src = image; img.alt = ''; img.loading = 'lazy'
    img.setAttribute('style', 'width:56px;height:56px;object-fit:contain;flex:none;border-radius:6px;background:#f6f8f9')
    a.appendChild(img)
  }
  const body = document.createElement('div')
  body.setAttribute('style', 'min-width:0;flex:1;display:flex;flex-direction:column;gap:2px;font-size:13px;line-height:1.3')
  const t = document.createElement('div'); t.textContent = title; t.setAttribute('style', 'font-weight:600')
  const s = document.createElement('div'); s.textContent = sub; s.setAttribute('style', 'color:#5b6a74')
  const row = document.createElement('div'); row.setAttribute('style', 'display:flex;justify-content:space-between;gap:8px;margin-top:2px')
  const p = document.createElement('span'); p.textContent = price; p.setAttribute('style', 'font-weight:600')
  const v = document.createElement('span'); v.textContent = url ? 'View product' : ''; v.setAttribute('style', 'color:#0f7c8c;font-weight:600')
  row.append(p, v)
  body.append(t, s, row)
  a.appendChild(body)
  return a
}

/** Draw the cards for Emma's latest recommendation under her bubble. */
export async function showRoutineCards(bot: HTMLElement, codes: string) {
  const box = document.querySelector('.cw-messages')
  if (!box || bot.nextElementSibling?.classList.contains('sm-cards')) return
  hideStateTokens(box)
  const state = tokenFor(bot)
  let people: Card[] = []
  try {
    const r = await fetch('/api/routine-cards', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
      body: JSON.stringify(state ? { state } : { routine_code: codes }),
    })
    people = (await r.json())?.people || []
  } catch { return }
  const fresh = people.filter(p => p.system && shown[p.person] !== p.system)
  if (!fresh.length || bot.nextElementSibling?.classList.contains('sm-cards')) return
  const wrap = document.createElement('div')
  wrap.className = 'sm-cards'
  wrap.setAttribute('style', 'display:flex;flex-direction:column;gap:2px;margin:4px 0 8px;max-width:92%')
  const many = people.length > 1
  for (const p of fresh) {
    shown[p.person] = p.system as string
    const sub = [many ? `For ${p.person}` : '', p.flavor, p.floss].filter(Boolean).join(' · ')
    wrap.appendChild(cardEl(p.system as string, sub, money(p.price), p.url, p.image))
    for (const a of p.addons || []) wrap.appendChild(cardEl(a.title, many ? `Add-on for ${p.person}` : 'Add-on', money(a.price), a.url, a.image))
  }
  bot.after(wrap)
  try { wrap.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) } catch { /* ignore */ }
}
