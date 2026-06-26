import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Rewards Program — SuperMouth',
  description: 'Earn store credit back on every SuperMouth purchase. The more you buy, the more you save.',
}

const tiers = [
  { name: 'Starter', spend: '$0+', reward: '5% back', color: 'bg-sm-teal-bg border-sm-teal', icon: '🦷' },
  { name: 'Super', spend: '$200+', reward: '8% back', color: 'bg-sm-peach border-orange-300', icon: '⭐' },
  { name: 'SuperMouth Pro', spend: '$500+', reward: '12% back', color: 'bg-sm-yellow/20 border-sm-yellow', icon: '🏆' },
]

const ways = [
  { icon: '🛍️', title: 'Make a Purchase', desc: 'Earn store credit on every order — automatically added to your account.' },
  { icon: '📧', title: 'Sign Up for Emails', desc: 'Subscribe to our newsletter and earn bonus store credit.' },
  { icon: '🎂', title: 'Birthday Bonus', desc: 'We celebrate your birthday with a special reward just for you.' },
  { icon: '📱', title: 'Follow on Social', desc: 'Connect with us on Instagram, TikTok, or Facebook for bonus points.' },
  { icon: '⭐', title: 'Write a Review', desc: 'Share your experience and earn store credit for every approved review.' },
  { icon: '👫', title: 'Refer a Friend', desc: 'Give friends 15% off their first order and earn store credit when they buy.' },
]

export default function RewardsPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero */}
      <section className="bg-sm-navy text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-4">SuperMouth Rewards</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-4">
            Earn Up to <span className="text-sm-yellow">$75</span> in Store Credit Back
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
            Every purchase earns you store credit. The more you invest in your family's oral health, the more you get back. Lock in 15% off subscriptions for life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Start Earning Now →
            </Link>
            <Link href="/account" className="border border-white/40 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-black text-3xl text-center mb-3 text-sm-navy">Reward Tiers</h2>
        <p className="text-sm-gray text-sm text-center mb-10">The more you spend, the more you earn back on every order.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(tier => (
            <div key={tier.name} className={`rounded-2xl border-2 p-8 text-center ${tier.color}`}>
              <div className="text-4xl mb-4">{tier.icon}</div>
              <h3 className="font-display font-black text-xl mb-1 text-sm-navy">{tier.name}</h3>
              <p className="text-sm-gray text-xs mb-4">{tier.spend} annual spend</p>
              <p className="font-display font-black text-3xl text-sm-purple">{tier.reward}</p>
              <p className="text-xs text-sm-gray mt-1">on every purchase</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to earn */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-3xl text-center mb-3 text-sm-navy">Ways to Earn</h2>
          <p className="text-sm-gray text-sm text-center mb-10">More ways to rack up store credit beyond just shopping.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {ways.map(way => (
              <div key={way.title} className="bg-sm-bg rounded-2xl p-6">
                <div className="text-3xl mb-3">{way.icon}</div>
                <h3 className="font-display font-bold text-base mb-2 text-sm-navy">{way.title}</h3>
                <p className="text-sm text-sm-gray leading-relaxed">{way.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to redeem */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">How to Redeem</h2>
        <p className="text-sm-gray text-sm mb-8">Your store credit is applied automatically at checkout. No codes needed — just shop and save.</p>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { step: '1', label: 'Create an account or sign in' },
            { step: '2', label: 'Shop and earn credit automatically' },
            { step: '3', label: 'Credit applies at checkout' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 bg-sm-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-black text-sm-navy text-lg">{s.step}</span>
              </div>
              <p className="text-xs text-sm-gray leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/account" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Sign In to View Your Rewards
          </Link>
          <Link href="/shop-all" className="bg-sm-purple text-white font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
