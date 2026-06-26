'use client'

import { useState } from 'react'
import Image from 'next/image'

const drTestimonials = [
  {
    img: 'https://cdn.supermouth.com/website/testimonial_yuko2024.jpg',
    name: 'Dr. Yuko Torigoe',
    practice: 'Harmony Dental',
    quote: 'I discovered SuperMouth at the IAOMT conference in Orlando last year while seeking the safest dental products for our holistic practice. Dr. Hoss\' lecture caught my attention, and sampling their toothpaste reassured me of its safety.',
  },
  {
    img: 'https://cdn.supermouth.com/website/testimonial_Dr_Christina_Do_2.jpg',
    name: 'Dr. Christina Do',
    practice: 'Smiles4OC',
    quote: 'My son loves to dance to the tunes of SuperMouth. We have transformed our bedtime routine from a chore to a playtime. Brushing and flossing were always met with resistance and tears from my son. But luckily for our family, we discovered SuperMouth.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_rebecca_pikos.jpg',
    name: 'Dr. Rebecca Pikos',
    practice: 'Shiny Happy Smiles',
    quote: 'As a mom of young children, I\'m conscious of the products we use in our household. As a pediatric dentist, I\'m focused on efficacy in caries reduction. Thankfully, SuperMouth offers products that pose the lowest possible risk of toxicity.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_ali_ghatri.jpg',
    name: 'Dr. Ali Ghatri',
    practice: 'Let\'s Smile Dental',
    quote: 'I am thrilled with your products! Your toothbrushes are exceptional, with soft bristles that are incredibly comforting. Your brushes made such a difference that my daughter in New York asked me to send her a box.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_cyndee_johnson.jpg',
    name: 'Dr. Cyndee Johnson',
    practice: 'Global Dental Advisor',
    quote: 'As a dental hygienist and global dental advisor with four decades of experience, I\'ve finally found a line of products I can wholeheartedly recommend to every patient.',
  },
  {
    img: 'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png',
    name: 'Dr. Joanna Theodorou & Dr. Chau McGovern',
    practice: '',
    quote: 'We chose SuperMouth because their clean products and educational materials make a big difference in how families approach dental care.',
  },
]

const VISIBLE = 3

export default function DoctorCarousel() {
  const [start, setStart] = useState(0)

  const prev = () => setStart(i => Math.max(0, i - 1))
  const next = () => setStart(i => Math.min(drTestimonials.length - VISIBLE, i + 1))

  const canPrev = start > 0
  const canNext = start < drTestimonials.length - VISIBLE

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {drTestimonials.slice(start, start + VISIBLE).map((dr, i) => (
          <div key={start + i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-white/10">
                <Image src={dr.img} alt={dr.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{dr.name}</p>
                {dr.practice && <p className="text-xs text-sm-yellow">{dr.practice}</p>}
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed italic flex-1">"{dr.quote}"</p>
          </div>
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center disabled:opacity-20 hover:bg-white/20 transition-colors border border-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        disabled={!canNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center disabled:opacity-20 hover:bg-white/20 transition-colors border border-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: drTestimonials.length - VISIBLE + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className={`h-2 rounded-full transition-all ${start === i ? 'bg-sm-yellow w-4' : 'bg-white/30 w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
