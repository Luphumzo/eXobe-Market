import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

type AccountType = "customer" | "seller"

type RegisterInput = {
  accountType: AccountType
  fullName: string
  email: string
  password: string
  confirmPassword: string
  businessName?: string
  businessDescription?: string
  location?: string
  industry?: string
  phoneNumber?: string
}

type LoginInput = {
  email: string
  password: string
}

const authUserQueryKey = ["auth", "user"] as const

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return user
}

const loginWithEmailAndPassword = async ({ email, password }: LoginInput) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

const registerWithEmailAndPassword = async ({
  accountType,
  businessDescription,
  businessName,
  email,
  fullName,
  industry,
  location,
  password,
  phoneNumber,
}: RegisterInput) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        accountType,
      },
    },
  })

  if (error) {
    throw error
  }

  if (!data.user) {
    throw new Error("Could not create user account.")
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: fullName,
    email,
    account_type: accountType,
  })

  if (profileError) {
    throw profileError
  }

  if (accountType === "seller") {
    if (
      !businessName ||
      !businessDescription ||
      !location ||
      !industry ||
      !phoneNumber
    ) {
      throw new Error("Business details are required for seller accounts.")
    }

    const { error: businessProfileError } = await supabase
      .from("business_profiles")
      .insert({
        user_id: data.user.id,
        business_name: businessName,
        business_description: businessDescription,
        location,
        industry,
        phone_number: phoneNumber,
      })

    if (businessProfileError) {
      throw businessProfileError
    }
  }

  return data
}

export {
  authUserQueryKey,
  getCurrentUser,
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
}
