"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react"
import { useState } from "react"

import { menuItems } from "@/app/constants/menu_items"
import { AccountMenuLink } from "@/components/layout/account-menu-link"
import { Button } from "@/components/ui/button"
import {
  authUserQueryKey,
  getCurrentUser,
  logout,
} from "@/features/auth/auth"
import { cn } from "@/lib/utils"

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: user } = useQuery({
    queryKey: authUserQueryKey,
    queryFn: getCurrentUser,
  })
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      setIsAccountOpen(false)
      await queryClient.invalidateQueries({ queryKey: authUserQueryKey })
      router.push("/")
    },
  })
  const isLoggedIn = Boolean(user)

  return (
    <header className="sticky top-0 z-50 border-b bg-jet text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-4xl font-black leading-none tracking-normal">
            eXobe
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {menuItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>

              {item.subitems?.length ? (
                <div className="invisible absolute left-0 top-full min-w-72 translate-y-2 rounded-lg border bg-popover p-2 text-popover-foreground opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.subitems.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className="block rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <span className="text-sm font-semibold">
                        {subitem.label}
                      </span>
                      {subitem.description ? (
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                          {subitem.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <form className="ml-auto hidden h-11 w-full max-w-md items-center gap-2 rounded-full bg-white/12 px-4 text-white/80 lg:flex">
          <Search className="size-5" />
          <input
            aria-label="Search"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/55"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <HeaderIcon href="/wishlist" label="Wishlist">
            <Heart />
          </HeaderIcon>
          <HeaderIcon href="/cart" label="Cart">
            <ShoppingCart />
          </HeaderIcon>
          <div
            className="group relative"
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label="Account"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((current) => !current)}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <UserCircle />
            </Button>

            <div
              className={cn(
                "invisible absolute right-0 top-full min-w-44 translate-y-2 rounded-lg border bg-popover p-2 text-popover-foreground opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                isAccountOpen && "visible translate-y-0 opacity-100",
              )}
            >
              {isLoggedIn ? (
                <>
                  <AccountMenuLink
                    href="/account"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    View account
                  </AccountMenuLink>
                  <button
                    type="button"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-60"
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <AccountMenuLink
                    href="/login"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Login
                  </AccountMenuLink>
                  <AccountMenuLink
                    href="/register"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Register
                  </AccountMenuLink>
                </>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-jet px-4 pb-5 lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <form className="my-4 flex h-11 items-center gap-2 rounded-full bg-white/12 px-4 text-white/80">
          <Search className="size-5" />
          <input
            aria-label="Search"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/55"
          />
        </form>
        <nav className="grid gap-1">
          {menuItems.map((item) => (
            <div key={item.label} className="rounded-lg">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                {item.label}
              </Link>
              {item.subitems?.length ? (
                <div className="ml-3 grid gap-1 border-l border-white/10 pl-3">
                  {item.subitems.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}

const HeaderIcon = ({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon-lg"
      className="text-white hover:bg-white/10 hover:text-white"
    >
      <Link href={href} aria-label={label}>
        {children}
      </Link>
    </Button>
  )
}

export { SiteHeader, HeaderIcon }
