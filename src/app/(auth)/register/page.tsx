"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Eye } from "lucide-react"

import { accountFields, sellerFields } from "@/app/constants/fields"
import { SplitAuthPage } from "@/components/auth/split-auth-page"
import { Button } from "@/components/ui/button"
import { registerWithEmailAndPassword } from "@/features/auth/auth"
import { createBusinessProfile } from "@/features/business-profiles/business-profiles"
import { createProfile } from "@/features/profiles/profiles"

type AccountType = "customer" | "seller"

type RegisterFormValues = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  businessDescription: string
  location: string
  industry: string
  phoneNumber: string
}

const RegisterPage = () => {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>("customer")
  const [step, setStep] = useState(1)
  const [revealedFields, setRevealedFields] = useState<Record<string, boolean>>(
    {},
  )
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    trigger,
    unregister,
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
  })
  const isSeller = accountType === "seller"
  const currentFields = isSeller && step === 2 ? sellerFields : accountFields
  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues & { accountType: AccountType }) => {
      const authData = await registerWithEmailAndPassword(values)

      if (!authData.user) {
        throw new Error("Could not create user account.")
      }

      await createProfile({
        accountType: values.accountType,
        email: values.email,
        fullName: values.fullName,
        id: authData.user.id,
      })

      if (values.accountType === "seller") {
        await createBusinessProfile({
          businessDescription: values.businessDescription,
          businessName: values.businessName,
          industry: values.industry,
          location: values.location,
          phoneNumber: values.phoneNumber,
          userId: authData.user.id,
        })
      }
    },
    onSuccess: () => {
      router.push("/login")
    },
  })

  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
    setStep(1)

    if (value === "customer") {
      unregister([
        "businessName",
        "businessDescription",
        "location",
        "industry",
        "phoneNumber",
      ])
    }
  }

  const handleContinue = async () => {
    const isValid = await trigger([
      "fullName",
      "email",
      "password",
      "confirmPassword",
    ])

    if (!isValid) {
      return
    }

    setStep(2)
  }

  const toggleFieldReveal = (name: string) => {
    setRevealedFields((currentFields) => ({
      ...currentFields,
      [name]: !currentFields[name],
    }))
  }

  const submitRegistration = (values: RegisterFormValues) => {
    registerMutation.mutate({
      ...values,
      accountType,
    })
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
      <form
        className="space-y-4"
        onSubmit={handleSubmit(submitRegistration)}
        noValidate
      >
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
              onClick={handleContinue}
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
                type={
                  field.hasReveal && revealedFields[field.name]
                    ? "text"
                    : field.type
                }
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                {...register(field.name as keyof RegisterFormValues, {
                  required: field.requiredMessage ?? "This field is required.",
                  minLength: field.minLength
                    ? {
                        value: field.minLength,
                        message:
                          field.minLengthMessage ??
                          `Minimum ${field.minLength} characters.`,
                      }
                    : undefined,
                  pattern:
                    field.type === "email"
                      ? {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address.",
                        }
                      : undefined,
                  validate:
                    field.name === "confirmPassword"
                      ? (value) =>
                          value === getValues("password") ||
                          "Passwords must match."
                      : undefined,
                })}
                aria-invalid={
                  errors[field.name as keyof RegisterFormValues]
                    ? "true"
                    : "false"
                }
                className="h-14 w-full rounded-lg border border-jet bg-background px-4 text-base outline-none transition-colors placeholder:text-steel/55 focus:border-primary focus:ring-3 focus:ring-primary/20"
              />
              {field.hasReveal ? (
                <button
                  type="button"
                  aria-label={
                    revealedFields[field.name]
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() => toggleFieldReveal(field.name)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-steel"
                >
                  <Eye className="size-5" />
                </button>
              ) : null}
            </span>
            {errors[field.name as keyof RegisterFormValues]?.message ? (
              <span className="mt-2 block text-sm font-semibold text-primary">
                {errors[field.name as keyof RegisterFormValues]?.message}
              </span>
            ) : null}
          </label>
        ))}

        {registerMutation.isError ? (
          <p className="text-center text-sm font-semibold text-primary">
            {registerMutation.error.message}
          </p>
        ) : null}

        {registerMutation.isSuccess ? (
          <p className="text-center text-sm font-semibold text-foreground">
            Account created successfully.
          </p>
        ) : null}

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
              onClick={handleContinue}
              className="h-11 rounded-full bg-jet px-7 text-base text-white hover:bg-primary"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="h-11 rounded-full bg-jet px-7 text-base text-white hover:bg-primary"
            >
              {registerMutation.isPending ? "Creating..." : "Register"}
            </Button>
          )}
        </div>
      </form>
    </SplitAuthPage>
  )
}

export default RegisterPage
