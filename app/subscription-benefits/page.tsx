import Image from 'next/image'
import Footer from '@/components/Footer'
import Accordion from '@/components/info/Accordion'
import { faqData } from '@/components/info/faq-data'

export const metadata = {
  title: 'Subscription Benefits — SuperMouth',
  description: 'All of our subscription levels enjoy unique benefits designed to create life-long healthy habits.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

const benefits = [
  { title: 'best value and convenience', img: '/info/best_value.jpg', text: 'Unlock guaranteed lowest prices on essential oral care products and ensure you never run out with timely deliveries. Enjoy consistent savings on your favorite oral care products delivered right to your doorstep, ensuring you always have what you need when you need it.' },
  { title: 'auto-adjust', img: '/info/auto-adjust.jpg', text: 'Seamlessly transition through various ages and stages with our adaptive system recommendations. Our subscription service takes into account the changing needs of your family members, automatically recommending and adjusting to the next suitable system as they progress through different ages and stages of life.' },
  { title: 'peace of mind', img: '/info/peace_of_mind.jpg', text: 'Trust in safe, effective, and enjoyable products for every family member. Rest assured knowing that our subscription service provides high-quality oral care products that are curated by leading dentists and medical experts, ensuring they are safe, effective, and enjoyable for the entire family. From gentle formulas for children to advanced solutions for adults, we’ve got you covered.' },
  { title: 'engage and personal oral care advisor', img: '/info/personal_oral_care_advisor.jpg', text: 'Immerse yourself in educational and entertaining content to enhance your oral care routine, and receive personalized support from dedicated dental professionals. Our subscription service offers engaging content to educate and entertain you and your family, along with personalized support from dedicated dental professionals. Each family is assigned a dental professional who can provide oral care advice within 24 hours (Note: We do not provide medical advice).' },
  { title: 'hassle-free cancellation and adjustment', img: '/info/hasstle_free_cancellation.jpg', text: 'Embrace the freedom to modify or cancel your subscription at any time post-payment. Life’s needs can change, and so should your oral care. Whether adjusting the frequency of deliveries or switching between system levels, our service is designed to flex with you. Cancel or modify your plan anytime after payment, providing complete control and flexibility over your subscription to meet your ongoing, changing needs.' },
  { title: 'discount on accessories and free shipping', img: '/info/discount_on_accessories.jpg', text: 'Access exclusive discounts on essential accessories based on your subscription tier, and enjoy complimentary shipping on complete system subscriptions and/or purchases over $50. Our subscription service rewards your loyalty with exclusive discounts on essential accessories, and customers on complete system subscriptions and/or purchases over $50 always receive complimentary shipping, making your oral care experience even more seamless.' },
]

const Wave = () => (
  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 360 24" preserveAspectRatio="none" height="28" aria-hidden>
    <path d="M0 24V12C60 0 120 0 180 10s120 10 180-2v16z" fill="white" />
  </svg>
)

export default function SubscriptionBenefitsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F4B454]">
        <Image src="/info/SM-website_2.0-_subscription_page-header_image-ni.jpg" alt="" fill priority sizes="100vw" className="object-cover object-right" />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-[182px] min-h-[388px] flex items-center">
          <div className="max-w-[500px] bg-[#F4B454]/90 md:bg-transparent p-4 md:p-0 rounded-xl">
            <h1 className="text-[30px] leading-9 font-bold">why <span className="font-normal text-[#5AC3B2] text-[34px]" style={SCRIPT}>subscribe</span>?</h1>
            <p className="mt-4 text-[18px] leading-7">all of our subscription levels enjoy these unique benefits, all designed to create life-long healthy habits</p>
          </div>
        </div>
      </section>

      {/* BENEFITS (alternating) */}
      <section className="max-w-[1312px] mx-auto px-4 md:px-0">
        {benefits.map((b, i) => (
          <div key={b.title} className={`grid md:grid-cols-2 items-center ${i % 2 ? '' : ''}`}>
            <div className={`relative aspect-[640/400] overflow-hidden ${i % 2 ? 'md:order-2' : ''}`}>
              <Image src={b.img} alt={b.title} fill sizes="(min-width:768px) 640px, 100vw" className="object-cover" />
              <Wave />
            </div>
            <div className={`px-2 md:px-8 py-8 ${i % 2 ? 'md:order-1' : ''}`}>
              <h2 className="text-[30px] md:text-[34px] leading-10 text-[#DD7164]" style={SCRIPT}>{b.title}</h2>
              <p className="mt-2 text-[17px] md:text-[18px] leading-7">{b.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-[1024px] mx-auto px-4 pt-16 pb-20">
        <h2 className="text-center text-[48px] md:text-[56px] leading-[60px] text-[#DD7164]" style={SCRIPT}>subscription faqs</h2>
        <p className="mt-4 text-center text-[17px] md:text-[18px] leading-7">Our most popular option to access the best science-backed mouthcare with one low monthly subscription fee. Save big and get customized products systems every 90 days without paying upfront. Get all the SuperMouth benefits with the plan that is just right for you and your family.</p>
        <div className="mt-8">
          <Accordion items={faqData.subscription[0].items} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
