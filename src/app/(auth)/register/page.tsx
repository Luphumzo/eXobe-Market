"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

import { SplitAuthPage } from "@/components/auth/split-auth-page"
import { Button } from "@/components/ui/button"
import { sellerFields, accountFields } from "@/app/constants/fields"

type AccountType = "customer" | "seller"



const RegisterPage = () => {
  const [accountType, setAccountType] = useState<AccountType>("customer")
  const [step, setStep] = useState(1)
  const isSeller = accountType === "seller"
  const currentFields = isSeller && step === 2 ? sellerFields : accountFields

  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
    setStep(1)
  }

  return (
    <SplitAuthPage
      title="Create Account"
      buttonLabel="Register"
      fields={[]}
      footerText="Already have an account?"
      footerHref="/login"
      footerLinkLabel="Login"
    >
      <form className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">
            Register as
          </span>
          <select
            value={accountType}
            onChange={(event) =>
              handleAccountTypeChange(event.target.value as AccountType)
            }
            className="h-14 w-full rounded-lg border border-jet bg-background px-4 text-base outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>

        {isSeller ? (
          <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`rounded-full px-4 py-2 transition-colors ${
                step === 1 ? "bg-jet text-white" : "text-steel"
              }`}
            >
              Account
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`rounded-full px-4 py-2 transition-colors ${
                step === 2 ? "bg-jet text-white" : "text-steel"
              }`}
            >
              Business
            </button>
          </div>
        ) : null}

        {currentFields.map((field) => (
          <label key={field.label} className="block">
            <span className="sr-only">{field.label}</span>
            <span className="relative block">
              <input
                type={field.type}
                placeholder={field.placeholder}
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
          </label>
        ))}

        <div className="flex justify-center gap-3 pt-3">
          {isSeller && step === 2 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="h-11 rounded-full border-jet px-7 text-base"
            >
              Back
            </Button>
          ) : null}

          {isSeller && step === 1 ? (
            <Button
              type="button"
              onClick={() => setStep(2)}
              className="h-11 rounded-full bg-jet px-7 text-base text-white hover:bg-primary"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-11 rounded-full bg-jet px-7 text-base text-white hover:bg-primary"
            >
              Register
            </Button>
          )}
        </div>
      </form>
    </SplitAuthPage>
  )
}

export default RegisterPage
