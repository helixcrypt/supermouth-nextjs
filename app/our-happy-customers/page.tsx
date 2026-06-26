import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CustomerCarousel from '@/components/CustomerCarousel'
import ReviewCarousel from '@/components/ReviewCarousel'
import DoctorCarousel from '@/components/DoctorCarousel'

export const metadata = {
  title: 'Our Happy Customers — SuperMouth',
  description: 'Reviews and feedback from our happy customers.',
}

export default function OurHappyCustomersPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">

      {/* Hero — teal bg, text left, photo right */}
      <section style={{ backgroundColor: '#4ab8c4' }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="grid md:grid-cols-2 items-center min-h-[340px]">
            <div className="py-12 pr-8">
              <h1 className="font-black text-4xl md:text-5xl leading-tight mb-4 text-sm-navy">
                our happy{' '}
                <span style={{ fontFamily: 'cursive', color: '#f5d800' }}>customers</span>
              </h1>
              <p className="text-sm-navy text-sm leading-relaxed">
                hear what our customers have<br />
                to say about SuperMouth Products
              </p>
            </div>
            <div className="hidden md:flex justify-end items-end h-full">
              <Image
                src="https://pics.io/public/images/66c65d0efd6a94ef4459ba0b/cdn"
                alt="Happy SuperMouth family"
                width={560}
                height={340}
                className="h-full w-auto object-contain object-bottom max-h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer photo carousel — 3 at a time */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-center font-black text-xl mb-8"
            style={{ fontFamily: 'cursive', color: '#f97316' }}>
            SuperMouth Users
          </h2>
          <CustomerCarousel />
        </div>
      </section>

      {/* Customer review carousel — 3 at a time */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display font-black text-3xl text-center mb-2 text-sm-navy">
            Customer Testimonials
          </h2>
          <p className="text-sm-gray text-sm text-center mb-10">Real reviews from real SuperMouth families</p>
          <ReviewCarousel />
        </div>
      </section>

      {/* Doctor testimonial carousel — 3 at a time */}
      <section className="bg-sm-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest text-center mb-3">
            Why Dental Professionals Recommend SuperMouth
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-12">
            Trusted by Thousands of Dental Professionals
          </h2>
          <DoctorCarousel />
          <div className="text-center mt-12">
            <Link href="https://supermouthpro.com" target="_blank"
              className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              For Dental Professionals →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Join 125,000+ Happy Families</h2>
          <p className="text-sm-gray text-sm mb-8">Experience the SuperMouth difference — 30-day money-back guarantee on every order.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link href="/assessment" className="bg-sm-purple text-white font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
