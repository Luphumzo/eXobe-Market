"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"

type AuthField = {
  name: string
  label: string
  type: string
  placeholder: string
  autoComplete?: string
  hasReveal?: boolean
  minLength?: number
  requiredMessage?: string
  minLengthMessage?: string
}

type AuthFormValues = Record<string, string>

type SplitAuthPageProps = {
  title: string
  buttonLabel: string
  fields: AuthField[]
  footerText: string
  footerHref: string
  footerLinkLabel: string
  forgotPassword?: boolean
  children?: ReactNode
}

const SplitAuthPage = ({
  title,
  buttonLabel,
  fields,
  footerText,
  footerHref,
  footerLinkLabel,
  forgotPassword = false,
  children,
}: SplitAuthPageProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AuthFormValues>({
    mode: "onTouched",
  })

  const submitAuthForm = (values: AuthFormValues) => values

  return (
    <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mx-auto mb-16 block w-fit text-5xl font-black">
            eXobe
          </Link>

          <h1 className="mb-10 text-center text-3xl font-black">{title}</h1>

          {children ?? (
            <form
              className="space-y-4"
              onSubmit={handleSubmit(submitAuthForm)}
              noValidate
            >
              {fields.map((field) => (
                <label key={field.label} className="block">
                  <span className="sr-only">{field.label}</span>
                  <span className="relative block">
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      {...register(field.name, {
                        required:
                          field.requiredMessage ??
                          `${field.label} is required.`,
                        minLength: field.minLength
                          ? {
                              value: field.minLength,
                              message:
                                field.minLengthMessage ??
                                `${field.label} must be at least ${field.minLength} characters.`,
                            }
                          : undefined,
                        pattern:
                          field.type === "email"
                            ? {
                                value: /\S+@\S+\.\S+/,
                                message: "Enter a valid email address.",
                              }
                            : undefined,
                      })}
                      aria-invalid={errors[field.name] ? "true" : "false"}
                      className="h-14 w-full rounded-lg border border-jet bg-background px-4 text-base outline-none transition-colors placeholder:text-steel/55 focus:border-primary focus:ring-3 focus:ring-primary/20"
                    />
                    {field.hasReveal ? (
                      <button
                        type="button"
                        aria-label="Show password"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-steel"
                      >
                        <Eye className="size-5" />
                      </button>
                    ) : null}
                  </span>
                  {errors[field.name]?.message ? (
                    <span className="mt-2 block text-sm font-semibold text-primary">
                      {errors[field.name]?.message}
                    </span>
                  ) : null}
                </label>
              ))}

              {forgotPassword ? (
                <Link
                  href="/forgot-password"
                  className="mx-auto block w-fit pt-4 text-sm text-steel hover:text-foreground"
                >
                  Forgot password?
                </Link>
              ) : null}

              <Button
                type="submit"
                className="mx-auto mt-7 flex h-11 min-w-32 rounded-full bg-jet px-7 text-base text-white hover:bg-primary"
              >
                {buttonLabel}
              </Button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-steel">
            {footerText}{" "}
            <Link href={footerHref} className="font-bold text-foreground underline">
              {footerLinkLabel}
            </Link>
          </p>

          <Link
            href="/"
            className="mx-auto mt-5 block w-fit text-sm font-semibold text-steel hover:text-foreground"
          >
            Return home
          </Link>
        </div>
      </section>

      <section className="hidden min-h-screen bg-jet text-white lg:grid lg:place-items-center">
        <div className="px-12 text-center">
          <p className="text-7xl font-black">eXobe</p>
          <p className="mt-4 max-w-md text-lg text-white/70">
            Discover, trust, buy, sell, finance, and export authentic African
            products.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-8 h-11 rounded-full border-white bg-transparent px-7 text-base text-white hover:bg-white hover:text-jet"
          >
            <Link href="/">Shop now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export { SplitAuthPage }
