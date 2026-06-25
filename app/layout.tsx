import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import QunicerAgent from '@/components/QunicerAgent'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'SuperMouth — Complete Oral Care System for Every Life Stage',
  description: 'SuperMouth is a revolutionary oral care system designed by dentists. Safe, effective, and fun products for babies, kids, teens, adults, pregnancy, and orthodontics.',
  openGraph: {
    title: 'SuperMouth — Complete Oral Care System',
    description: 'Founded by dentists. 125,000+ families. The only brand that engineers oral care for each life stage.',
    images: [{ url: 'https://cdn.supermouth.com/website/Supermouth-full-logo_reversed.png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-sm-navy text-sm-white font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
          <QunicerAgent />
        </CartProvider>
      </body>
    </html>
  )
}
