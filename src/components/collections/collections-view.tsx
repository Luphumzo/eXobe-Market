"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import {
  getMarketplaceProducts,
  marketplaceProductsQueryKey,
} from "@/features/products/products"
import { cn } from "@/lib/utils"

const filterSections = [
  "Collection",
  "Vendor",
  "Location",
  "Product type",
  "Availability",
] as const

type CollectionsViewProps = {
  collectionSlug?: string
}

const formatCollectionTitle = (collectionSlug?: string) => {
  if (!collectionSlug) {
    return "Collections"
  }

  return collectionSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const CollectionsView = ({ collectionSlug }: CollectionsViewProps) => {
  const [showFilters, setShowFilters] = useState(true)
  const { data: products = [], isLoading } = useQuery({
    queryKey: marketplaceProductsQueryKey(collectionSlug ?? "all"),
    queryFn: () => getMarketplaceProducts(collectionSlug),
  })

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-black uppercase tracking-normal">
            {formatCollectionTitle(collectionSlug)}
          </h1>

          <div className="flex items-center gap-4 text-sm font-bold text-steel">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowFilters((current) => !current)}
              className="h-10 gap-2 px-0 text-base font-bold text-steel hover:bg-transparent hover:text-foreground"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <SlidersHorizontal className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-10 gap-2 px-0 text-base font-bold text-steel hover:bg-transparent hover:text-foreground"
            >
              Sort by
              <ChevronDown className="size-5" />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-8",
            showFilters && "lg:grid-cols-[300px_1fr]",
          )}
        >
          {showFilters ? <CollectionsFilters /> : null}

          <section className="min-w-0">
            {isLoading ? (
              <div className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                Loading products...
              </div>
            ) : products.length ? (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                No products available yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

const CollectionsFilters = () => {
  return (
    <aside className="self-start lg:sticky lg:top-28">
      <div className="grid gap-5">
        <div className="border-b pb-6">
          <p className="mb-4 text-lg font-black">Price</p>
          <div className="grid gap-3">
            <input
              type="number"
              placeholder="Minimum amount"
              className="h-12 rounded-lg border border-input bg-background px-4 text-sm outline-none placeholder:text-steel focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <input
              type="number"
              placeholder="Maximum amount"
              className="h-12 rounded-lg border border-input bg-background px-4 text-sm outline-none placeholder:text-steel focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <Button
              type="button"
              disabled
              className="h-12 rounded-full bg-muted text-base font-black text-steel"
            >
              Apply
            </Button>
          </div>
        </div>

        {filterSections.map((section) => (
          <button
            key={section}
            type="button"
            className="flex min-h-16 items-center justify-between border-b text-left text-lg font-black"
          >
            {section}
            <ChevronDown className="size-5 text-steel" />
          </button>
        ))}
      </div>
    </aside>
  )
}

export { CollectionsView }
