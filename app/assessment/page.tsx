import Footer from '@/components/Footer'
import Assessment from '@/components/info/Assessment'

export const metadata = {
  title: 'Assessment — SuperMouth',
  description: 'Take a quick assessment and get a personalized SuperMouth oral care system recommendation.',
}

export default function AssessmentPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em] text-[#394C97]">
      <section className="pt-8 md:pt-12">
        <Assessment />
      </section>
      {/* Wave band above the footer, as on supermouth.com */}
      <div className="max-w-[1280px] mx-auto px-4" aria-hidden>
        <svg viewBox="0 0 1280 200" preserveAspectRatio="none" className="w-full h-[120px] md:h-[200px] block">
          <path d="M0 0c200 0 340 30 480 70s260 40 420 10 280-40 380-20v140H0z" fill="#0BAAC0" />
        </svg>
      </div>
      <Footer />
    </div>
  )
}
