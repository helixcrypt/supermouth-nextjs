import { NextResponse } from 'next/server'
import { replay } from '@/lib/routine/replay'
import { question } from '@/lib/routine/engine'

/**
 * Public, read-only: the buttons for the routine question Emma is asking now.
 * The chat page sends the shopper's messages since the interview began and gets back the
 * same step and choices Emma's routine tool computes, so the page can show them as buttons
 * when Quincer's own reply buttons are missing. Nothing is stored or logged.
 */
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { state?: unknown; answers?: unknown; routine_code?: unknown; mode?: unknown } | null
  if (!body) return NextResponse.json({ error: 'bad request' }, { status: 400 })
  const r = replay({ state: body.state, answers: body.answers, routine_code: body.routine_code, mode: body.mode })
  const q = question(r.st)
  return NextResponse.json({ step: q.step, buttons: q.step === 'done' ? [] : q.choices }, { headers: { 'Cache-Control': 'no-store' } })
}
