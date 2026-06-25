type AccountPanelProps = {
  children: React.ReactNode
  description: string
  eyebrow: string
  title: string
}

const AccountPanel = ({
  children,
  description,
  eyebrow,
  title,
}: AccountPanelProps) => {
  return (
    <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm sm:p-8">
      <p className="text-sm font-bold uppercase text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  )
}

export { AccountPanel }
