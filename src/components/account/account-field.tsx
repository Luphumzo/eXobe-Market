type AccountFieldProps = {
  children: React.ReactNode
  error?: string
  label: string
}

const AccountField = ({ children, error, label }: AccountFieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm font-semibold text-primary">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export { AccountField }
