'use client'

import Image from 'next/image'

const logos = [
  { name: 'Indy Week', file: 'indy-week-logo.png' },
  { name: 'USA Today', file: 'USA-Today-logo.png' },
  { name: 'CNN', file: 'cnn-logo.png' },
  { name: 'Tamron Hall', file: 'Tamron_Hall-logo.png' },
  { name: 'US News', file: 'us-news-logo.png' },
  { name: 'WebMD', file: 'Webmd-logo.png' },
  { name: 'Healthline', file: 'Healthline-Logo.png' },
  { name: 'Parents', file: 'Parents-Magazine-Logo.png' },
  { name: 'Good Housekeeping', file: 'Good-Housekeeping-Logo.png' },
  { name: 'Today', file: 'Today-logo.png' },
  { name: 'Prevention', file: 'Prevention-Logo.png' },
  { name: 'Entrepreneur', file: 'Entrepreneur-Logo.png' },
  { name: 'HuffPost', file: 'huffington-post-logo.png' },
  { name: 'Forbes', file: 'Forbes-Logo.png' },
  { name: 'Allure', file: 'allure-logo.png' },
  { name: 'Scary Mommy', file: 'Scary-Mommy-logo.png' },
  { name: 'Health', file: 'Health-Magazine-Logo.png' },
  { name: 'Bustle', file: 'Bustle-logo.png' },
  { name: 'Business Insider', file: 'Business-insider-logo.png' },
  { name: 'Cheddar', file: 'Cheddar-News-Logo.png' },
  { name: 'BuzzFeed', file: 'BuzzFeed-logo.png' },
  { name: 'Fox News', file: 'Fox-News-logo.png' },
  { name: 'CNET', file: 'CNET-Logo.png' },
  { name: 'Refinery29', file: 'Refinery29-logo.png' },
  { name: 'Cosmopolitan', file: 'Cosmopolitan.png' },
  { name: 'Seventeen', file: '17-logo.png' },
  { name: 'PopSugar', file: 'PopSugar-Logo.png' },
  { name: "Woman's World", file: 'Womans-World-logo.png' },
  { name: 'The Doctors', file: 'Doctors-logo.png' },
  { name: 'Dentistry Today', file: 'Dentistry-Today-logo.png' },
  { name: 'Inside Edition', file: 'Inside-Edition-Logo.png' },
  { name: 'MSN', file: 'MSN-Logo.png' },
  { name: "Men's Journal", file: 'Mens_Journal-logo.png' },
  { name: 'NBC', file: 'NBC-Logo.png' },
  { name: 'New Beauty', file: 'NewBeauty_Logo.png' },
  { name: 'CBS', file: 'CBS-logo.png' },
  { name: 'ABC', file: 'ABC-Logo.png' },
  { name: 'Well+Good', file: 'well+good-logo.png' },
]

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
      <div className="press-ticker-track flex items-center gap-12 whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-shrink-0 flex items-center justify-center" style={{ width: 120, height: 48 }}>
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
