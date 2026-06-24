import Image from "next/image"

const HeroBanner = () => {
  return (
    <div className="relative aspect-[0.6142857142857143] w-full overflow-hidden lg:aspect-[16/7]">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-jet/35 px-6 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Our Marketplace</h1>
        <p className="mt-2 text-lg">
          Discover the best products from African vendors.
        </p>
      </div>
      <Image
        src="/images/hero-banner3.jpg"
        alt="African marketplace hero banner"
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

export default HeroBanner
