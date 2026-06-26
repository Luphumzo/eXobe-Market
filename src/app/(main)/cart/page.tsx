"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/features/cart/cart-provider"
import { formatCurrency } from "@/features/currency/currency-format"
import { useCurrency } from "@/features/currency/currency-provider"

const CartPage = () => {
  const { cartTotal, clearCart, items } = useCart()
  const { currency } = useCurrency()

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-primary">Cart</p>
              <h1 className="mt-2 text-4xl font-black">Shopping cart</h1>
            </div>
            {items.length ? (
              <Button
                type="button"
                variant="ghost"
                className="text-sm font-bold text-steel"
                onClick={clearCart}
              >
                Clear cart
              </Button>
            ) : null}
          </div>

          {items.length ? (
            <div className="grid gap-4">
              {items.map((item) => (
                <CartProductRow key={item.productId} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border px-5 py-10">
              <p className="text-sm font-semibold text-steel">
                Your cart is empty.
              </p>
              <Button
                asChild
                className="mt-5 rounded-full bg-jet px-6 text-white hover:bg-primary"
              >
                <Link href="/collections">Browse products</Link>
              </Button>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="mt-6 grid gap-4 text-sm">
            <div className="flex items-center justify-between gap-4 text-steel">
              <span>Subtotal</span>
              <span className="font-black text-foreground">
                {formatCurrency(cartTotal, currency)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-steel">
              <span>Delivery</span>
              <span>Calculated later</span>
            </div>
          </div>
          <div className="mt-6 border-t pt-6">
            {items.length ? (
              <Button
                asChild
                className="h-12 w-full rounded-full bg-jet text-base font-black text-white hover:bg-primary"
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
            ) : (
              <Button
                type="button"
                disabled
                className="h-12 w-full rounded-full bg-jet text-base font-black text-white hover:bg-primary"
              >
                Checkout
              </Button>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}

const CartProductRow = ({ item }: { item: CartItem }) => {
  const { removeItem, updateQuantity } = useCart()
  const { currency } = useCurrency()

  return (
    <article className="grid gap-4 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted sm:size-24">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <Link
          href={`/products/${item.productId}`}
          className="text-lg font-black hover:underline"
        >
          {item.name}
        </Link>
        <p className="mt-2 text-sm font-black">
          {formatCurrency(item.price, currency)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center rounded-full border">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            aria-label={`Decrease ${item.name} quantity`}
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          >
            <Minus className="size-4" />
          </Button>
          <span className="min-w-8 text-center text-sm font-black">
            {item.quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            aria-label={`Increase ${item.name} quantity`}
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => removeItem(item.productId)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </article>
  )
}

export default CartPage
