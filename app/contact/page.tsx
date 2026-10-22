import Footer from '@/components/Footer'
import ContactForm from '@/components/about/ContactForm'
import { Page, Hero } from '@/components/about/ui'

export const metadata = {
  title: 'Contact Us — SuperMouth',
  description: 'Need a hand, have a suggestion, or just feel like chatting? Reach out to SuperMouth.',
}

export default function ContactPage() {
  return (
    <Page>
      <Hero img="/about/contact-SuperMouth_Hero_image_contact_us.png" alt="Smiling woman holding a phone" contentClass="lg:pl-[356px]" bg="#FFD52E">
        <h1 className="text-[30px] leading-9 font-bold">Contact Us</h1>
      </Hero>

      <section className="max-w-[1280px] mx-auto px-4 pt-6 pb-14">
        <p className="max-w-[960px] mx-auto text-center text-[18px] md:text-[20px] leading-7">
          Need a hand, have a suggestion, or just feel like chatting? We’re here and ready to listen! Reach out to us below—we can’t wait to hear from you!
        </p>
        <ContactForm />
      </section>

      <Footer />
    </Page>
  )
}
