"use client"

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import type { Product } from "@/features/products/products"

type CartItem = {
  currency: string
  imageUrl: string
  name: string
  price: number
  productId: string
  quantity: number
}

type CartContextValue = {
  addProduct: (product: Product) => void
  cartCount: number
  cartTotal: number
  clearCart: () => void
  items: CartItem[]
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

type CartProviderProps = {
  children: ReactNode
}

const cartStorageKey = "exobe-cart"
const cartStorageEvent = "exobe-cart-change"
const CartContext = createContext<CartContextValue | null>(null)

const getStoredCartSnapshot = () => {
  if (typeof window === "undefined") {
    return "[]"
  }

  return window.localStorage.getItem(cartStorageKey) ?? "[]"
}

const subscribeToCart = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {}
  }

  window.addEventListener("storage", onStoreChange)
  window.addEventListener(cartStorageEvent, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(cartStorageEvent, onStoreChange)
  }
}

const parseCartSnapshot = (snapshot: string) => {
  try {
    return JSON.parse(snapshot) as CartItem[]
  } catch {
    return []
  }
}

const setStoredCart = (items: CartItem[]) => {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(items))
  window.dispatchEvent(new Event(cartStorageEvent))
}

const getCartItemFromProduct = (product: Product): CartItem => ({
  currency: product.currency,
  imageUrl: product.image_url,
  name: product.name,
  price: Number(product.price),
  productId: product.id,
  quantity: 1,
})

const CartProvider = ({ children }: CartProviderProps) => {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getStoredCartSnapshot,
    () => "[]",
  )
  const items = useMemo(() => parseCartSnapshot(cartSnapshot), [cartSnapshot])

  const value = useMemo<CartContextValue>(() => {
    const addProduct = (product: Product) => {
      const existingItem = items.find((item) => item.productId === product.id)

      if (!existingItem) {
        setStoredCart([...items, getCartItemFromProduct(product)])
        return
      }

      setStoredCart(
        items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    }

    const removeItem = (productId: string) => {
      setStoredCart(items.filter((item) => item.productId !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId)
        return
      }

      setStoredCart(
        items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      )
    }

    return {
      addProduct,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
      cartTotal: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      clearCart: () => setStoredCart([]),
      items,
      removeItem,
      updateQuantity,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error("useCart must be used within CartProvider")
  }

  return cart
}

export { CartProvider, useCart }
export type { CartItem }
