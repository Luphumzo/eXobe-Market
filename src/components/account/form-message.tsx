import { cn } from "@/lib/utils"

type FormMessageProps = {
  error?: string
  success?: string
}

const FormMessage = ({ error, success }: FormMessageProps) => {
  if (!error && !success) {
    return null
  }

  return (
    <p
      className={cn(
        "text-sm font-semibold",
        error ? "text-primary" : "text-foreground",
      )}
    >
      {error ?? success}
    </p>
  )
}

export { FormMessage }
