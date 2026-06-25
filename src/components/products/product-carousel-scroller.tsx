"use client"

import { useRef } from "react"

import { CarouselArrowButton } from "@/components/products/carousel-arrow-button"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/features/products/products"

type ProductCarouselScrollerProps = {
  products: Product[]
  title: string
}

const ProductCarouselScroller = ({
  products,
  title,
}: ProductCarouselScrollerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollProducts = (direction: "left" | "right") => {
    const scrollContainer = scrollContainerRef.current

    if (!scrollContainer) {
      return
    }

    scrollContainer.scrollBy({
      behavior: "smooth",
      left:
        direction === "left"
          ? -scrollContainer.clientWidth * 0.9
          : scrollContainer.clientWidth * 0.9,
    })
  }

  return (
    <div className="relative sm:px-12">
      <CarouselArrowButton
        direction="left"
        onClick={() => scrollProducts("left")}
        title={title}
      />

      <div
        ref={scrollContainerRef}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth px-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[42%] lg:w-[24%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <CarouselArrowButton
        direction="right"
        onClick={() => scrollProducts("right")}
        title={title}
      />
    </div>
  )
}

export { ProductCarouselScroller }
