'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem } = useCart()

  if (!isOpen) return null

  const items = cart?.lines.edges ?? []
  const total = cart?.cost.totalAmount

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-sm-dark z-50 cart-drawer flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-display font-bold text-lg">Your Cart</h2>
          <button onClick={closeCart} className="p-2 hover:text-sm-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-5xl">🦷</div>
              <p className="text-sm-gray">Your cart is feeling a bit lonely!</p>
              <Link
                href="/shop-all"
                onClick={closeCart}
                className="bg-sm-accent text-sm-navy font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ node: item }) => {
                const imgUrl = item.merchandise.product.images.edges[0]?.node.url
                const price = parseFloat(item.merchandise.price.amount)
                return (
                  <li key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3">
                    {imgUrl && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                        <Image src={imgUrl} alt={item.merchandise.product.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.merchandise.product.title}</p>
                      {item.merchandise.title !== 'Default Title' && (
                        <p className="text-sm-gray text-xs">{item.merchandise.title}</p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm-accent text-sm font-semibold">
                          ${(price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm-gray text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm-gray hover:text-red-400 transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-sm-gray">Subtotal</span>
              <span className="font-semibold">
                ${parseFloat(total?.amount ?? '0').toFixed(2)} {total?.currencyCode}
              </span>
            </div>
            <a
              href={cart?.checkoutUrl}
              className="block w-full bg-sm-accent text-sm-navy font-bold text-center py-4 rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide"
            >
              {isLoading ? 'Loading...' : 'Checkout →'}
            </a>
            <button
              onClick={closeCart}
              className="block w-full text-center text-sm text-sm-gray hover:text-white transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
