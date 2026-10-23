import Image from 'next/image'
import Link from 'next/link'
import { BLUE, SCRIPT, SplitTitle } from './ui'

type Hero = Record<string, any>

function bold(text: string, phrases: readonly string[]) {
  if (!phrases.length) return text
  const re = new RegExp(`(${phrases.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(re).map((part, i) => (phrases.includes(part) ? <b key={i}>{part}</b> : part))
}

/** Full-width 1440x388 banner image with white text on the left (collection pages). */
export function BannerHero({ hero }: { hero: Hero }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#4B79C8' }}>
      <div className="hidden md:block relative w-full aspect-[1440/388]">
        <Image src={hero.desktop} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      {hero.mobile && (
        <div className="md:hidden relative w-full aspect-square">
          <Image src={hero.mobile} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      )}
      {!hero.mobile && (
        <div className="md:hidden relative w-full aspect-[1440/388]">
          <Image src={hero.desktop} alt="" fill priority sizes="100vw" className="object-cover object-right" />
        </div>
      )}
      <div className="md:absolute inset-0 flex items-center bg-[#394C97] md:bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[182px] py-6 md:py-0 text-white">
          <div className="max-w-[500px]">
            <h1 className="text-[26px] md:text-[30px] leading-9 font-bold">
              {hero.script && <span className="font-normal text-[34px] md:text-[38px]" style={SCRIPT}>{hero.script} </span>}
              {hero.title}
            </h1>
            <p className="mt-1 text-[16px] md:text-[18px] leading-7 font-light">{hero.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Centered title (plain word + script word), wide product image, paragraph(s) below. */
export function CenteredHero({ hero, fallbackTitle, fallbackText }: { hero: Hero; fallbackTitle?: string; fallbackText?: string }) {
  const paras: string[] = hero.paras?.length ? hero.paras : fallbackText ? [fallbackText] : []
  return (
    <section className="bg-white pt-4 pb-6" style={{ color: BLUE }}>
      <SplitTitle word={hero.word ?? ''} script={hero.script ?? fallbackTitle ?? ''} />
      {hero.desktop && (
        <div className="max-w-[1280px] mx-auto mt-4 px-4">
          <div className="hidden md:block relative w-full aspect-[1280/384]">
            <Image src={hero.desktop} alt="" fill priority sizes="1280px" className="object-contain" />
          </div>
          <div className="md:hidden relative w-full aspect-[4/3]">
            <Image src={hero.mobile ?? hero.desktop} alt="" fill priority sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
      {hero.side && (
        <div className="relative mx-auto mt-6 w-[260px] h-[245px] rounded-xl overflow-hidden">
          <Image src={hero.side} alt="" fill sizes="260px" className="object-cover" />
        </div>
      )}
      <div className="max-w-[1280px] mx-auto px-4 mt-4 space-y-4">
        {paras.map(p => <p key={p.slice(0, 20)} className="text-center text-[17px] md:text-[20px] leading-7">{bold(p, hero.bold ?? [])}</p>)}
      </div>
    </section>
  )
}

/** Shop All: banner image with "your ultimate / oral care destination" overlay. */
export function ShopAllHero({ hero }: { hero: Hero }) {
  return (
    <section className="relative w-full bg-[#0AA3DC]">
      <div className="hidden md:block relative w-full aspect-[1440/388]">
        <Image src={hero.desktop} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="md:hidden relative w-full aspect-square">
        <Image src={hero.mobile} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 flex items-start md:items-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[182px] pt-8 md:pt-0">
          <h1 className="text-[26px] md:text-[30px] leading-9 font-bold" style={{ color: BLUE }}>
            {hero.line1}
            <span className="block font-normal text-white text-[30px] md:text-[34px]" style={SCRIPT}>{hero.line2}</span>
          </h1>
          <p className="mt-2 max-w-[500px] text-[15px] md:text-[18px] leading-7 font-light text-white hidden sm:block">{hero.text}</p>
        </div>
      </div>
    </section>
  )
}

/** Shop All Kids: blue band with text left, brand video right. */
export function KidsHero({ hero }: { hero: Hero }) {
  return (
    <section className="bg-[#394C97] text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-[26px] md:text-[30px] leading-9 font-bold">
            {hero.title} <span className="text-[18px] md:text-[20px] font-medium whitespace-nowrap">{hero.titleSmall}</span>
          </h1>
          <p className="mt-5 text-[16px] md:text-[18px] leading-7 font-light">{hero.text}</p>
        </div>
        <div>
          <video className="w-full aspect-video bg-black" controls playsInline preload="none" poster={hero.poster}>
            <source src={hero.video} type="video/mp4" />
          </video>
          <p className="mt-4 text-[18px] leading-7 font-bold text-[#F8D41B]">{hero.ctaTitle}</p>
          <p className="text-[18px] leading-7 font-light text-[#F8D41B]">
            <Link href="/play" className="underline">{hero.ctaLink}</Link>
          </p>
          <p className="text-[18px] leading-7 font-light text-[#F8D41B]">{hero.ctaText}</p>
        </div>
      </div>
    </section>
  )
}
