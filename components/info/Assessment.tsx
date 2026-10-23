'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { quizData } from '@/components/info/quiz-data'

/*
 * SuperMouth oral care assessment.
 * Questions, options and result content were captured from supermouth.com's assessment.
 * Scoring runs entirely in the browser: the stage is chosen with the same rules the
 * original uses (pregnancy > braces > age band), and each advice card is chosen by
 * whether the related answers lean to the first or last options.
 */

type Who = 'Me' | 'Child' | 'Spouse' | 'Other'
type Step = 'who' | 'name' | 'birthday' | 'pregnant' | 'dueDate' | 'braces' | 'bracesDate' | 'questions' | 'result'

const CORAL = '#EC6A5D'
const BRIGHT = '#0BAAC0'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const SYSTEM_PAGE: Record<number, string> = {
  1: '/systems/pregnancy', 3: '/systems/orthodontics', 5: '/systems/teething-to-24-months',
  6: '/systems/2-to-5', 7: '/systems/6-to-12', 8: '/systems/teens-and-adults',
}

// Which question categories feed each result card (keyword match on the question category).
const CARD_KEYWORDS: [RegExp, RegExp][] = [
  [/visit|check/i, /visit|check-?up/i],
  [/cavit|decalc/i, /cavit|decalc/i],
  [/sensitiv/i, /sensitiv/i],
  [/gum/i, /gum/i],
  [/discolor/i, /discolor|whiten/i],
  [/toothbrush/i, /toothbrush|brushing/i],
  [/toothpaste/i, /toothpaste/i],
  [/floss/i, /floss/i],
  [/mouthwash/i, /mouthwash/i],
  [/spray|post-meal/i, /post-meal|spray/i],
  [/breath|tongue/i, /breath|tongue/i],
  [/morning/i, /morning/i],
  [/nutrient/i, /vitamin|nutrient/i],
  [/teeth?ing/i, /teeth?ing|teether/i],
  [/accessor/i, /accessor|routine|habit|fun|engag/i],
]

const fill = (s: string, name: string) => s.replace(/\{name\}/g, name || 'your child')

const Btn = ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} className="w-full max-w-[240px] rounded-md py-2 text-white text-[20px] md:text-[24px] font-medium hover:opacity-90 disabled:opacity-40" style={{ background: CORAL }}>
    {children}
  </button>
)

