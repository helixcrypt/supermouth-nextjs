import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Subscription Benefits — SuperMouth',
  description: 'SuperMouth subscriptions provide an easy way to make sure you always have the products you need.',
}

const benefits = [
  {
    img: '/cdn/sub-best-value.jpg',
    title: 'Best Value and Convenience',
    desc: 'Unlock guaranteed lowest prices on essential oral care products and ensure you never run out with timely deliveries. Enjoy consistent savings on your favorite oral care products delivered right to your doorstep, ensuring you always have what you need when you need it.',
  },
  {
    img: '/cdn/sub-auto-adjust.jpg',
    title: 'Auto-Adjust',
    desc: 'Seamlessly transition through various ages and stages with our adaptive system recommendations. Our subscription service takes into account the changing needs of your family members, automatically recommending and adjusting to the next suitable system as they progress through different ages and stages of life.',
  },
  {
    img: '/cdn/sub-peace.jpg',
    title: 'Peace of Mind',
    desc: 'Trust in safe, effective, and enjoyable products for every family member. Rest assured knowing that our subscription service provides high-quality oral care products curated by leading dentists and medical experts, ensuring they are safe, effective, and enjoyable for the entire family.',
  },
  {
    img: '/cdn/sub-advisor.jpg',
    title: 'Personal Oral Care Advisor',
    desc: 'Immerse yourself in educational and entertaining content to enhance your oral care routine, and receive personalized support from dedicated dental professionals. Each family is assigned a dental professional who can provide oral care advice within 24 hours. (Note: We do not provide medical advice.)',
  },
  {
    img: '/cdn/sub-cancel.jpg',
    title: 'Hassle-Free Cancellation and Adjustment',
    desc: 'Embrace the freedom to modify or cancel your subscription at any time post-payment. Whether adjusting the frequency of deliveries or switching between system levels, our service is designed to flex with you. Cancel or modify your plan anytime after payment.',
  },
  {
    img: '/cdn/sub-discount.jpg',
    title: 'Discount on Accessories and Free Shipping',
    desc: 'Access exclusive discounts on essential accessories based on your subscription tier, and enjoy complimentary shipping on complete system subscriptions and/or purchases over $50.',
  },
]

const faqs = [
  { q: 'What makes subscribing to SuperMouth different from just purchasing products individually?', a: 'Subscribers lock in a 15% discount for life, get auto-adjusted recommendations as your family ages, free shipping on qualifying orders, access to a personal oral care advisor, and the convenience of never running out of products.' },
  { q: 'How does the auto-adjust feature work with the subscription?', a: 'As your family members grow and move through different life stages, our system automatically recommends the next appropriate oral care system — so you never have to wonder what to order next.' },
  { q: 'Can I modify or cancel my subscription at any time?', a: 'Yes. You can skip a delivery, change your frequency, switch products, or cancel anytime after payment — no phone calls or hoops to jump through. Just log in to your account.' },
  { q: 'What kind of support can I expect from my personal oral care advisor?', a: 'Each subscribing family is matched with a dental professional who can answer oral care questions and provide personalized guidance within 24 hours. Note: This is not a substitute for professional medical advice.' },
  { q: 'Are there any additional perks for subscribing, like discounts or free shipping?', a: 'Yes! Subscribers receive exclusive discounts on accessories and complimentary shipping on complete system subscriptions and all purchases over $50.' },
]

export default function SubscriptionBenefitsPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="/cdn/header-subscription.jpg"
            alt="Subscription Benefits"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SM-subscription_page-header_image-mobile.png"
            alt="Subscription Benefits"
            width={768}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg mb-2">Why Subscribe?</h1>
          <p className="text-white/80 text-sm max-w-xl drop-shadow">
            All of our subscription levels enjoy these unique benefits, all designed to create life-long healthy habits
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="w-full">
                <Image
                  src={benefit.img}
                  alt={benefit.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl object-contain"
                />
              </div>
              <div>
                <h2 className="font-display font-black text-2xl md:text-3xl mb-4 text-sm-navy">{benefit.title}</h2>
                <p className="text-sm-gray text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-3xl mb-2 text-sm-navy text-center">Subscription FAQs</h2>
          <p className="text-sm-gray text-sm text-center mb-10">Our most popular option to access the best science-backed mouthcare with one low monthly subscription fee.</p>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details key={faq.q} className="bg-sm-bg rounded-xl overflow-hidden group">
                <summary className="px-5 py-4 font-semibold text-sm text-sm-navy cursor-pointer flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-sm-teal group-open:rotate-45 transition-transform flex-shrink-0 ml-3 text-xl">+</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-sm text-sm-gray leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Ready to Subscribe?</h2>
        <p className="text-sm-gray text-sm mb-8">Lock in 15% off for life and never run out of the oral care your family needs.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/systems-overview" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop Systems & Subscribe →
          </Link>
          <Link href="/shop-all" className="bg-sm-purple text-white font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop All Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
