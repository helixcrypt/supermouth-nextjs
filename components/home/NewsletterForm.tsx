'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      setState(r.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') return <p className="text-[18px] text-[#FFE920] font-bold">Thanks! You&apos;re on the list.</p>

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-4">
      <label htmlFor="home-email" className="sr-only">Email address</label>
      <input
        id="home-email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Address"
        className="w-[228px] rounded border border-white bg-transparent px-3 py-1 text-[16px] text-white placeholder-white/70 outline-none focus:border-[#FFE920]"
      />
      <button disabled={state === 'sending'} className="rounded-lg bg-[#FFE920] px-3 py-2 text-[18px] font-bold text-[#394C97] hover:opacity-90 disabled:opacity-60">
        {state === 'sending' ? 'Signing up…' : 'Sign Up'}
      </button>
      {state === 'error' && <p className="w-full text-[14px] text-[#FFB4A8]">Something went wrong. Please try again.</p>}
    </form>
  )
}
