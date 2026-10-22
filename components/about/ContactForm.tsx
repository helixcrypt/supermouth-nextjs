'use client'

import { useState } from 'react'

// Shown so visitors can still reach SuperMouth if the form isn't configured yet.
export const SUPPORT_EMAIL = 'support@supermouth.com'

const field = 'mt-2 w-full rounded-lg border border-[#394C97] bg-white px-3 py-2 text-[16px] text-[#394C97] outline-none focus:ring-2 focus:ring-[#5AC3B2]'
const label = 'block text-[16px] font-bold'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending'); setError('')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const j = await r.json().catch(() => ({}))
      if (r.ok && j.ok) { setState('sent'); return }
      setError(j.error || 'Your message could not be sent.')
      setState('error')
    } catch {
      setError('Your message could not be sent.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="mt-10 rounded-xl border border-[#5AC3B2] bg-[#5AC3B2]/10 p-8 text-center">
        <p className="text-[22px] font-bold">Thanks for reaching out!</p>
        <p className="mt-2 text-[18px]">Your message was sent. We&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="mt-14 space-y-8" noValidate={false}>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Name</label>
          <input id="c-name" name="name" required value={form.name} onChange={set('name')} className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email Address</label>
          <input id="c-email" name="email" type="email" required value={form.email} onChange={set('email')} className={field} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className={label}>Subject</label>
        <input id="c-subject" name="subject" required value={form.subject} onChange={set('subject')} className={field} />
      </div>
      <div>
        <label htmlFor="c-message" className={label}>Message</label>
        <textarea id="c-message" name="message" required rows={3} value={form.message} onChange={set('message')} className={`${field} resize-y`} />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button disabled={state === 'sending'} className="rounded-lg bg-[#FFE920] px-6 py-2 text-[18px] font-bold text-[#394C97] hover:opacity-90 disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        <p className="text-[15px]">Prefer email? <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold underline">{SUPPORT_EMAIL}</a></p>
      </div>
      {state === 'error' && (
        <p role="alert" className="rounded-lg bg-[#EC6A5E]/10 border border-[#EC6A5E] px-4 py-3 text-[15px] text-[#B23A2F]">
          {error} Please email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold underline">{SUPPORT_EMAIL}</a> instead.
        </p>
      )}
    </form>
  )
}
