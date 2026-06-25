import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/features/products/products"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  badgeLabel?: string
  className?: string
  colorCount?: number
  href?: string
  product: Product
}

const formatProductPrice = (product: Product) => {
  return new Intl.NumberFormat("en-ZA", {
    currency: product.currency,
    style: "currency",
  }).format(Number(product.price))
}

const ProductCard = ({
  badgeLabel,
  className,
  colorCount = 1,
  href,
  product,
}: ProductCardProps) => {
  const content = (
    <article className={cn("group min-w-0", className)}>
      <div className="relative aspect-square overflow-hidden rounded-3xl border bg-muted">
        {badgeLabel ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-jet px-5 py-2 text-sm font-black text-white sm:text-base">
            {badgeLabel}
          </span>
        ) : null}

        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 px-2">
        <h3 className="text-xl font-black leading-snug sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-3 text-lg font-black">{formatProductPrice(product)}</p>
        <p className="mt-2 text-base text-steel">
          {colorCount} {colorCount === 1 ? "Color" : "Colors"}
        </p>
      </div>
    </article>
  )

  if (!href) {
    return content
  }

  return (
    <Link
      href={href}
      className="block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
    >
      {content}
    </Link>
  )
}

export { ProductCard }
