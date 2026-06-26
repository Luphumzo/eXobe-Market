import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

const audienceSections = [
  {
    eyebrow: "For buyers",
    title: "Buy from African businesses with confidence.",
    description:
      "Browse curated products, compare categories, view product details, and complete a simple checkout flow without needing an account first.",
    ctaHref: "/collections",
    ctaLabel: "Explore collections",
    points: [
      "Mobile-first product discovery",
      "Clear pricing and product detail pages",
      "Cart and simulated checkout flow",
    ],
  },
  {
    eyebrow: "For sellers",
    title: "Turn your business into a credible digital storefront.",
    description:
      "Register as a seller, create your business profile, upload products, and manage listings from a focused vendor portal.",
    ctaHref: "/register",
    ctaLabel: "Register as a seller",
    points: [
      "Seller onboarding with business details",
      "Product image uploads and categories",
      "Edit, delete, and manage your own listings",
    ],
  },
]

const platformHighlights = [
  {
    label: "Built for trust",
    text: "Profiles, product detail, seller ownership, and a checkout flow give buyers enough context to act.",
  },
  {
    label: "Built for phones",
    text: "Every core journey is designed for mobile buyers and entrepreneurs who run their business on the move.",
  },
  {
    label: "Built for scale",
    text: "Collections group products across vendors, so buyers discover categories instead of isolated stores.",
  },
]

const LandingSections = () => {
  return (
    <>
      <section className="bg-jet px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          {platformHighlights.map((item) => (
            <div key={item.label} className="border-l border-white/15 pl-5">
              <h2 className="text-xl font-black">{item.label}</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-primary">
              Two-sided marketplace
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Designed to convert buyers and reduce seller drop-off.
            </h2>
            <p className="mt-5 text-base leading-7 text-steel">
              The platform has to work for both sides at once: buyers need
              confidence and sellers need a fast path from registration to
              visible listings.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {audienceSections.map((section) => (
              <article
                key={section.eyebrow}
                className="rounded-lg border bg-white p-6 shadow-sm sm:p-8"
              >
                <p className="text-sm font-black uppercase text-primary">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-black leading-tight">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-steel">
                  {section.description}
                </p>

                <ul className="mt-6 grid gap-3">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm font-semibold text-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-8 h-11 rounded-full bg-jet px-6 text-white hover:bg-primary"
                >
                  <Link href={section.ctaHref}>
                    {section.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-primary">
              Continental ambition
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Category-first discovery for African trade.
            </h2>
            <p className="mt-4 text-sm leading-6 text-steel">
              Buyers browse collections across sellers, while vendors keep
              ownership of their own products. That creates the foundation for
              a marketplace that can grow beyond one city, one province, or one
              store.
            </p>
          </div>
          <Button
            asChild
            className="h-12 w-full rounded-full bg-primary px-8 text-base font-black text-white hover:bg-primary/85 sm:w-fit"
          >
            <Link href="/collections">Start discovering</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export { LandingSections }
