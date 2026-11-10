'use client'

/**
 * Keeps Emma's product panels to the shopper's age stage.
 *
 * Quincer's product panel shows search results without checking the stage, so an adult asking
 * for a toothbrush also saw kids' brushes. For each panel, the page finds the stage the chat was
 * about just before it (the newest message that names exactly one stage) and hides cards whose
 * product isn't tagged for that stage. Stages come from the product cards file
 * (lib/product-stages.json, built from SuperMouth_Quincer_Product_Cards.csv "Age stages").
 * Products not in the file are always shown. If no stage is clear, nothing is hidden.
 *
 * B baby/toddler, L little kids 2 to 5, K big kids 6 to 12, A teen/adult 13+, P pregnancy, O ortho
 */

import STAGES from './product-stages.json'

const map: Record<string, string> = { ...(STAGES as Record<string, string>) }

// Data corrections, pending SuperMouth's confirmation (product cards list these for Teen/Adult,
// but the product itself is sold as a kids' brush).
map['dr-hoss-smile-sidekick-toothbrush'] = 'LK'

type Stage = 'B' | 'L' | 'K' | 'A' | 'P'

const CUES: [Stage, RegExp][] = [
  ['P', /\bpregnan(t|cy)\b|expecting a baby/i],
  ['B', /\b(baby|babies|infant|toddler|teething|newborn|0 ?(to|-) ?(2|24)|\d{1,2} ?months? old)\b/i],
  ['L', /\b(little kids?|preschool(er)?|ages? 2 ?(to|-) ?5|\(2-5\))\b/i],
  ['K', /\b(big kids?|ages? 6 ?(to|-) ?12|\(6-12\)|under 13)\b/i],
  ['A', /\b(teen\/adult|teens? and adults?|adults?|teen(s|age|agers?)?|13\+|myself|for me|my (husband|wife|partner|boyfriend|girlfriend|mom|dad|mother|father))\b/i],
]

function ageStage(n: number): Stage { return n < 2 ? 'B' : n <= 5 ? 'L' : n <= 12 ? 'K' : 'A' }

/** The one stage a message names, or null when it names none or several. */
export function stageOf(text: string): Stage | null {
  // Emma asking which stage doesn't settle it
  if (/\b(which|what|different) (stage|age)|age range|how old/i.test(text)) return null
  const found = new Set<Stage>()
  const age = text.match(/\b(\d{1,2})[- ]?(?:years?|yrs?)[- ]?old\b|\b(?:is|aged?|age)\s+(\d{1,2})\b/i)
  if (age) found.add(ageStage(Number(age[1] || age[2])))
  for (const [s, re] of CUES) if (re.test(text)) found.add(s)
  // "my teenage son" or "my 15 year old" settle it even if a child word appears too
  if (found.has('A') && /\bteen/i.test(text)) { found.delete('K'); found.delete('L') }
  return found.size === 1 ? [...found][0] : null
}

function stageBefore(panel: Element): Stage | null {
  for (let n = panel.previousElementSibling; n; n = n.previousElementSibling) {
    if (!n.classList.contains('cw-msg')) continue
    const s = stageOf((n as HTMLElement).innerText || '')
    if (s) return s
  }
  return null
}

function handleOf(card: Element): string | null {
  const a = card.querySelector('a[href*="/products/"]') as HTMLAnchorElement | null
  const m = a?.href.match(/\/products\/([^/?#]+)/)
  return m ? decodeURIComponent(m[1]) : null
}

/** Hide product cards that don't fit the stage the chat is about. */
export function filterPanels(root: Element) {
  root.querySelectorAll('.cw-product-panel').forEach(panel => {
    const stage = stageBefore(panel)
    const cards = [...panel.querySelectorAll('.cw-product-card')] as HTMLElement[]
    let shown = 0
    for (const card of cards) {
      const h = handleOf(card)
      const tags = h ? map[h] : undefined
      // pregnancy also covers adult products; teen/adult also covers pregnancy-only adult items
      const fits = !stage || !tags || tags.includes(stage) || (stage === 'P' && tags.includes('A'))
      const want = fits ? '' : 'none'
      if (card.style.display !== want) card.style.display = want
      if (fits) shown++
    }
    const p = panel as HTMLElement
    const want = cards.length && !shown ? 'none' : ''
    if (p.style.display !== want) p.style.display = want
  })
}
