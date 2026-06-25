"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { AccountField } from "@/components/account/account-field"
import { AccountPanel } from "@/components/account/account-panel"
import { AccountSidebarButton } from "@/components/account/account-sidebar-button"
import { FormMessage } from "@/components/account/form-message"
import { Button } from "@/components/ui/button"
import {
  businessProfileQueryKey,
  getCurrentBusinessProfile,
  updateBusinessProfile,
} from "@/features/business-profiles/business-profiles"
import { authUserQueryKey, getCurrentUser } from "@/features/auth/auth"
import {
  getCurrentProfile,
  profileQueryKey,
  updateProfile,
} from "@/features/profiles/profiles"

type AccountTab = "personal" | "business"

type PersonalFormValues = {
  fullName: string
  email: string
}

type BusinessFormValues = {
  businessName: string
  businessDescription: string
  location: string
  industry: string
  phoneNumber: string
}

const AccountPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<AccountTab>("personal")
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: authUserQueryKey,
    queryFn: getCurrentUser,
  })
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: profileQueryKey(user?.id ?? ""),
    queryFn: getCurrentProfile,
    enabled: Boolean(user),
  })
  const isSeller = profile?.account_type === "seller"
  const visibleTab = !isSeller && activeTab === "business" ? "personal" : activeTab
  const { data: businessProfile, isLoading: isBusinessProfileLoading } =
    useQuery({
      queryKey: businessProfileQueryKey(user?.id ?? ""),
      queryFn: getCurrentBusinessProfile,
      enabled: Boolean(user) && isSeller,
    })
  const personalForm = useForm<PersonalFormValues>({
    mode: "onTouched",
  })
  const businessForm = useForm<BusinessFormValues>({
    mode: "onTouched",
  })
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: authUserQueryKey }),
        queryClient.invalidateQueries({
          queryKey: profileQueryKey(user?.id ?? ""),
        }),
      ])
    },
  })
  const updateBusinessProfileMutation = useMutation({
    mutationFn: updateBusinessProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: businessProfileQueryKey(user?.id ?? ""),
      })
    },
  })

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login?redirectTo=/account")
    }
  }, [isUserLoading, router, user])

  useEffect(() => {
    if (!profile) {
      return
    }

    personalForm.reset({
      email: profile.email,
      fullName: profile.full_name,
    })
  }, [personalForm, profile])

  useEffect(() => {
    if (!businessProfile) {
      return
    }

    businessForm.reset({
      businessDescription: businessProfile.business_description,
      businessName: businessProfile.business_name,
      industry: businessProfile.industry,
      location: businessProfile.location,
      phoneNumber: businessProfile.phone_number,
    })
  }, [businessForm, businessProfile])

  const submitPersonalDetails = (values: PersonalFormValues) => {
    if (!profile) {
      return
    }

  updateProfileMutation.mutate({
    accountType: profile.account_type,
    email: profile.email,
    fullName: values.fullName,
    id: profile.id,
  })
  }

  const submitBusinessDetails = (values: BusinessFormValues) => {
    if (!profile) {
      return
    }

    updateBusinessProfileMutation.mutate({
      businessDescription: values.businessDescription,
      businessName: values.businessName,
      industry: values.industry,
      location: values.location,
      phoneNumber: values.phoneNumber,
      userId: profile.id,
    })
  }

  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-6xl text-sm font-semibold text-steel">
          Loading account...
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="self-start rounded-lg bg-jet p-3 text-white shadow-sm">
          <div className="border-b border-white/10 px-3 py-4">
            <p className="text-sm text-white/60">Account</p>
            <p className="mt-1 text-lg font-black">
              {profile?.full_name ?? "Your profile"}
            </p>
          </div>
          <nav className="mt-3 grid gap-1">
            <AccountSidebarButton
              isActive={visibleTab === "personal"}
              onClick={() => setActiveTab("personal")}
            >
              Personal details
            </AccountSidebarButton>
            {isSeller ? (
              <AccountSidebarButton
                isActive={visibleTab === "business"}
                onClick={() => setActiveTab("business")}
              >
                Business details
              </AccountSidebarButton>
            ) : null}
          </nav>
        </aside>

        <section className="min-w-0">
          {visibleTab === "personal" ? (
            <AccountPanel
              eyebrow="Personal details"
              title="Your account information"
              description="Keep your contact information current for orders, seller tools, and account recovery."
            >
              <form
                className="grid gap-5"
                onSubmit={personalForm.handleSubmit(submitPersonalDetails)}
                noValidate
              >
                <AccountField
                  label="Full name"
                  error={personalForm.formState.errors.fullName?.message}
                >
                  <input
                    type="text"
                    autoComplete="name"
                    {...personalForm.register("fullName", {
                      required: "Enter your full name.",
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters.",
                      },
                    })}
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                  />
                </AccountField>

                <AccountField
                  label="Email address"
                >
                  <input
                    type="email"
                    disabled
                    autoComplete="email"
                    {...personalForm.register("email")}
                    className="h-12 w-full rounded-lg border border-input bg-muted px-4 text-sm text-steel"
                  />
                </AccountField>

                <AccountField label="Account type">
                  <input
                    type="text"
                    value={profile?.account_type ?? ""}
                    disabled
                    className="h-12 w-full rounded-lg border border-input bg-muted px-4 text-sm capitalize text-steel"
                  />
                </AccountField>

                <FormMessage
                  error={updateProfileMutation.error?.message}
                  success={
                    updateProfileMutation.isSuccess
                      ? "Personal details updated."
                      : undefined
                  }
                />

                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="h-11 w-fit rounded-full bg-jet px-7 text-white hover:bg-primary"
                >
                  {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </AccountPanel>
          ) : (
            <AccountPanel
              eyebrow="Business details"
              title="Seller business profile"
              description="These details help buyers understand where you operate and what you sell."
            >
              {isBusinessProfileLoading ? (
                <p className="text-sm font-semibold text-steel">
                  Loading business details...
                </p>
              ) : (
                <form
                  className="grid gap-5"
                  onSubmit={businessForm.handleSubmit(submitBusinessDetails)}
                  noValidate
                >
                  <AccountField
                    label="Business name"
                    error={businessForm.formState.errors.businessName?.message}
                  >
                    <input
                      type="text"
                      autoComplete="organization"
                      {...businessForm.register("businessName", {
                        required: "Enter your business name.",
                        minLength: {
                          value: 2,
                          message:
                            "Business name must be at least 2 characters.",
                        },
                      })}
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                    />
                  </AccountField>

                  <AccountField
                    label="Business description"
                    error={
                      businessForm.formState.errors.businessDescription?.message
                    }
                  >
                    <textarea
                      rows={4}
                      {...businessForm.register("businessDescription", {
                        required:
                          "Describe your business in at least 10 characters.",
                        minLength: {
                          value: 10,
                          message:
                            "Describe your business in at least 10 characters.",
                        },
                      })}
                      className="min-h-28 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                    />
                  </AccountField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <AccountField
                      label="Province or city"
                      error={businessForm.formState.errors.location?.message}
                    >
                      <input
                        type="text"
                        autoComplete="address-level1"
                        {...businessForm.register("location", {
                          required: "Enter your province or city.",
                          minLength: {
                            value: 2,
                            message: "Location must be at least 2 characters.",
                          },
                        })}
                        className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                      />
                    </AccountField>

                    <AccountField
                      label="Industry"
                      error={businessForm.formState.errors.industry?.message}
                    >
                      <input
                        type="text"
                        {...businessForm.register("industry", {
                          required: "Enter your industry or category.",
                          minLength: {
                            value: 2,
                            message: "Industry must be at least 2 characters.",
                          },
                        })}
                        className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                      />
                    </AccountField>
                  </div>

                  <AccountField
                    label="Phone number"
                    error={businessForm.formState.errors.phoneNumber?.message}
                  >
                    <input
                      type="tel"
                      autoComplete="tel"
                      {...businessForm.register("phoneNumber", {
                        required: "Enter a valid phone number.",
                        minLength: {
                          value: 10,
                          message: "Enter a valid phone number.",
                        },
                      })}
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
                    />
                  </AccountField>

                  <FormMessage
                    error={updateBusinessProfileMutation.error?.message}
                    success={
                      updateBusinessProfileMutation.isSuccess
                        ? "Business details updated."
                        : undefined
                    }
                  />

                  <Button
                    type="submit"
                    disabled={updateBusinessProfileMutation.isPending}
                    className="h-11 w-fit rounded-full bg-jet px-7 text-white hover:bg-primary"
                  >
                    {updateBusinessProfileMutation.isPending
                      ? "Saving..."
                      : "Save changes"}
                  </Button>
                </form>
              )}
            </AccountPanel>
          )}
        </section>
      </div>
    </main>
  )
}

export default AccountPage
