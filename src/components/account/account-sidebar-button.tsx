import { cn } from "@/lib/utils"

type AccountSidebarButtonProps = {
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const AccountSidebarButton = ({
  children,
  isActive,
  onClick,
}: AccountSidebarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-3 text-left text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white",
        isActive && "bg-white text-jet hover:bg-white hover:text-jet",
      )}
    >
      {children}
    </button>
  )
}

export { AccountSidebarButton }
