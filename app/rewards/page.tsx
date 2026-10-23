import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Accordion from '@/components/info/Accordion'
import { faqData } from '@/components/info/faq-data'

export const metadata = {
  title: 'Rewards & Referrals — SuperMouth',
  description: 'Earn SuperBucks every time you care for your mouth, then redeem for money off or free products.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

// Account-dependent actions (balance, referral link, redemption) live in the customer account.
const ACCOUNT = '/account'

const steps = [
  { n: '1.', title: 'join free', text: 'Join our newsletter or make your 1st purchase to automatically join.', cta: 'SIGN UP / SIGN IN', href: ACCOUNT },
  { n: '2.', title: 'earn SB', text: '1 SB for every $1 you spend.', note: '(product subtotal; excludes tax, shipping, gift cards)', cta: 'START EARNING', href: '/shop-all' },
  { n: '3.', title: 'redeem SB', text: 'take dollars off or choose a free product group.', cta: 'REDEEM SUPERBUCKS', href: ACCOUNT },
]

const earn = [
  { t: 'starter SuperBucks:', d: '+100 SB credited when you join (existing customers receive a one-time "Founding Member" +100SB)' },
  { t: 'make a purchase:', d: '1 SB per $1' },
  { t: 'subscriptions:', d: '1.25x SB on every renewal' },
  { t: 'write a verified review', d: '+50 SB (1 per order)' },
  { t: 'add photo/video to your review:', d: '+100 SB (1 per order)' },
  { t: 'take the assessment:', d: '+50 SB (one time)' },
  { t: 'bonus SB on select products:', d: 'look for the "Bonus SB" badge' },
  { t: 'birthday SB', d: '+100 SB once per year (month & year only)' },
]

const referralSteps = [
  { n: '1.', title: 'share your link', text: '(SMS, WhatsApp, Messenger, or email).', cta: 'GET MY LINK', href: ACCOUNT },
  { n: '2.', title: 'friend checks out', text: 'with $10 off applied.' },
  { n: '3.', title: 'you earn 200 SB', text: 'when their order ships.' },
]

const milestones = [
  { k: '3 Friends:', v: '300 extra SB', bg: '#F59E44' },
  { k: '5 Friends:', v: '300 extra SB', bg: '#0BAAC0' },
  { k: '10 Friends:', v: '900 extra SB', bg: BLUE },
]

const levels = [
  { l: 'Level 1:', name: 'Explorer', sb: '100 SB', off: '$5 off or', item: 'free selected item up to $9.99', bg: '#FEE81F', fg: BLUE },
  { l: 'Level 2:', name: 'Protector', sb: '500 SB', off: '$25 off or', item: 'free selected item up to $49.99', bg: '#F59E44', fg: '#FFFFFF' },
  { l: 'Level 3:', name: 'Champion', sb: '750 SB', off: '$50 off or', item: 'free selected item up to $74.99', bg: '#EC695D', fg: '#FFFFFF' },
  { l: 'Level 4:', name: 'Hero', sb: '1,000 SB', off: '$75 off or', item: 'free selected item up to $99.99', bg: '#0BAAC0', fg: '#FFFFFF' },
  { l: 'Level 5:', name: 'Legend', sb: '2,500 SB', off: '$200 off or', item: 'free selected item up to $250', bg: '#5AC3B4', fg: '#FFFFFF' },
]

const StepCard = ({ n, title, text, note, cta, href, border, numColor, linkColor }: { n: string; title: string; text: string; note?: string; cta?: string; href?: string; border: string; numColor: string; linkColor: string }) => (
  <div className="relative rounded-lg border-2 px-6 pt-8 pb-6 text-center min-h-[240px] flex flex-col" style={{ borderColor: border }}>
    <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 text-[36px] leading-[44px]" style={{ ...SCRIPT, color: numColor, background: 'inherit' }}>{n}</span>
    <h3 className="text-[22px] md:text-[24px] leading-8 font-bold">{title}</h3>
    <p className="mt-4 text-[18px] md:text-[20px] leading-7">{text}</p>
    {note && <p className="mt-1 text-[14px] leading-5 opacity-80">{note}</p>}
    {cta && href && <Link href={href} className="mt-auto pt-6 text-[16px] md:text-[18px] underline font-medium" style={{ color: linkColor }}>{cta}</Link>}
  </div>
)

export default function RewardsPage() {
  const groups = faqData.rewards
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* HERO */}
      <section className="bg-[#5AC3B2]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 grid md:grid-cols-[1fr_320px] gap-8 items-center">
          <div className="text-white">
            <h1 className="text-[40px] md:text-[48px] leading-[56px]">
              <span className="text-[#394C97]" style={SCRIPT}>rewards</span> <span className="font-bold text-[36px] md:text-[40px]">and</span> <span className="text-[#394C97]" style={SCRIPT}>referrals</span>
            </h1>
            <p className="mt-6 text-[18px] md:text-[20px] leading-7 max-w-[640px]">Earn SuperBucks (SB) every time you care for your mouth - then redeem for money off or free products. Share SuperMouth with friends to earn even more.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {[['REWARDS', '#rewards'], ['REFERRALS', '#referrals'], ['REDEEM', '#redeem']].map(([l, h]) => (
                <a key={l} href={h} className="min-w-[187px] text-center bg-[#FFE920] text-[#394C97] text-[18px] leading-7 py-2 px-6 rounded hover:opacity-90">{l}</a>
              ))}
            </div>
          </div>
          <Image src="/info/rewards-sb-coin.png" alt="SuperBucks coin" width={320} height={320} className="mx-auto w-[220px] md:w-[320px] h-auto" priority />
        </div>
      </section>

      {/* REWARDS */}
      <section id="rewards" className="text-white scroll-mt-28" style={{ background: BLUE }}>
        <div className="max-w-[1312px] mx-auto px-4 pt-6 pb-10">
          <h2 className="text-[40px] md:text-[44px] leading-[56px] text-[#F8D41B]" style={SCRIPT}>rewards</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-10 md:gap-4 [&>div]:bg-[#394C97]">
            {steps.map(s => <StepCard key={s.n} {...s} border="#F8D41B" numColor="#F8D41B" linkColor="#F8D41B" />)}
          </div>
          <h3 className="mt-10 text-center text-[28px] md:text-[30px] leading-9 font-bold">ways to earn</h3>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8">
            {earn.map(e => (
              <li key={e.t} className="flex gap-3">
                <span className="mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-full bg-[#F8D41B] text-[#394C97] text-[13px] font-bold" aria-hidden>✓</span>
                <span className="text-[16px] leading-6"><b className="block">{e.t}</b>{e.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REFERRALS */}
      <section id="referrals" className="bg-white scroll-mt-28">
        <div className="max-w-[1280px] mx-auto px-4 pt-4 pb-12 text-center">
          <h2 className="text-left text-[40px] md:text-[44px] leading-[56px] text-[#0BAAC0]" style={SCRIPT}>referrals</h2>
          <p className="text-[28px] md:text-[30px] leading-9 font-bold">refer a friend!</p>
          <p className="mt-4 text-[17px] md:text-[18px] leading-7">They&apos;ll get <b>$10 off</b> their first order of <b>$40+</b>, and you&apos;ll earn <b>200 SB</b> after their order ships.</p>
          <p className="mt-1 text-[13px] italic">First-time customers only. Free shipping on $50+ orders.</p>
          <h3 className="mt-10 text-[28px] md:text-[30px] leading-9 font-bold">how to make a referral</h3>
          <div className="mt-10 grid md:grid-cols-3 gap-10 md:gap-4 text-left [&>div]:bg-white">
            {referralSteps.map(s => <StepCard key={s.n} {...s} border="#7DCFCB" numColor="#5AC3B2" linkColor="#5AC3B2" />)}
          </div>
          <h3 className="mt-10 text-[28px] md:text-[30px] leading-9 font-bold">referral milestones</h3>
          <p className="mt-2 text-[15px] leading-6">bonuses that stack on top of your 200 SuperBucks per referral.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {milestones.map(m => (
              <div key={m.k} className="py-4 text-white text-[18px] md:text-[20px]" style={{ background: m.bg }}><b>{m.k}</b> {m.v}</div>
            ))}
          </div>
        </div>
      </section>

      {/* REDEEM */}
      <section id="redeem" className="text-white scroll-mt-28" style={{ background: BLUE }}>
        <div className="max-w-[1280px] mx-auto px-4 pt-4 pb-12 text-center">
          <h2 className="text-left text-[40px] md:text-[44px] leading-[56px] text-[#F8D41B]" style={SCRIPT}>redeem</h2>
          <p className="text-[28px] md:text-[30px] leading-9 font-bold">how to redeem SuperBucks</p>
          <p className="mt-1 text-[18px] md:text-[20px] leading-7">To redeem your SuperBucks, go to our redemption page and place your order. Below are the current redemption levels to choose from:</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {levels.map(l => (
              <div key={l.name} className="py-5 px-2" style={{ background: l.bg, color: l.fg }}>
                <p className="text-[18px] md:text-[20px] leading-7 font-bold">{l.l}<br />{l.name}</p>
                <p className="mt-3 text-[13px] leading-5">{l.sb} → {l.off}<br />{l.item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1312px] mx-auto px-4 pt-12 pb-16">
        <h2 className="text-center text-[28px] md:text-[30px] leading-9 font-bold">rewards &amp; referrals FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-x-4 gap-y-8 items-start">
          {groups.map(g => (
            <div key={g.cat}>
              <h3 className="px-4 pb-1 text-[22px] md:text-[24px] leading-8 text-[#7DCFCB] border-b-2 border-[#7DCFCB]">{g.cat}</h3>
              <Accordion items={g.items} size="md" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
