import Link from "next/link"

import { menuItems } from "@/app/constants/menu_items"

const footerLinks = [
  { href: "/collections", label: "Browse marketplace" },
  { href: "/register", label: "Become a seller" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
]

const SiteFooter = () => {
  return (
    <footer className="bg-jet text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="text-4xl font-black leading-none">
            eXobe
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
            A mobile-first marketplace for discovering, buying, and selling
            authentic African products.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase text-white/45">
            Marketplace
          </h2>
          <nav className="mt-4 grid gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-white/75 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase text-white/45">
            Quick links
          </h2>
          <nav className="mt-4 grid gap-3">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-white/75 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs font-semibold text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>South Africa today. Africa tomorrow.</span>
          <span>2026 eXobe Assessment</span>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
