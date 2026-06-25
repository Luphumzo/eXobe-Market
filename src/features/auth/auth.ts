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

const registerWithEmailAndPassword = async ({
  email,
  password,
  fullName,
  accountType,
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

  return data
}

export { loginWithEmailAndPassword, registerWithEmailAndPassword }
