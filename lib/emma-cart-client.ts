'use client'

/**
 * Add to cart from Emma's chat.
 *
 * Quincer can't touch the shopper's cart, so Emma used to send shoppers to the product page.
 * The page does it instead, with the same Shopify cart as the site's cart drawer (window.__smCart):
 *   1. Typed requests ("add the SuperBrush to my cart", "add it", "add both") are handled here
 *      and never reach Quincer. "It" means the product Emma just named or showed.
 *   2. Each card in Emma's product panel gets an "Add to cart" button.
 * Products with flavors or sizes use the shopper's earlier pick in this chat, or ask with buttons.
 * Every outcome is said in the chat: what was added, or why it wasn't and a link to the product.
 */

import TITLES from './product-titles.json'
import { priorFlavor } from './emma-chips-client'

const titles = TITLES as Record<string, string>
const w = () => window as any
const box = () => document.querySelector('.cw-messages')

const TO_CART = /\b(add|put|throw|pop|place|stick)\b.*\b(cart|basket|bag)\b/i
const ADD_IT = /\badd (it|that|this|them|these|those|both|all|everything)\b|\b(buy|order|purchase) (it|that|this|them|these|those|both)\b/i
const ADD_NAMED = /^\s*(please\s+)?(add|buy|order)\b/i
const PLURAL = /\b(them|these|those|both|all( of them| three| two)?|everything)\b/i

// ---------- chat bubbles (same look as the routine interview) ----------

function esc(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}
function scrollEnd(el: Element) { try { el.scrollIntoView({ block: 'end', behavior: 'smooth' }) } catch { /* ignore */ } }
function removeChips() { box()?.querySelectorAll('.cw-reply-chips').forEach(n => n.remove()) }
function bubble(html: string, cls: 'bot' | 'user' = 'bot') {
  const b = box(); if (!b) return
  removeChips()
  const d = document.createElement('div')
  d.className = `cw-msg cw-msg-${cls} sm-local`
  if (cls === 'bot') {
    const ref = b.querySelector('.cw-msg-bot[style]') as HTMLElement | null
    if (ref) d.setAttribute('style', ref.getAttribute('style') || '')
    d.innerHTML = html
  } else d.textContent = html
  b.appendChild(d); scrollEnd(d)
}
const say = (md: string) => bubble(esc(md).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'))
function chips(list: [string, () => void][]) {
  const b = box(); if (!b) return
  removeChips()
  const wrap = document.createElement('div'); wrap.className = 'cw-slot-chips cw-reply-chips sm-cart-chips'
  const row = document.createElement('div'); row.className = 'cw-slot-chips-row'; row.style.flexWrap = 'wrap'
  for (const [label, on] of list) {
    const el = document.createElement('button'); el.type = 'button'; el.className = 'cw-slot-chip'; el.textContent = label
    el.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      if (el.getAttribute('disabled')) return
      wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
      bubble(label, 'user'); on()
    })
    row.appendChild(el)
  }
  wrap.appendChild(row); b.appendChild(wrap); scrollEnd(wrap)
}

// ---------- products ----------

interface Variant { id: string; title: string; availableForSale: boolean; selectedOptions: { name: string; value: string }[]; price: { amount: string } }
interface Product { title: string; handle: string; variants: Variant[] }

async function fetchProduct(handle: string): Promise<Product | null> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token) return null
  try {
    const r = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
      body: JSON.stringify({
        query: 'query($h:String!){product(handle:$h){title handle variants(first:50){nodes{id title availableForSale selectedOptions{name value} price{amount}}}}}',
        variables: { h: handle },
      }),
    })
    const p = (await r.json())?.data?.product
    return p ? { title: p.title, handle: p.handle, variants: p.variants.nodes } : null
  } catch { return null }
}

const productUrl = (h: string) => `/products/${h}`
const linkTo = (h: string, t: string) => `<a href="${esc(productUrl(h))}" class="sm-cart-link" style="text-decoration:underline">${esc(t)}</a>`

