import { getCurrentUser } from "@/features/auth/auth"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

type AccountType = "customer" | "seller"

type Profile = {
  id: string
  full_name: string
  email: string
  account_type: AccountType
  created_at: string
  updated_at: string
}

type CreateProfileInput = {
  id: string
  fullName: string
  email: string
  accountType: AccountType
}

type UpdateProfileInput = {
  id: string
  fullName: string
  email: string
  accountType: AccountType
}

const profileQueryKey = ["profile", "current"] as const

const createProfile = async ({
  accountType,
  email,
  fullName,
  id,
}: CreateProfileInput) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id,
      full_name: fullName,
      email,
      account_type: accountType,
    })
    .select()
    .single<Profile>()

  if (error) {
    throw error
  }

  return data
}

const getCurrentProfile = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>()

  if (error) {
    throw error
  }

  return data
}

const updateProfile = async ({
  accountType,
  email,
  fullName,
  id,
}: UpdateProfileInput) => {
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      accountType,
      fullName,
    },
  })

  if (authError) {
    throw authError
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      email,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single<Profile>()

  if (error) {
    throw error
  }

  return data
}

export { createProfile, getCurrentProfile, profileQueryKey, updateProfile }
export type { AccountType, Profile }
