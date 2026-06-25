"use client"

import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CarouselArrowButtonProps = {
  direction: "left" | "right"
  onClick: () => void
  title: string
}

const CarouselArrowButton = ({
  direction,
  onClick,
  title,
}: CarouselArrowButtonProps) => {
  return (
    <Button
      type="button"
      size="icon-lg"
      className={cn(
        "absolute top-[35%] z-10 hidden rounded-md bg-jet text-white hover:bg-jet/90 sm:inline-flex",
        direction === "left" ? "left-0" : "right-0",
      )}
      aria-label={`Scroll ${title} ${direction}`}
      onClick={onClick}
    >
      <ChevronRight
        className={cn("size-5", direction === "left" && "rotate-180")}
      />
    </Button>
  )
}

export { CarouselArrowButton }
