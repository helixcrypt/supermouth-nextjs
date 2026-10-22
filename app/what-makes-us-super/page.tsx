import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { home } from '@/lib/home-data'
import { Page, Hero, Script, YellowLink, BLUE } from '@/components/about/ui'

export const metadata = {
  title: 'What Makes Us S.U.P.E.R. — SuperMouth',
  description: 'Revolutionizing oral care with safe, effective, and fun products for healthier, happier lives.',
}

export default function WhatMakesUsSuperPage() {
  return (
    <Page>
      {/* Hero */}
      <Hero bg="#B9D7E3" img="/about/super-WhySuperMouthHeader.jpg" alt="SuperMouth product lineup">
        <h1 className="text-[26px] md:text-[30px] leading-9 font-bold">
          revolutionizing oral care with <Script color="#fff" className="text-[34px]">safe</Script>,{' '}
          <Script color="#fff" className="text-[34px]">effective</Script>, and <Script color="#fff" className="text-[34px]">fun</Script> products for healthier, happier lives
        </h1>
        <p className="mt-6 text-[18px] leading-7 font-light">founded by dentists who could not find the right oral care products -so they invented them!</p>
        <YellowLink href="/our-story" className="mt-5">Read Our Story</YellowLink>
      </Hero>

      {/* S.U.P.E.R. cards */}
      <section className="pt-10 pb-6">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">
          We&apos;re transforming oral care into<br className="hidden md:block" /> mouthcare by making it S.U.P.E.R.
        </h2>
        <p className="mt-6 text-center text-[18px] md:text-[20px] leading-7 px-4">click each of the letters to find out why!</p>
        <div className="max-w-[1312px] mx-auto mt-10 px-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {home.superCards.map(c => (
            <Link key={c.href} href={c.href} className="group block p-3" style={{ background: BLUE }}>
              <div className="flex flex-col h-full border border-[#FBD116] px-3 pt-3 pb-5 text-center text-white">
                <Image src={c.img} alt={c.alt} width={224} height={131} className="mx-auto w-[224px] h-auto" />
                <p className="mt-2 text-[12px] leading-4">{c.text}</p>
                <span className="mt-auto pt-8 text-[12px] text-[#FBD116] group-hover:underline">READ MORE</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sustainability panel */}
      <section className="relative overflow-hidden bg-[#FBD089] lg:min-h-[527px] lg:flex lg:items-center">
        <div className="relative h-[220px] sm:h-[300px] lg:absolute lg:inset-0 lg:h-auto">
          <Image src="/about/super-WhySuperMouthSustainabilityPanel.jpg" alt="SuperMouth sustainability" fill sizes="100vw" className="object-cover object-[65%_center]" />
        </div>
        <div className="relative w-full max-w-[1440px] mx-auto px-4 lg:pl-[44px] py-8 lg:py-12">
          <div className="max-w-[780px]">
            <h2 className="text-[26px] md:text-[30px] leading-9 font-bold">SuperMouth Sustainability Initiative</h2>
            <p className="mt-4 text-[18px] leading-7 font-light">At SuperMouth, we are dedicated to sustainability through environmentally safe ingredients, eco-friendly packaging, and innovated product designs. Our commitment includes using low-hazard ingredients, recyclable materials, and renewable energy sources.</p>
            <p className="mt-2 text-[20px] leading-7 font-bold">Learn more about SuperMouth&apos;s sustainability</p>
            <YellowLink href="/sustainability" className="mt-6">Learn More</YellowLink>
          </div>
        </div>
      </section>

      {/* Assessment panel */}
      <section className="relative overflow-hidden bg-[#0BAAC0] lg:min-h-[388px] lg:flex lg:items-center">
        <div className="relative h-[220px] sm:h-[300px] lg:absolute lg:inset-0 lg:h-auto">
          <Image src="/about/super-WhySuperMouthAssessmentPanel.jpg" alt="Family smiling" fill sizes="100vw" className="object-cover object-[75%_center]" />
        </div>
        <div className="relative w-full max-w-[1440px] mx-auto px-4 lg:pl-[132px] py-8 lg:py-12 text-white">
          <div className="max-w-[600px]">
            <h2 className="text-[26px] md:text-[30px] leading-9 font-bold">we think your mouth is one of your greatest assets</h2>
            <p className="mt-6 text-[18px] leading-7 font-light max-w-[480px]">take our assessment for each family member to see what are the best products for you</p>
            <YellowLink href="/assessment" className="mt-5">How Super Are Your Mouths</YellowLink>
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  )
}
