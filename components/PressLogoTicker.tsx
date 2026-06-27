'use client'

import Image from 'next/image'

// All 38 logos in order matching the original ticker
const logos = [
  { name: 'Indy Week', file: 'indy-week.png' },
  { name: 'USA Today', file: 'usa-today.png' },
  { name: 'CNN', file: 'cnn.png' },
  { name: 'Tamron Hall', file: 'tamron-hall.png' },
  { name: 'US News', file: 'us-news.png' },
  { name: 'WebMD', file: 'webmd.png' },
  { name: 'Healthline', file: 'healthline.png' },
  { name: 'Parents', file: 'parents.png' },
  { name: 'Good Housekeeping', file: 'good-housekeeping.png' },
  { name: 'Today', file: 'today.png' },
  { name: 'Prevention', file: 'prevention.png' },
  { name: 'Entrepreneur', file: 'entrepreneur.png' },
  { name: 'HuffPost', file: 'huffpost.png' },
  { name: 'Forbes', file: 'forbes.png' },
  { name: 'Allure', file: 'allure.png' },
  { name: 'Scary Mommy', file: 'scary-mommy.png' },
  { name: 'Health', file: 'health-magazine.png' },
  { name: 'Bustle', file: 'bustle.png' },
  { name: 'Business Insider', file: 'business-insider.png' },
  { name: 'Cheddar', file: 'cheddar.png' },
  { name: 'BuzzFeed', file: 'buzzfeed.png' },
  { name: 'Fox News', file: 'fox-news.png' },
  { name: 'CNET', file: 'cnet.png' },
  { name: 'Refinery29', file: 'refinery29.png' },
  { name: 'Cosmopolitan', file: 'cosmopolitan.png' },
  { name: 'Seventeen', file: 'seventeen.png' },
  { name: 'PopSugar', file: 'popsugar.png' },
  { name: "Woman's World", file: 'womans-world.png' },
  { name: 'The Doctors', file: 'doctors.png' },
  { name: 'Dentistry Today', file: 'dentistry-today.png' },
  { name: 'Inside Edition', file: 'inside-edition.png' },
  { name: 'MSN', file: 'msn.png' },
  { name: "Men's Journal", file: 'mens-journal.png' },
  { name: 'NBC', file: 'nbc.png' },
  { name: 'New Beauty', file: 'new-beauty.png' },
  { name: 'CBS', file: 'cbs.png' },
  { name: 'ABC', file: 'abc.png' },
  { name: 'Well+Good', file: 'well-good.png' },
]

// 38 logos × ~1 sec each = 38s total duration
const DURATION = 38

export default function PressLogoTicker() {
  return (
    <div className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <style>{`
        @keyframes press-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .press-ticker-track {
          animation: press-ticker ${DURATION}s linear infinite;
          will-change: transform;
        }
        .press-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="press-ticker-track flex items-center gap-12 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {/* Double the logos so the loop is seamless */}
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 120, height: 48 }}
          >
            <Image
              src={`/press-logos/${logo.file}`}
              alt={logo.name}
              width={120}
              height={48}
              className="object-contain max-h-10 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
