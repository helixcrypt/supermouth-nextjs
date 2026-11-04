'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

/**
 * Size and flavor switches for a System that Emma's routine put in the cart.
 * The line carries the person's routine code (_code) and System size (_size); a change asks
 * /api/routine-system for the matching in-stock System and swaps the cart line, keeping "For".
 * Keys that start with "_" are hidden from the shopper at checkout.
 */
type Attr = { key: string; value: string }

const FLAVOR: Record<string, string> = { M: 'Mint', S: 'Strawberry', V: 'Vanilla', C: 'Chocolate' }

export default function SystemLineControls({ lineId, attributes }: { lineId: string; attributes: Attr[] }) {
  const { addItem, removeItem } = useCart()
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')
  const get = (k: string) => attributes.find(a => a.key === k)?.value || ''
  const code = get('_code').toUpperCase()
  const size = get('_size')
  if (!code || code.length < 3) return null

  const bracket = code[0]
  const sizes = bracket === 'B' ? [] : bracket === 'L' ? ['Complete', 'Basic'] : ['Complete', 'Plus', 'Basic']
  const flavors = bracket === 'B' || bracket === 'L' ? ['S', 'V', 'C'] : ['M', 'S', 'V', 'C']

  async function swap(newCode: string, newSize: string) {
    if (busy) return
    setBusy(true); setNote('')
    try {
      const r = await fetch('/api/routine-system', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
        body: JSON.stringify({ people: [{ code: newCode, tier: newSize || 'Complete' }] }),
      })
      const p = (await r.json())?.people?.[0]
      if (!p || p.error) { setNote('That one is out of stock right now.'); return }
      const attrs = attributes.map(a => a.key === '_code' ? { ...a, value: newCode } : a.key === '_size' ? { ...a, value: p.tier } : a)
      await removeItem(lineId)
      await addItem(p.gid, 1, attrs, true)
      if (p.tier !== newSize && newSize) setNote(`${newSize} is out of stock, so this is the ${p.tier}.`)
    } catch {
      setNote("Couldn't change it just now. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const chip = (on: boolean) => `text-[11px] px-2 py-0.5 rounded-full border ${on ? 'border-sm-accent text-sm-accent' : 'border-white/20 text-sm-gray hover:text-white'} disabled:opacity-50`

  return (
    <div className="mt-2 space-y-1">
      {sizes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {sizes.map(s => (
            <button key={s} disabled={busy || s === size} onClick={() => swap(code, s)} className={chip(s === size)}>{s}</button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {flavors.map(f => (
          <button key={f} disabled={busy || code[2] === f} onClick={() => swap(code.slice(0, 2) + f + code.slice(3), size)} className={chip(code[2] === f)}>{FLAVOR[f]}</button>
        ))}
      </div>
      {note && <p className="text-[11px] text-sm-gray">{note}</p>}
    </div>
  )
}
