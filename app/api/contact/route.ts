import { NextResponse } from 'next/server'

/**
 * Contact form delivery.
 * supermouth.com's own contact form has no submit handler, so there is nothing to mirror.
 * Set CONTACT_WEBHOOK_URL (e.g. a Zapier/Make/Slack/Formspree webhook) in Vercel to receive
 * submissions as JSON. Until then the form reports that it isn't configured and shows the email fallback.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null
  const str = (k: string) => (typeof body?.[k] === 'string' ? (body[k] as string).trim().slice(0, 5000) : '')
  const data = { name: str('name'), email: str('email'), subject: str('subject'), message: str('message') }

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: 'Please fill in your name, a valid email address, and a message.' }, { status: 400 })
  }

  const hook = process.env.CONTACT_WEBHOOK_URL
  if (!hook) {
    return NextResponse.json({ ok: false, error: 'The contact form is not configured yet.' }, { status: 503 })
  }

  try {
    const r = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'contact-form', receivedAt: new Date().toISOString() }),
      cache: 'no-store',
    })
    if (!r.ok) throw new Error(String(r.status))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Your message could not be delivered.' }, { status: 502 })
  }
}
