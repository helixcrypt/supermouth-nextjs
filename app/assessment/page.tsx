'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'who',
    question: 'Who are you shopping for?',
    options: [
      { label: '👶 Baby (0–2 years)', value: 'baby' },
      { label: '🧒 Little Kid (2–5 years)', value: 'little-kid' },
      { label: '🧒 Big Kid (6–12 years)', value: 'big-kid' },
      { label: '🧑 Teen or Adult (13+)', value: 'teen-adult' },
      { label: '🤰 Pregnant or Nursing', value: 'pregnancy' },
      { label: '🦷 Someone with Braces/Aligners', value: 'ortho' },
    ],
  },
  {
    id: 'concern',
    question: 'What\'s your biggest oral care concern?',
    options: [
      { label: '😬 Cavities', value: 'cavities' },
      { label: '🦷 Sensitive teeth', value: 'sensitivity' },
      { label: '😮 Bad breath', value: 'breath' },
      { label: '🌟 Whitening', value: 'whitening' },
      { label: '🩸 Gum health', value: 'gums' },
      { label: '🧪 Clean/safe ingredients', value: 'clean' },
    ],
  },
  {
    id: 'fluoride',
    question: 'What\'s your fluoride preference?',
    options: [
      { label: '✅ Fluoride is fine', value: 'fluoride' },
      { label: '🌿 I prefer non-fluoride', value: 'non-fluoride' },
      { label: '🤷 No preference / not sure', value: 'either' },
    ],
  },
]

const RECOMMENDATIONS: Record<string, { system: string; href: string; desc: string }> = {
  'baby': { system: 'Teething to 24 Months System', href: '/systems/teething-to-24-months', desc: 'Safe teethers, ultra-soft brushes, and Hydroxamin® toothpaste — everything for your baby\'s first smile.' },
  'little-kid': { system: 'Ages 2–5 System', href: '/systems/2-to-5', desc: 'Fun flavors, pH-balanced formulas, and character brushes — making oral care an adventure for little ones.' },
  'big-kid': { system: 'Ages 6–12 System', href: '/systems/6-to-12', desc: 'Musical brushes, augmented reality, and dentist-curated formulas — supporting the transition to permanent teeth.' },
  'teen-adult': { system: 'Teens & Adults System', href: '/systems/teens-and-adults', desc: 'Patented SuperBristles, complete nutrient-rich care, and advanced technology for confident smiles.' },
  'pregnancy': { system: 'Pregnancy System', href: '/systems/pregnancy', desc: 'pH-balanced, Hydroxamin® enriched, and safe through every trimester — designed for you and your baby.' },
  'ortho': { system: 'Orthodontics System', href: '/systems/orthodontics', desc: 'Ortho-specific toothbrush, OrthoFloss with threader, and formulas that prevent white spot lesions.' },
}

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const currentQ = QUESTIONS[step]
  const recommendation = RECOMMENDATIONS[answers['who']] ?? RECOMMENDATIONS['teen-adult']

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  const restart = () => {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Personalized Recommendation</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Find Your Perfect System</h1>
          <p className="text-sm-gray text-sm">Answer 3 quick questions and we'll recommend the best SuperMouth system for you.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!done ? (
          <div>
            {/* Progress */}
            <div className="flex gap-2 mb-10">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-sm-accent' : 'bg-white/10'}`} />
              ))}
            </div>

            <p className="text-xs text-sm-gray uppercase tracking-widest mb-3">Question {step + 1} of {QUESTIONS.length}</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-8">{currentQ.question}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="text-left bg-white/5 border border-white/10 hover:border-sm-accent hover:bg-sm-accent/5 rounded-xl p-4 text-sm font-semibold transition-all"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-6 text-xs text-sm-gray hover:text-white transition-colors">
                ← Back
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-6">🦷</div>
            <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Your Recommendation</p>
            <h2 className="font-display font-black text-3xl mb-4">{recommendation.system}</h2>
            <p className="text-sm-gray text-sm leading-relaxed mb-8 max-w-md mx-auto">{recommendation.desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={recommendation.href}
                className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                View My System →
              </Link>
              <Link
                href="/shop-all"
                className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
            <button onClick={restart} className="mt-6 text-xs text-sm-gray hover:text-white transition-colors block mx-auto">
              Start over
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
