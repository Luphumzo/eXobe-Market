"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, X } from "lucide-react"

import { ProductCard } from "@/components/products/product-card"
import {
  productSearchQueryKey,
  searchProducts,
} from "@/features/products/products"
import { cn } from "@/lib/utils"

type ProductSearchProps = {
  className?: string
  onNavigate?: () => void
  onOpenChange?: (isOpen: boolean) => void
}

const minimumSearchLength = 3

const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}

const ProductSearch = ({
  className,
  onNavigate,
  onOpenChange,
}: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), 300)
  const canSearch = debouncedSearchTerm.length >= minimumSearchLength
  const canShowDropdown = isOpen && searchTerm.trim().length >= minimumSearchLength
  const { data: products = [], isFetching } = useQuery({
    queryKey: productSearchQueryKey(debouncedSearchTerm),
    queryFn: () => searchProducts(debouncedSearchTerm),
    enabled: canSearch,
  })
  const closeSearch = () => {
    setIsOpen(false)
    setSearchTerm("")
  }
  const handleNavigate = () => {
    closeSearch()
    onNavigate?.()
  }

  useEffect(() => {
    onOpenChange?.(canShowDropdown)
  }, [canShowDropdown, onOpenChange])

  useEffect(() => {
    if (!canShowDropdown) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [canShowDropdown])

  return (
    <div className={cn("relative", className)}>
      <form
        className="flex h-11 w-full items-center gap-2 rounded-full bg-white px-4 text-jet lg:bg-white/95"
        onSubmit={(event) => event.preventDefault()}
      >
        <Search className="size-5 shrink-0" />
        <input
          aria-label="Search products"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-steel"
        />
      </form>

      {canShowDropdown ? (
        <div className="fixed inset-x-0 bottom-0 top-20 z-50 bg-jet/60 text-foreground">
          <div className="max-h-full overflow-y-auto border-t bg-background shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <section className="min-w-0">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-black sm:text-2xl">Results</h2>
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="flex items-center gap-2 text-sm font-semibold sm:text-base"
                  >
                    Close
                    <X className="size-6" />
                  </button>
                </div>

                {isFetching ? (
                  <p className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                    Searching products...
                  </p>
                ) : products.length ? (
                  <div
                    className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4"
                    onClick={handleNavigate}
                  >
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className="[&>div:first-child>a>div]:rounded-2xl [&>div:first-child>button]:size-8 [&_h3]:text-sm [&_h3]:leading-snug [&_p:first-of-type]:mt-2 [&_p:first-of-type]:text-sm [&_p:last-child]:hidden sm:[&_h3]:text-lg sm:[&_p:first-of-type]:text-base"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-lg border px-5 py-8 text-sm font-semibold text-steel">
                    No products found.
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { ProductSearch }
