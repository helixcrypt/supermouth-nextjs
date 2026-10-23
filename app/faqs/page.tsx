import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import FaqCategories from '@/components/info/FaqCategories'
import { faqData } from '@/components/info/faq-data'

export const metadata = {
  title: 'FAQs — SuperMouth',
  description: 'Answers to common questions about SuperMouth products, accounts, shipping, safety, habits and our company.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

export default function FaqsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#EC6A5D]">
        <Image src="/info/SM-website_2.0-_FAQ_page-header_image-ni.jpg" alt="" fill priority sizes="100vw" className="object-cover object-right" />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-[182px] min-h-[388px] flex items-center">
          <div className="max-w-[400px] bg-[#EC6A5D]/70 md:bg-transparent p-4 md:p-0 rounded-xl">
            <h1 className="text-[30px] leading-9 font-bold">got a <span className="font-normal text-white text-[36px]" style={SCRIPT}>question</span>?</h1>
            <p className="mt-4 text-[18px] leading-7">learn more about SuperMouth<br />in the FAQ section below</p>
            <div className="mt-5 rounded-lg px-6 py-5 text-center text-white" style={{ background: BLUE }}>
              <p className="text-[18px] leading-7">Can&apos;t find what you are looking for?</p>
              <Link href="/contact" className="mt-3 inline-block bg-[#FFE920] text-[#394C97] text-[18px] leading-7 font-bold px-2 py-2 rounded-md hover:opacity-90">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[960px] mx-auto px-4 pb-16">
        <FaqCategories groups={faqData.faqs} />
      </section>

      <Footer />
    </div>
  )
}
