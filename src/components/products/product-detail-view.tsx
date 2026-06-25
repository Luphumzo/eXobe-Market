"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/cart-provider"
import {
  getProductById,
  productDetailQueryKey,
  type Product,
} from "@/features/products/products"

type ProductDetailViewProps = {
  productId: string
}

const formatProductPrice = (product: Product) => {
  return new Intl.NumberFormat("en-ZA", {
    currency: product.currency,
    style: "currency",
  }).format(Number(product.price))
}

const ProductDetailView = ({ productId }: ProductDetailViewProps) => {
  const { addProduct } = useCart()
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: productDetailQueryKey(productId),
    queryFn: () => getProductById(productId),
  })

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
          Loading product...
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border px-5 py-8">
          <p className="text-sm font-semibold text-steel">
            Product could not be found.
          </p>
          <Button asChild className="mt-5 rounded-full bg-jet px-6 text-white">
            <Link href="/collections">Back to collections</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Button
          asChild
          variant="ghost"
          className="mb-6 h-10 gap-2 px-0 text-sm font-bold text-steel hover:bg-transparent hover:text-foreground"
        >
          <Link href="/collections">
            <ChevronLeft className="size-4" />
            Back to collections
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <div className="relative aspect-square overflow-hidden rounded-3xl border bg-muted">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>

          <section className="self-start">
            <p className="text-sm font-black uppercase text-primary">
              {product.categories?.name ?? "Collection"}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-black">
              {formatProductPrice(product)}
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel">
              {product.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button
                type="button"
                className="h-12 rounded-full bg-jet px-8 text-base font-black text-white hover:bg-primary"
                onClick={() => addProduct(product)}
              >
                <ShoppingCart className="size-5" />
                Add to cart
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-full px-6 text-base font-black"
              >
                <Heart className="size-5" />
                Wishlist
              </Button>
            </div>

            <div className="mt-8 grid gap-4 border-t pt-6 text-sm text-steel">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Collection</span>
                <span>{product.categories?.name ?? "Uncategorised"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Status</span>
                <span className="capitalize">{product.status}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Currency</span>
                <span>{product.currency}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export { ProductDetailView }
