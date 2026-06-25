"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { categoriesQueryKey, getCategories } from "@/features/categories/categories"
import {
  getMarketplaceProducts,
  marketplaceProductsQueryKey,
} from "@/features/products/products"
import { cn } from "@/lib/utils"

const filterSections = [
  "Vendor",
  "Location",
  "Product type",
  "Availability",
] as const

type SortOption = "newest" | "price-low" | "price-high" | "name"

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
  const [minimumPrice, setMinimumPrice] = useState("")
  const [maximumPrice, setMaximumPrice] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const { data: products = [], isLoading } = useQuery({
    queryKey: marketplaceProductsQueryKey(collectionSlug ?? "all"),
    queryFn: () => getMarketplaceProducts(collectionSlug),
  })
  const { data: categories = [] } = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  })
  const filteredProducts = useMemo(() => {
    const min = minimumPrice ? Number(minimumPrice) : undefined
    const max = maximumPrice ? Number(maximumPrice) : undefined

    return [...products]
      .filter((product) => {
        const price = Number(product.price)
        const matchesMin = min === undefined || price >= min
        const matchesMax = max === undefined || price <= max

        return matchesMin && matchesMax
      })
      .sort((firstProduct, secondProduct) => {
        if (sortOption === "price-low") {
          return Number(firstProduct.price) - Number(secondProduct.price)
        }

        if (sortOption === "price-high") {
          return Number(secondProduct.price) - Number(firstProduct.price)
        }

        if (sortOption === "name") {
          return firstProduct.name.localeCompare(secondProduct.name)
        }

        return (
          new Date(secondProduct.created_at).getTime() -
          new Date(firstProduct.created_at).getTime()
        )
      })
  }, [maximumPrice, minimumPrice, products, sortOption])
  const clearFilters = () => {
    setMinimumPrice("")
    setMaximumPrice("")
    setSortOption("newest")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-black uppercase tracking-normal">
            {formatCollectionTitle(collectionSlug)}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-steel">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowFilters((current) => !current)}
              className="h-10 gap-2 px-0 text-base font-bold text-steel hover:bg-transparent hover:text-foreground"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <SlidersHorizontal className="size-5" />
            </Button>
            <label className="flex h-10 items-center gap-2 text-base font-bold text-steel">
              Sort by
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as SortOption)
                }
                className="bg-transparent text-base font-bold outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price low</option>
                <option value="price-high">Price high</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown className="size-5" />
            </label>
          </div>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-8",
            showFilters && "lg:grid-cols-[300px_1fr]",
          )}
        >
          {showFilters ? (
            <CollectionsFilters
              categories={categories}
              collectionSlug={collectionSlug}
              maximumPrice={maximumPrice}
              minimumPrice={minimumPrice}
              onClear={clearFilters}
              onMaximumPriceChange={setMaximumPrice}
              onMinimumPriceChange={setMinimumPrice}
            />
          ) : null}

          <section className="min-w-0">
            {isLoading ? (
              <div className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                Loading products...
              </div>
            ) : filteredProducts.length ? (
              <>
                <p className="mb-5 text-sm font-semibold text-steel">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "result" : "results"}
                </p>
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                No products match your filters.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

type CollectionsFiltersProps = {
  categories: {
    id: string
    name: string
    slug: string
  }[]
  collectionSlug?: string
  maximumPrice: string
  minimumPrice: string
  onClear: () => void
  onMaximumPriceChange: (value: string) => void
  onMinimumPriceChange: (value: string) => void
}

const CollectionsFilters = ({
  categories,
  collectionSlug,
  maximumPrice,
  minimumPrice,
  onClear,
  onMaximumPriceChange,
  onMinimumPriceChange,
}: CollectionsFiltersProps) => {
  return (
    <aside className="self-start lg:sticky lg:top-28">
      <div className="grid gap-5">
        <div className="border-b pb-6">
          <p className="mb-4 text-lg font-black">Price</p>
          <div className="grid gap-3">
            <input
              type="number"
              value={minimumPrice}
              onChange={(event) => onMinimumPriceChange(event.target.value)}
              placeholder="Minimum amount"
              className="h-12 rounded-lg border border-input bg-background px-4 text-sm outline-none placeholder:text-steel focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <input
              type="number"
              value={maximumPrice}
              onChange={(event) => onMaximumPriceChange(event.target.value)}
              placeholder="Maximum amount"
              className="h-12 rounded-lg border border-input bg-background px-4 text-sm outline-none placeholder:text-steel focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <Button
              type="button"
              onClick={onClear}
              className="h-12 rounded-full bg-muted text-base font-black text-steel hover:bg-muted/80"
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="border-b pb-5">
          <p className="mb-4 text-lg font-black">Collection</p>
          <div className="grid gap-2">
            <Link
              href="/collections"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-bold text-steel hover:bg-muted hover:text-foreground",
                !collectionSlug && "bg-muted text-foreground",
              )}
            >
              All collections
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-bold text-steel hover:bg-muted hover:text-foreground",
                  collectionSlug === category.slug &&
                    "bg-muted text-foreground",
                )}
              >
                {category.name}
              </Link>
            ))}
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