const STOP = new Set(['supermouth', 'the', 'and', 'with', 'for', 'a', 'of', 'to', '&', '-', '—', 'system', 'toothpaste', 'toothbrush'])
const TYPES = ['toothpaste', 'toothbrush', 'floss', 'mouthwash', 'spray', 'brush heads', 'teether', 'scraper', 'cleaner', 'bundle', 'system']
const words = (s: string) => s.toLowerCase().replace(/[™®]/g, '').split(/[^a-z0-9+]+/).filter(Boolean)

/** Products named in a piece of text, best matches first. */
export function productsNamed(text: string): string[] {
  const t = ` ${words(text).join(' ')} `
  // a product type the shopper names ("floss") rules out titles of another type
  const types = TYPES.filter(x => t.includes(` ${x}`))
  const hits: [string, number, number][] = []   // handle, share of key words matched, key words matched
  for (const [h, title] of Object.entries(titles)) {
    const all = words(title)
    if (types.length && !types.some(x => ` ${all.join(' ')}`.includes(` ${x}`))) continue
    if (t.includes(` ${all.join(' ')} `)) { hits.push([h, 1, 99]); continue }   // full title
    const key = all.filter(x => !STOP.has(x))
    if (key.length < 1) continue
    const got = key.filter(x => t.includes(` ${x} `)).length
    const score = got / key.length
    if (score >= 0.5) hits.push([h, score, got])
  }
  hits.sort((a, b) => b[1] - a[1] || b[2] - a[2])
  // only the best matches: a full name beats a partial one
  const [, best, bestGot] = hits[0] || [, 0, 0]
  hits.splice(0, hits.length, ...hits.filter(x => x[1] === best && x[2] === bestGot))
  // drop a product whose title is contained in a better match's title ("Mouthwash" inside "Mouthwash Variety Bundle")
  const out: string[] = []
  for (const [h] of hits) if (!out.some(o => titles[o].toLowerCase().includes(titles[h].toLowerCase()))) out.push(h)
  return out
}

/** Narrow a set of cards to the ones the chat was about (fluoride or not, braces, bundle, kind of product). */
export function narrow(handles: string[], context: string): string[] {
  const c = context.toLowerCase()
  const ff = /fluoride[\s-]*free|no fluoride|without fluoride/.test(c)
  const f = !ff && /\bwith fluoride\b|\bfluoride (toothpaste|mouthwash|floss|version|formula)\b/.test(c)
  const ortho = /\b(braces|aligners?|ortho)\b/.test(c) && !/\b(no|not|without|isn'?t|aren'?t)\b[^.]{0,20}\b(braces|aligners?)\b/.test(c)
  const bundle = /\b(bundle|variety|sampler|4[\s-]*flavou?r|kit)\b/.test(c)
  const kinds = TYPES.filter(x => c.includes(x))
  const out = handles.filter(h => {
    const t = (titles[h] || h.replace(/-/g, ' ')).toLowerCase()
    if (ff && /fluoride/.test(t) && !/fluoride[\s-]*free|non[\s-]*fluoride/.test(t)) return false
    if (f && /fluoride[\s-]*free|non[\s-]*fluoride/.test(t)) return false
    if (!ortho && /\b(ortho|braces|aligners)\b/.test(t)) return false
    if (!bundle && /\b(bundle|variety)\b/.test(t)) return false
    if (kinds.length && !kinds.some(k => t.includes(k))) return false
    return true
  })
  return out.length ? out : handles
}

