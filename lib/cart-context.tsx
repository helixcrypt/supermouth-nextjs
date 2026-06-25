'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createCart, addToCart, getCart, removeFromCart } from '@/lib/shopify'

interface CartItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: {
      title: string
      handle: string
      images: { edges: { node: { url: string } }[] }
    }
  }
}

interface Cart {
  id: string
  checkoutUrl: string
  lines: { edges: { node: CartItem }[] }
  cost: {
    totalAmount: { amount: string; currencyCode: string }
    subtotalAmount: { amount: string; currencyCode: string }
  }
}

interface CartContextType {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const cartId = localStorage.getItem('sm_cart_id')
    if (cartId) {
      getCart(cartId).then(setCart).catch(() => localStorage.removeItem('sm_cart_id'))
    }
  }, [])

  const getOrCreateCart = async () => {
    if (cart) return cart
    const newCart = await createCart()
    localStorage.setItem('sm_cart_id', newCart.id)
    setCart(newCart)
    return newCart
  }

  const addItem = async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      const currentCart = await getOrCreateCart()
      const updatedCart = await addToCart(currentCart.id, variantId, quantity)
      setCart(updatedCart)
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await removeFromCart(cart.id, lineId)
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const itemCount = cart?.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, isOpen, isLoading,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, removeItem, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
