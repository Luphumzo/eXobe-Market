"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import {
  useForm,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form"

import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/cart-provider"

const formatMoney = (amount: number, currency = "ZAR") => {
  return new Intl.NumberFormat("en-ZA", {
    currency,
    style: "currency",
  }).format(amount)
}

type CheckoutFormValues = {
  addressLine1: string
  addressLine2: string
  city: string
  email: string
  name: string
  phone: string
  postalCode: string
  province: string
}

type CheckoutFieldProps<TFormValues extends FieldValues> = {
  errors: FieldErrors<TFormValues>
  label: string
  name: Path<TFormValues>
  placeholder: string
  register: UseFormRegister<TFormValues>
  required?: boolean
  type?: string
}

const CheckoutPage = () => {
  const router = useRouter()
  const { cartTotal, clearCart, items } = useCart()
  const [isPaying, setIsPaying] = useState(false)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
  const [paidTotal, setPaidTotal] = useState(0)
  const currency = items[0]?.currency ?? "ZAR"
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CheckoutFormValues>({
    mode: "onTouched",
  })

  useEffect(() => {
    if (!isPaymentSuccessful) {
      return
    }

    const timeout = window.setTimeout(() => {
      router.push("/collections")
    }, 2200)

    return () => window.clearTimeout(timeout)
  }, [isPaymentSuccessful, router])

  const submitCheckout = () => {
    setIsPaying(true)
    setPaidTotal(cartTotal)

    window.setTimeout(() => {
      clearCart()
      setIsPaying(false)
      setIsPaymentSuccessful(true)
    }, 1200)
  }

  if (isPaymentSuccessful) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
        <section className="mx-auto max-w-xl rounded-lg border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="mt-6 text-3xl font-black">Payment successful</h1>
          <p className="mt-3 text-sm leading-6 text-steel">
            Your order request for {formatMoney(paidTotal, currency)} has been
            received. Redirecting you back to collections.
          </p>
          <Button
            asChild
            className="mt-6 rounded-full bg-jet px-6 text-white hover:bg-primary"
          >
            <Link href="/collections">Continue shopping</Link>
          </Button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <p className="text-sm font-black uppercase text-primary">Checkout</p>
          <h1 className="mt-2 text-4xl font-black">Complete your order</h1>

          {items.length ? (
            <form
              className="mt-8 grid gap-5"
              onSubmit={handleSubmit(submitCheckout)}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <CheckoutField
                  errors={errors}
                  label="Full name"
                  name="name"
                  placeholder="Your name"
                  register={register}
                />
                <CheckoutField
                  errors={errors}
                  label="Email address"
                  name="email"
                  placeholder="you@example.com"
                  register={register}
                  type="email"
                />
                <CheckoutField
                  errors={errors}
                  label="Phone number"
                  name="phone"
                  placeholder="+27 00 000 0000"
                  register={register}
                  type="tel"
                />
                <CheckoutField
                  errors={errors}
                  label="Address line 1"
                  name="addressLine1"
                  placeholder="Street address"
                  register={register}
                />
                <CheckoutField
                  errors={errors}
                  label="Address line 2"
                  name="addressLine2"
                  placeholder="Apartment, suite, building"
                  register={register}
                  required={false}
                />
                <CheckoutField
                  errors={errors}
                  label="Province"
                  name="province"
                  placeholder="Gauteng"
                  register={register}
                />
                <CheckoutField
                  errors={errors}
                  label="City"
                  name="city"
                  placeholder="Johannesburg"
                  register={register}
                />
                <CheckoutField
                  errors={errors}
                  label="Postal code"
                  name="postalCode"
                  placeholder="2000"
                  register={register}
                />
              </div>

              <Button
                type="submit"
                disabled={isPaying}
                className="h-12 w-full rounded-full bg-jet text-base font-black text-white hover:bg-primary sm:w-fit sm:px-10"
              >
                {isPaying ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" />
                    Processing payment
                  </>
                ) : (
                  `Pay ${formatMoney(cartTotal, currency)}`
                )}
              </Button>
            </form>
          ) : (
            <div className="mt-8 rounded-lg border px-5 py-10">
              <p className="text-sm font-semibold text-steel">
                Your cart is empty.
              </p>
              <Button
                asChild
                className="mt-5 rounded-full bg-jet px-6 text-white hover:bg-primary"
              >
                <Link href="/collections">Browse products</Link>
              </Button>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="mt-6 grid gap-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-black">{item.name}</p>
                  <p className="mt-1 text-steel">Qty {item.quantity}</p>
                </div>
                <p className="font-black">
                  {formatMoney(item.price * item.quantity, item.currency)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-steel">Total</span>
              <span className="text-xl font-black">
                {formatMoney(cartTotal, currency)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-steel">
              Payment is simulated for this assessment. No real payment is
              processed.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

const CheckoutField = ({
  errors,
  label,
  name,
  placeholder,
  register,
  required = true,
  type = "text",
}: CheckoutFieldProps<CheckoutFormValues>) => {
  const fieldError = errors[name]

  return (
    <label className="grid gap-2 text-sm font-black">
      {label}
      <input
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required.` : undefined,
          pattern:
            type === "email"
              ? {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address.",
                }
              : undefined,
        })}
        aria-invalid={fieldError ? "true" : "false"}
        type={type}
        className="h-12 rounded-lg border bg-white px-4 text-sm font-medium outline-none transition focus:border-jet"
      />
      {fieldError?.message ? (
        <span className="text-sm font-semibold text-primary">
          {fieldError.message as string}
        </span>
      ) : null}
    </label>
  )
}

export default CheckoutPage
