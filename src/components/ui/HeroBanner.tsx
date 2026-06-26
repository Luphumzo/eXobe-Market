import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const HeroBanner = () => {
  return (
    <section className="relative min-h-[680px] w-full overflow-hidden lg:min-h-[620px]">
      <div className="absolute inset-0 z-10 bg-jet/45" />
      <div className="relative z-20 flex min-h-[680px] items-center px-4 py-20 text-white sm:px-6 lg:min-h-[620px] lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-white/80">
            South Africa today. Africa tomorrow.
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Discover, trust, buy, and sell authentic African products.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            eXobe connects buyers with emerging African businesses while giving
            vendors a credible storefront built for mobile-first trade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-full bg-primary px-7 text-sm font-black text-white hover:bg-primary/85 sm:text-base"
            >
              <Link href="/collections">Shop African products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white bg-transparent px-7 text-sm font-black text-white hover:bg-white hover:text-jet sm:text-base"
            >
              <Link href="/register">Start selling</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-jet/35 to-transparent" />
      <Image
        src="/images/hero-banner3.jpg"
        alt="African marketplace hero banner"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  )
}

export default HeroBanner
