import { getCurrentUser } from "@/features/auth/auth"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

type BusinessProfile = {
  id: string
  user_id: string
  business_name: string
  business_description: string
  location: string
  industry: string
  phone_number: string
  created_at: string
  updated_at: string
}

type CreateBusinessProfileInput = {
  userId: string
  businessName: string
  businessDescription: string
  location: string
  industry: string
  phoneNumber: string
}

type UpdateBusinessProfileInput = CreateBusinessProfileInput

const businessProfileQueryKey = ["business-profile", "current"] as const

const createBusinessProfile = async ({
  businessDescription,
  businessName,
  industry,
  location,
  phoneNumber,
  userId,
}: CreateBusinessProfileInput) => {
  const { data, error } = await supabase
    .from("business_profiles")
    .insert({
      user_id: userId,
      business_name: businessName,
      business_description: businessDescription,
      location,
      industry,
      phone_number: phoneNumber,
    })
    .select()
    .single<BusinessProfile>()

  if (error) {
    throw error
  }

  return data
}

const getCurrentBusinessProfile = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("business_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle<BusinessProfile>()

  if (error) {
    throw error
  }

  return data
}

const updateBusinessProfile = async ({
  businessDescription,
  businessName,
  industry,
  location,
  phoneNumber,
  userId,
}: UpdateBusinessProfileInput) => {
  const { data, error } = await supabase
    .from("business_profiles")
    .upsert(
      {
        user_id: userId,
        business_name: businessName,
        business_description: businessDescription,
        location,
        industry,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    )
    .select()
    .single<BusinessProfile>()

  if (error) {
    throw error
  }

  return data
}

export {
  businessProfileQueryKey,
  createBusinessProfile,
  getCurrentBusinessProfile,
  updateBusinessProfile,
}
export type { BusinessProfile }