function MonthYear({ month, year, setMonth, setYear }: { month: number; year: string; setMonth: (m: number) => void; setYear: (y: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <label className="flex flex-col text-left text-[14px]" style={{ color: BRIGHT }}>Month
        <select value={month} onChange={e => setMonth(Number(e.target.value))} className="mt-1 w-[180px] rounded border border-gray-300 px-3 py-2 text-[16px] text-[#394C97]">
          <option value={0}>Select</option>
          {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
        </select>
      </label>
      <label className="flex flex-col text-left text-[14px]" style={{ color: BRIGHT }}>Year
        <input inputMode="numeric" maxLength={4} value={year} onChange={e => setYear(e.target.value.replace(/\D/g, ''))} placeholder="YYYY" className="mt-1 w-[120px] rounded border border-gray-300 px-3 py-2 text-[16px] text-[#394C97]" />
      </label>
    </div>
  )
}

export default function Assessment() {
  const [step, setStep] = useState<Step>('who')
  const [history, setHistory] = useState<Step[]>([])
  const [who, setWho] = useState<Who>('Me')
  const [takerName, setTakerName] = useState('')
  const [forName, setForName] = useState('')
  const [bMonth, setBMonth] = useState(0)
  const [bYear, setBYear] = useState('')
  const [pregnant, setPregnant] = useState(false)
  const [ortho, setOrtho] = useState(false)
  const [dMonth, setDMonth] = useState(0)
  const [dYear, setDYear] = useState('')
  const [qi, setQi] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const isMe = who === 'Me'
  const subject = isMe ? takerName : forName

  const ageMonths = useMemo(() => {
    const y = parseInt(bYear, 10)
    if (!bMonth || !y) return -1
    const now = new Date()
    return now.getMonth() - (bMonth - 1) + 12 * (now.getFullYear() - y)
  }, [bMonth, bYear])

  const stage = useMemo(() => {
    if (pregnant) return isMe ? 1 : 2
    if (ortho) return isMe ? 3 : 4
    if (ageMonths <= 23) return 5
    if (ageMonths <= 71) return 6
    if (ageMonths <= 155) return 7
    return isMe ? 8 : 9
  }, [pregnant, ortho, ageMonths, isMe])

  const questions: { cat: string; q: string; options: string[] }[] = quizData.stages[stage] ?? []

  const go = (next: Step) => { setHistory(h => [...h, step]); setStep(next) }
  const back = () => {
    if (step === 'questions' && qi > 0) { setQi(qi - 1); setAnswers(a => a.slice(0, -1)); return }
    setHistory(h => { const prev = h[h.length - 1]; if (prev) setStep(prev); return h.slice(0, -1) })
  }
  const restart = () => {
    setStep('who'); setHistory([]); setTakerName(''); setForName(''); setBMonth(0); setBYear('')
    setPregnant(false); setOrtho(false); setDMonth(0); setDYear(''); setQi(0); setAnswers([])
  }

  const afterBirthday = () => {
    if (ageMonths >= 156 && who !== 'Child') go('pregnant')
    else if (ageMonths >= 72) go('braces')
    else { setQi(0); setAnswers([]); go('questions') }
  }

  const answer = (idx: number) => {
    const a = [...answers.slice(0, qi), idx]
    setAnswers(a)
    if (qi + 1 < questions.length) setQi(qi + 1)
    else go('result')
  }

  const validDate = (m: number, y: string) => m > 0 && /^\d{4}$/.test(y)

  // ── Result ──────────────────────────────────────────────
  const result = useMemo(() => {
    if (step !== 'result') return null
    const track: number = quizData.track[stage]
    const runs = quizData.results[track]
    const first = runs.first, last = runs.last ?? runs.first
    const scoreFor = (re: RegExp) => {
      const idx = questions.map((q, i) => (re.test(q.cat) ? i : -1)).filter(i => i >= 0 && answers[i] !== undefined)
      if (!idx.length) return 0
      return idx.reduce((s, i) => s + answers[i] / Math.max(1, questions[i].options.length - 1), 0) / idx.length
    }
    const cats: string[] = []
    for (const s of [...first.sections, ...last.sections]) if (!cats.includes(s.cat)) cats.push(s.cat)
    const cards = cats.map(cat => {
      const rule = CARD_KEYWORDS.find(([r]) => r.test(cat))
      const lean = rule ? scoreFor(rule[1]) : 0
      const preferred = lean >= 0.5 ? last : first
      const fallback = lean >= 0.5 ? first : last
      return preferred.sections.find((s: any) => s.cat === cat) ?? fallback.sections.find((s: any) => s.cat === cat)
    }).filter(Boolean)
    // Kids' systems switch to fluoride when answers lean to higher cavity risk on the original; mirror that with the cavity questions.
    const cavityLean = scoreFor(/cavit|decalc/i)
    const sysRun = cavityLean >= 0.5 ? last : first
    return { track, config: first.config, systems: sysRun.systems as any[], cards }
  }, [step, stage, questions, answers])

  // ── Render ──────────────────────────────────────────────
  const shell = (body: React.ReactNode) => (
    <div className="max-w-[760px] mx-auto px-4 pt-6 pb-16 text-center">
      {step !== 'who' && (
        <div className="flex justify-between mb-6">
          {history.length > 0 || qi > 0 ? (
            <button onClick={back} className="rounded-3xl border-2 px-4 py-1 text-[15px]" style={{ borderColor: BRIGHT, color: BRIGHT }}>Back</button>
          ) : <span />}
          <button onClick={restart} className="rounded-3xl border-2 px-4 py-1 text-[15px]" style={{ borderColor: BRIGHT, color: BRIGHT }}>Start Over</button>
        </div>
      )}
      {body}
    </div>
  )

  if (step === 'who') return shell(
    <>
      <p className="text-[26px] md:text-[30px] leading-9 font-bold" style={{ color: CORAL }}>LET&apos;S GET STARTED!</p>
      <p className="mt-4 text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>Who is this assessment for?</p>
      <div className="mt-8 flex flex-col items-center gap-8">
        {(['Me', 'Child', 'Spouse', 'Other'] as Who[]).map(w => <Btn key={w} onClick={() => { setWho(w); go('name') }}>{w}</Btn>)}
      </div>
    </>
  )

  if (step === 'name') return shell(
    <form onSubmit={e => { e.preventDefault(); if (takerName && (isMe || forName)) go('birthday') }} className="flex flex-col items-center gap-6">
      <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>What is your name?</p>
      <input autoFocus value={takerName} onChange={e => setTakerName(e.target.value)} placeholder="Name" className="w-full max-w-[320px] rounded border border-gray-300 px-3 py-2 text-[16px] text-[#394C97]" />
      {!isMe && (
        <>
          <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>What is your {who === 'Child' ? "child's" : who === 'Spouse' ? "spouse's" : "family member's"} name?</p>
          <input value={forName} onChange={e => setForName(e.target.value)} placeholder="Name" className="w-full max-w-[320px] rounded border border-gray-300 px-3 py-2 text-[16px] text-[#394C97]" />
        </>
      )}
      <Btn onClick={() => { if (takerName && (isMe || forName)) go('birthday') }} disabled={!takerName || (!isMe && !forName)}>Next</Btn>
    </form>
  )

  if (step === 'birthday') return shell(
    <div className="flex flex-col items-center gap-6">
      <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>{isMe ? 'When is your birthday?' : `When is ${subject}'s birthday?`}</p>
      <MonthYear month={bMonth} year={bYear} setMonth={setBMonth} setYear={setBYear} />
      {validDate(bMonth, bYear) && ageMonths < 0 && <p className="text-[14px]" style={{ color: CORAL }}>Please enter a date in the past.</p>}
      <Btn onClick={afterBirthday} disabled={!validDate(bMonth, bYear) || ageMonths < 0}>Next</Btn>
    </div>
  )

  if (step === 'pregnant') return shell(
    <div className="flex flex-col items-center gap-8">
      <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>{isMe ? 'Are you currently pregnant?' : `Is ${subject} currently pregnant?`}</p>
      <Btn onClick={() => { setPregnant(true); go('dueDate') }}>Yes</Btn>
      <Btn onClick={() => { setPregnant(false); go('braces') }}>No/Not Applicable</Btn>
    </div>
  )

  if (step === 'dueDate' || step === 'bracesDate') return shell(
    <div className="flex flex-col items-center gap-6">
      <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>{step === 'dueDate' ? 'When is your expected due date?' : 'When is your expected completion date?'}</p>
      <MonthYear month={dMonth} year={dYear} setMonth={setDMonth} setYear={setDYear} />
      <Btn onClick={() => { setQi(0); setAnswers([]); go('questions') }} disabled={!validDate(dMonth, dYear)}>Next</Btn>
    </div>
  )

  if (step === 'braces') return shell(
    <div className="flex flex-col items-center gap-8">
      <p className="text-[20px] md:text-[24px] leading-8 font-bold" style={{ color: BRIGHT }}>{isMe ? 'Do you currently have braces?' : `Does ${subject} currently have braces?`}</p>
      <Btn onClick={() => { setOrtho(true); go('bracesDate') }}>Yes</Btn>
      <Btn onClick={() => { setOrtho(false); setQi(0); setAnswers([]); go('questions') }}>No</Btn>
    </div>
  )

  if (step === 'questions') {
    const q = questions[qi]
    if (!q) return shell(<p>Loading…</p>)
    return shell(
      <div className="flex flex-col items-center">
        <div className="w-full h-2 rounded-full bg-gray-200 mb-6 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${((qi) / questions.length) * 100}%`, background: BRIGHT }} /></div>
        <p className="text-[22px] md:text-[26px] leading-8 font-bold" style={{ color: CORAL }}>{q.cat}</p>
        <p className="mt-3 text-[18px] md:text-[22px] leading-7 font-semibold" style={{ color: BRIGHT }}>{fill(q.q, subject)}</p>
        <div className="mt-8 flex flex-col items-center gap-5 w-full">
          {q.options.map((o, i) => <Btn key={o} onClick={() => answer(i)}>{fill(o, subject)}</Btn>)}
        </div>
        <p className="mt-6 text-[13px] text-gray-500">Question {qi + 1} of {questions.length}</p>
      </div>
    )
  }

  // RESULT
  if (!result) return null
  const main = result.systems[0]
  const name = subject
  return (
    <div className="pb-16">
      <div className="relative max-w-[1280px] mx-auto text-white text-center px-6 md:px-16 pt-12 pb-20" style={{ background: BRIGHT }}>
        <button onClick={restart} className="absolute right-4 top-4 rounded-3xl bg-white px-3 py-1 text-[13px]" style={{ color: BRIGHT }}>Start Over</button>
        <p className="text-[22px] md:text-[24px] font-bold">{fill(result.config['1'] ?? 'YOU DID IT!', name)}</p>
        <p className="mt-4 text-[15px] md:text-[16px] leading-7">{fill(result.config['2'] ?? '', name)}</p>
        <svg className="absolute -bottom-px left-0 w-full" viewBox="0 0 360 30" preserveAspectRatio="none" height="40" aria-hidden><path d="M0 30V10c70 22 140 22 200 6s110-14 160 0v14z" fill="white" /></svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 text-center">
        <p className="mt-8 text-[20px] md:text-[22px] font-bold" style={{ color: BRIGHT }}>{fill(result.config['3'] ?? 'PERSONALIZED ORAL CARE RECOMMENDATIONS', name)}</p>
        <p className="mt-3 text-[15px] md:text-[16px] leading-7" style={{ color: BRIGHT }}>{fill(result.config['4'] ?? '', name)}</p>

        {main && (
          <div className="mt-8 flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {main.img && <Image src={main.img} alt={main.name} width={380} height={300} className="w-[300px] md:w-[380px] h-auto object-contain" />}
              <p className="text-[18px] leading-7 font-semibold" style={{ color: BRIGHT }}>As low as<br />${main.monthly.toFixed(2)}<br />a month</p>
            </div>
            <p className="mt-4 text-[17px] font-bold" style={{ color: BRIGHT }}>{main.name}</p>
            <p className="text-[15px]" style={{ color: BRIGHT }}>{main.level}</p>
            <Link href={SYSTEM_PAGE[result.track]} className="mt-5 inline-block rounded-md px-10 py-2 text-white text-[18px] font-medium hover:opacity-90" style={{ background: CORAL }}>Buy Now</Link>
            {result.systems.length > 1 && (
              <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[900px]">
                {result.systems.map(s => (
                  <Link key={s.level + s.name} href={SYSTEM_PAGE[result.track]} className="rounded-xl border-2 p-4 hover:shadow-md" style={{ borderColor: BRIGHT, color: '#394C97' }}>
                    <p className="font-bold">{s.level}</p>
                    <p className="text-[14px]">${s.monthly.toFixed(2)}/month subscription</p>
                    <p className="text-[14px]">${s.oneTime.toFixed(2)} one-time</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <hr className="mt-10 border-t-2" style={{ borderColor: BRIGHT }} />
        <p className="mt-6 text-[18px] md:text-[20px] font-semibold" style={{ color: BRIGHT }}>{fill(result.config['5'] ?? '', name)}</p>
        <div className="mt-6 space-y-3 text-left">
          {result.cards.map((c: any) => (
            <div key={c.cat} className="flex gap-4 rounded-md p-4" style={{ background: c.color, color: c.text || '#fff' }}>
              {c.img ? <Image src={c.img} alt="" width={56} height={72} className="w-12 md:w-14 h-auto self-start shrink-0" /> : <span className="w-12 md:w-14 shrink-0" />}
              <div>
                <p className="text-[18px] md:text-[20px] font-bold">{c.cat}</p>
                {c.results.map((r: string) => <p key={r.slice(0, 40)} className="mt-2 text-[14px] md:text-[15px] leading-6">{fill(r, name)}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
