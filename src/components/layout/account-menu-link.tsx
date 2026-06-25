import Link from "next/link"

type AccountMenuLinkProps = {
  href: string
  onClick: () => void
  children: React.ReactNode
}

const AccountMenuLink = ({
  href,
  onClick,
  children,
}: AccountMenuLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted"
    >
      {children}
    </Link>
  )
}

export { AccountMenuLink }
