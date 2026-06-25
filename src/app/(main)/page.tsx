import { ProductCarousel } from "@/components/products/product-carousel"
import HeroBanner from "@/components/ui/HeroBanner"

const Home = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroBanner />
      <ProductCarousel collectionName="bags" title="Best sellers" />
    </main>
  )
}

export default Home
