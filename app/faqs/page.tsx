'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'

const FAQS = [
  {
    category: 'Products & Ingredients',
    items: [
      { q: 'What is Hydroxamin®?', a: 'Hydroxamin® is SuperMouth\'s patented blend of nano-hydroxyapatite (a mineral that makes up 97% of tooth enamel), Vitamin K2, and Vitamin D3. Together, these ingredients support enamel remineralization, strengthen teeth, and promote overall oral health.' },
      { q: 'What is nano-hydroxyapatite and is it safe?', a: 'Nano-hydroxyapatite (nHA) is a biocompatible form of calcium phosphate that is identical to the mineral structure of your teeth and bones. It has been used safely in Japan for over 40 years and is recognized as an effective alternative to fluoride for remineralizing enamel. It is safe for children and adults alike.' },
      { q: 'Do your products contain fluoride?', a: 'We offer both fluoride and non-fluoride options across our product lines. Our fluoride products use the recommended safe concentration. Our non-fluoride products use nano-hydroxyapatite as an effective alternative. The choice is yours — both are safe and effective.' },
      { q: 'Are SuperMouth products free from harmful ingredients?', a: 'Yes. SuperMouth products contain no artificial flavors, colors, sweeteners, or preservatives. No antibiotics, no SLS (sodium lauryl sulfate), no GMOs, no "forever chemicals" like PTFE or Teflon, and no harsh abrasives. Every ingredient is carefully selected and rated #1 for safety by EWG.' },
      { q: 'What are prebiotics doing in toothpaste and mouthwash?', a: 'Prebiotics like inulin support a healthy oral microbiome — the community of beneficial bacteria in your mouth. A balanced oral microbiome helps prevent cavities, gum disease, and bad breath more effectively than approaches that try to kill all bacteria indiscriminately.' },
      { q: 'Why is the pH of your mouthwash 8.5?', a: 'An alkaline pH of 8.5 helps neutralize the acids produced by bacteria that cause tooth decay. The mouth naturally wants to be slightly alkaline, and our mouthwash supports that environment — unlike alcohol-based mouthwashes that can dry out tissues and disrupt the oral microbiome.' },
    ],
  },
  {
    category: 'Which Products Are Right for Me?',
    items: [
      { q: 'How do I know which system to choose?', a: 'The easiest way is to take our free assessment at supermouth.com/assessment. You\'ll answer a few quick questions and get a personalized recommendation in under 2 minutes. We have systems specifically designed for Babies & Toddlers, Little Kids (2–5), Big Kids (6–12), Teens & Adults, Pregnancy, and Orthodontics.' },
      { q: 'Can I use SuperMouth products if I\'m pregnant?', a: 'Yes! We have a dedicated Pregnancy System specifically formulated for use during pregnancy and nursing. All ingredients are safe for mother and baby. Our Pregnancy System is pH-balanced to address nausea-related acid exposure and gentle enough for sensitive pregnancy gums.' },
      { q: 'Are these products safe for very young children?', a: 'Yes. We have products starting from birth, including safe teethers, ultra-soft first toothbrushes, and toothpaste formulated for infants with no fluoride and no harsh ingredients. Always supervise young children during brushing.' },
      { q: 'I have braces. Do you have something for me?', a: 'Absolutely. Our Orthodontics System was developed with orthodontists specifically for people with braces, aligners, and retainers. It includes our patented ortho toothbrush, OrthoFloss with built-in threader, and specially formulated toothpaste and mouthwash that prevent white spot lesions.' },
    ],
  },
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping typically takes 3–7 business days. Expedited options are available at checkout. Orders over $50 qualify for free standard shipping.' },
      { q: 'Do you ship internationally?', a: 'Currently we ship within the United States. International shipping options may be available for select countries — check at checkout for availability to your location.' },
      { q: 'Can I track my order?', a: 'Yes. Once your order ships, you\'ll receive a confirmation email with tracking information. You can also track your order by logging into your account.' },
      { q: 'What if my order arrives damaged?', a: 'We\'re sorry to hear that! Please contact us at support@supermouth.com with your order number and a photo of the damaged item. We\'ll make it right immediately.' },
    ],
  },
  {
    category: 'Subscriptions & Returns',
    items: [
      { q: 'What are the benefits of subscribing?', a: 'Subscribers save 15% on every order and lock in that discount for life. You can choose your delivery frequency, pause or skip deliveries at any time, and earn store credit back on eligible orders.' },
      { q: 'How do I cancel or pause my subscription?', a: 'You can manage your subscription anytime by logging into your account. From there you can skip a delivery, change your frequency, or cancel — no phone calls required.' },
      { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products. If you\'re not completely satisfied for any reason, contact us and we\'ll issue a full refund — no questions asked. We want you to love SuperMouth.' },
      { q: 'Can I return opened products?', a: 'Yes. Our 30-day guarantee covers opened products. We\'re confident in our formulas and want you to give them a real try before deciding. Simply contact our support team and we\'ll handle the rest.' },
    ],
  },
  {
    category: 'Professional & Dental Office',
    items: [
      { q: 'I\'m a dental professional. How do I recommend SuperMouth to patients?', a: 'Visit supermouthpro.com to join our dental professional program. You\'ll get access to educational materials, patient samples, professional pricing, and support from our team of dental experts.' },
      { q: 'Are you recommended by dentists?', a: 'Yes — thousands of dental and medical professionals nationwide trust and recommend SuperMouth. Our products are developed by a team of dentists, hygienists, pediatric dentists, and orthodontists who use these products on their own families.' },
    ],
  },
]

export default function FAQsPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key)

  const filtered = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory)

  return (
    <>
      {/* Header */}
      <section className="bg-sm-dark border-b border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Got Questions?</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
          <p className="text-sm-gray text-sm">Everything you need to know about SuperMouth products, ingredients, orders, and more.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeCategory === 'all' ? 'bg-sm-accent text-sm-navy border-sm-accent' : 'border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent'}`}
          >
            All
          </button>
          {FAQS.map(f => (
            <button
              key={f.category}
              onClick={() => setActiveCategory(f.category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeCategory === f.category ? 'bg-sm-accent text-sm-navy border-sm-accent' : 'border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent'}`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-8">
          {filtered.map(section => (
            <div key={section.category}>
              <h2 className="font-display font-bold text-lg mb-4 text-sm-accent">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`
                  const isOpen = openItem === key
                  return (
                    <div key={key} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                      >
                        <span className="font-semibold text-sm">{item.q}</span>
                        <span className={`text-sm-accent flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm text-sm-gray leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-14 bg-sm-accent/10 border border-sm-accent/20 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-xl mb-2">Still have questions?</h3>
          <p className="text-sm-gray text-sm mb-6">Our team is happy to help — reach out and we'll get back to you quickly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Contact Us
            </Link>
            <Link href="/assessment" className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
              Take the Assessment
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
