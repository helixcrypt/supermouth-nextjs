'use client'

import { useState } from 'react'

const reviews = [
  { name: 'Nikki_Oh', stars: 5, text: 'My mom-in law got a sample pack for my very picky son at a convention. He has always hated brushing his teeth. We started with the chocolate, which he loved! He ended up loving them all, even the mint! Haven\'t been able to get him to try mint until now!! I love that it\'s more natural than the other stuff. It made brushing teeth so much more enjoyable for the whole family!' },
  { name: 'Patrick F.', stars: 5, text: 'I have been using SuperMouth Hydroxamin with fluoride MouthWash for a year and have received comments from my dentist on how much better my teeth look and did I change anything in my dental hygiene. Just Supermouth toothpaste and Mouthwash and she was amazed, as am I!' },
  { name: 'Kathy B.', stars: 5, text: 'I just received my box and tried out the manual toothbrush...let me tell you it hugs your teeth to get them clean is the best way to describe it! Way different than any other toothbrush I\'ve used and I\'m a bit of a tooth fanatic. This is going to make it so much easier for my youngest child to cleaner teeth.' },
  { name: 'Jacqui C.', stars: 5, text: 'I can\'t believe this is good for you. Can\'t be. I look forward to it like a milkshake! Hard not to swallow LOL. Very awesome mouthwash.' },
  { name: 'Mariana B.', stars: 5, text: 'My dentist recommended this line of products because I\'ve suffered from Sjögren\'s syndrome since I was a child. My mouth has absolutely no saliva. These products immediately improve my mouth chemistry.' },
  { name: 'Tamara T.', stars: 5, text: 'I have been looking for the holy Grail of toothpastes for my picky son, and I think I found it! This is such a great toothpaste. I love the combination of fluoride and hydroxyapatite. I gave up toothpastes with SLS years ago due to sensitivity. I am going to replace it with SuperMouth!' },
  { name: 'John B.', stars: 5, text: 'First do no harm. Vit D in toothpaste? Awesome. No potential carcinogens.' },
  { name: 'Sarah M.', stars: 5, text: 'We love SuperMouth! My kids actually ask to brush their teeth now. The chocolate flavor is their absolute favorite and I love that the ingredients are safe and clean.' },
  { name: 'Dr. Lisa H.', stars: 5, text: 'As a dental hygienist, I\'m very selective about what I recommend. SuperMouth checks every box — safe ingredients, effective formulas, and kids actually enjoy using them. I recommend it to all my patients.' },
]

const VISIBLE = 3

export default function ReviewCarousel() {
  const [start, setStart] = useState(0)

  const prev = () => setStart(i => Math.max(0, i - 1))
  const next = () => setStart(i => Math.min(reviews.length - VISIBLE, i + 1))

  const canPrev = start > 0
  const canNext = start < reviews.length - VISIBLE

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {reviews.slice(start, start + VISIBLE).map((review, i) => (
          <div key={start + i} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: review.stars }).map((_, j) => (
                <span key={j} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-sm text-sm-gray leading-relaxed mb-4 italic flex-1">"{review.text}"</p>
            <p className="text-sm font-bold text-sm-navy">— {review.name}</p>
          </div>
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 hover:bg-sm-bg transition-colors border border-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        disabled={!canNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 hover:bg-sm-bg transition-colors border border-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: reviews.length - VISIBLE + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className={`h-2 rounded-full transition-all ${start === i ? 'bg-sm-teal w-4' : 'bg-gray-300 w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