/** What "it" means: products in Emma's latest reply, else the cards she just showed, narrowed by the chat. */
function recentProducts(): string[] {
  const b = box(); if (!b) return []
  const kids = [...b.children]
  const text = (el: Element) => ((el as HTMLElement).innerText || '')
  for (let i = kids.length - 1; i >= 0; i--) {
    const el = kids[i]
    if (el.classList.contains('cw-msg-user')) continue
    if (el.classList.contains('cw-msg-bot')) {
      const named = productsNamed(text(el))
      if (named.length) return named
    }
    if (el.classList.contains('cw-product-panel')) {
      const shown = [...el.querySelectorAll('.cw-product-card')].filter(c => (c as HTMLElement).style.display !== 'none')
      const hs = shown.map(c => (c.querySelector('a[href*="/products/"]') as HTMLAnchorElement | null)?.href.match(/\/products\/([^/?#]+)/)?.[1]).filter(Boolean).map(h => decodeURIComponent(h!)) as string[]
      if (!hs.length) continue
      // the shopper's request and Emma's reply around this panel
      const ctx: string[] = []
      for (let j = i - 1; j >= 0 && ctx.length < 2; j--) if (kids[j].classList.contains('cw-msg')) ctx.push(text(kids[j]))
      return narrow(hs, ctx.join('\n'))
    }
  }
  return []
}

// ---------- adding ----------

const optionNames = (p: Product) => [...new Set(p.variants.flatMap(v => v.selectedOptions.filter(o => o.value !== 'Default Title').map(o => o.name)))]

function matchFlavor(values: string[]): string | null {
  const f = priorFlavor()
  if (!f) return null
  return values.find(v => v.toLowerCase() === f.toLowerCase()) || values.find(v => v.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(v.toLowerCase())) || null
}

/** Pick a variant, asking the shopper about each option that still has a choice. */
function chooseVariant(p: Product, picked: Record<string, string>, done: (v: Variant) => void) {
  const avail = p.variants.filter(v => v.availableForSale)
  const left = avail.filter(v => v.selectedOptions.every(o => !picked[o.name] || picked[o.name] === o.value))
  if (!left.length) {
    say(`Sorry, **${p.title}** isn't in stock in that choice right now.`)
    return
  }
  for (const name of optionNames(p)) {
    if (picked[name]) continue
    const values = [...new Set(left.map(v => v.selectedOptions.find(o => o.name === name)?.value).filter(Boolean) as string[])]
    if (values.length <= 1) { if (values[0]) picked[name] = values[0]; continue }
    if (/flavou?r|scent|taste/i.test(name)) {
      const m = matchFlavor(values)
      if (m) { picked[name] = m; continue }
    }
    say(`Which ${name.toLowerCase()} for the **${p.title}**?`)
    chips(values.slice(0, 8).map(v => [v, () => { picked[name] = v; chooseVariant(p, picked, done) }] as [string, () => void]))
    return
  }
  const v = left.find(x => x.selectedOptions.every(o => !picked[o.name] || picked[o.name] === o.value)) || left[0]
  done(v)
}

export async function addProduct(handle: string, then?: () => void) {
  const p = await fetchProduct(handle)
  const name = titles[handle] || handle
  if (!p) {
    bubble(`I couldn't reach the store just now, so nothing was added. You can add it from its page: ${linkTo(handle, name)}.`)
    return then?.()
  }
  if (!p.variants.some(v => v.availableForSale)) {
    bubble(`**${esc(p.title)}** is out of stock right now, so I couldn't add it. ${linkTo(handle, 'See the product page')} for when it's back.`)
    return then?.()
  }
  chooseVariant(p, {}, async v => {
    const cart = w().__smCart
    try {
      if (!cart?.addItem) throw new Error('no cart')
      await cart.addItem(v.id, 1, [], false)
      const opt = v.title && v.title !== 'Default Title' ? ` (${v.title})` : ''
      say(`Added **${p.title}${opt}** to your cart, $${Number(v.price.amount).toFixed(2)}.`)
      if (then) return then()
      chips([['View my cart', () => w().__smCart?.openCart?.()], ['Keep shopping', () => say('Sounds good. Ask me anything, or tell me what else you need.')]])
    } catch {
      bubble(`Something went wrong adding **${esc(p.title)}**, so it isn't in your cart. You can add it from its page: ${linkTo(handle, p.title)}.`)
      then?.()
    }
  })
}

async function addMany(handles: string[]) {
  const list = handles.slice(0, 4)
  const next = (i: number) => {
    if (i >= list.length) {
      chips([['View my cart', () => w().__smCart?.openCart?.()], ['Keep shopping', () => say('Sounds good. Ask me anything, or tell me what else you need.')]])
      return
    }
    addProduct(list[i], () => next(i + 1))
  }
  next(0)
}

/** A typed or tapped message asking to add something to the cart. True when the page handled it. */
export function isCartRequest(text: string, named = productsNamed(text)): boolean {
  if (/\b(remove|take out|delete|empty)\b/i.test(text)) return false
  if (/\?\s*$/.test(text) && !/^\s*(can|could|will|would) you (please )?(add|put)\b/i.test(text)) return false
  return TO_CART.test(text) || ADD_IT.test(text) || (ADD_NAMED.test(text) && named.length > 0)
}

export function tryCartIntent(text: string, echo = true): boolean {
  const named = productsNamed(text)
  if (!isCartRequest(text, named)) return false
  const recent = named.length ? [] : recentProducts()
  if (echo) bubble(text, 'user')
  if (named.length === 1) { addProduct(named[0]); return true }
  if (named.length > 1) {
    if (PLURAL.test(text) || /\band\b/i.test(text)) { addMany(named); return true }
    say('Which one should I add?')
    chips(named.slice(0, 6).map(h => [titles[h], () => addProduct(h)] as [string, () => void]))
    return true
  }
  if (recent.length === 1) { addProduct(recent[0]); return true }
  if (recent.length > 1) {
    if (PLURAL.test(text)) { addMany(recent); return true }
    say('Which one should I add?')
    chips(recent.slice(0, 6).map(h => [titles[h], () => addProduct(h)] as [string, () => void]))
    return true
  }
  say("Happy to add it. Which product? Tell me its name, or tap **Add to cart** on any product card I show you.")
  return true
}

/** Emma (Quincer) doesn't know the page can add to the cart; correct her when she says she can't. */
export function fixCartClaims(root: Element) {
  root.querySelectorAll('.cw-msg-bot:not(.sm-local)').forEach(bot => {
    const t = bot.textContent || ''
    if (!/(can'?not|can'?t|unable to|not able to)[^.]*\b(add|put)[^.]*\bcart\b/i.test(t)) return
    const walker = document.createTreeWalker(bot, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const n of nodes) {
      const v = n.nodeValue || ''
      // the whole sentence, up to a colon ("...but you can add it from its page:") or its end
      const next = v.replace(/[^.!?:\n]*\b(can'?not|can['’]?t|unable to|not able to)\b[^.!?:\n]*\b(add|put)\b[^.!?:\n]*\bcart\b[^.!?:\n]*[:.!?]?/i,
        'Tap Add to cart on the product card, or just say "add it to my cart" and I\'ll do it.')
      if (next !== v) { n.nodeValue = next; break }
    }
  })
}

// ---------- "Add to cart" on Emma's product cards ----------

export function decorateCards(root: Element) {
  root.querySelectorAll('.cw-product-card:not([data-sm-cart])').forEach(card => {
    const a = card.querySelector('a[href*="/products/"]') as HTMLAnchorElement | null
    const h = a?.href.match(/\/products\/([^/?#]+)/)?.[1]
    card.setAttribute('data-sm-cart', '1')
    if (!h) return
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'sm-card-add'
    btn.textContent = 'Add to cart'
    btn.setAttribute('style', 'display:block;width:calc(100% - 12px);margin:4px 6px 6px;padding:5px 0;border-radius:8px;border:1px solid currentColor;background:transparent;font:inherit;font-size:12px;font-weight:600;cursor:pointer')
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      bubble(`Add the ${titles[decodeURIComponent(h)] || card.querySelector('.cw-product-title')?.textContent || 'item'} to my cart`, 'user')
      addProduct(decodeURIComponent(h))
    })
    card.appendChild(btn)
  })
  // our own product links open in place, keeping the chat
  root.querySelectorAll('a.sm-cart-link:not([data-sm])').forEach(a => {
    a.setAttribute('data-sm', '1')
    a.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      window.dispatchEvent(new CustomEvent('sm:navigate', { detail: (a as HTMLAnchorElement).href }))
    }, true)
  })
}
