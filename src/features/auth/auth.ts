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
  email,
  fullName,
  password,
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

  return data
}

export {
  authUserQueryKey,
  getCurrentUser,
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
}

export type { AccountType }
