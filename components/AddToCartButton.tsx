'use client'

import { useCart } from '@/lib/cart-context'

export default function AddToCartButton({
  variantId,
  available,
}: {
  variantId: string
  available: boolean
}) {
  const { addItem, isLoading } = useCart()

  return (
    <button
      onClick={() => addItem(variantId)}
      disabled={!available || isLoading}
      className="w-full bg-sm-accent text-sm-navy font-bold py-4 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2"
    >
      {!available ? 'Sold Out' : isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
