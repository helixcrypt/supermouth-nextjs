'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, wire this to your email service (Klaviyo, SendGrid, etc.)
    setSubmitted(true)
  }

  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">We're Here to Help</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-sm-gray text-sm">Questions, feedback, or just want to say hi? We'd love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-display font-bold text-2xl mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: '📧', label: 'Email', value: 'support@supermouth.com', href: 'mailto:support@supermouth.com' },
                { icon: '🕐', label: 'Response Time', value: 'We typically respond within 24–48 hours on business days.' },
                { icon: '🦷', label: 'For Dental Professionals', value: 'Visit SuperMouth Pro for professional support.', href: 'https://supermouthpro.com' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 bg-white/5 rounded-xl p-5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-sm-accent hover:underline">{item.value}</a>
                    ) : (
                      <p className="text-sm text-sm-white/80">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-sm-accent/10 border border-sm-accent/20 rounded-xl p-5">
              <h3 className="font-display font-bold text-sm mb-2">Looking for quick answers?</h3>
              <p className="text-xs text-sm-gray mb-3">Check our FAQ page — most common questions are answered there.</p>
              <Link href="/faqs" className="text-sm-accent text-xs font-semibold hover:underline">Browse FAQs →</Link>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-sm-green/10 border border-sm-green/30 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-display font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-sm text-sm-gray mb-6">Thanks for reaching out. We'll get back to you within 24–48 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-sm-accent text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-sm-gray block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-sm-gray focus:outline-none focus:border-sm-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-sm-gray block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-sm-gray focus:outline-none focus:border-sm-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-sm-gray block mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sm-accent transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option>Order Question</option>
                    <option>Product Question</option>
                    <option>Returns & Refunds</option>
                    <option>Subscription Help</option>
                    <option>Wholesale / Professional</option>
                    <option>Press & Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-sm-gray block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-sm-gray focus:outline-none focus:border-sm-accent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sm-accent text-sm-navy font-bold py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
