import Link from "next/link"

import { ProductCarouselScroller } from "@/components/products/product-carousel-scroller"
import { getMarketplaceProductsServer } from "@/features/products/products-server"
import { cn } from "@/lib/utils"

type ProductCarouselProps = {
  className?: string
  collectionName: string
  limit?: number
  shopAllHref?: string
  title: string
}

const getCollectionSlug = (collectionName: string) =>
  collectionName.trim().toLowerCase().replace(/\s+/g, "-")

const ProductCarousel = async ({
  className,
  collectionName,
  limit = 10,
  shopAllHref,
  title,
}: ProductCarouselProps) => {
  const collectionSlug = getCollectionSlug(collectionName)
  const products = await getMarketplaceProductsServer(collectionSlug)
  const visibleProducts = products.slice(0, limit)
  const collectionHref = shopAllHref ?? `/collections/${collectionSlug}`

  if (visibleProducts.length === 0) {
    return null
  }

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <h2 className="text-3xl font-black tracking-normal text-foreground sm:text-4xl">
            {title}
          </h2>
          <Link
            href={collectionHref}
            className="shrink-0 text-lg font-black underline underline-offset-2 sm:text-xl"
          >
            Shop All
          </Link>
        </div>

        <ProductCarouselScroller products={visibleProducts} title={title} />
      </div>
    </section>
  )
}

export { ProductCarousel }
