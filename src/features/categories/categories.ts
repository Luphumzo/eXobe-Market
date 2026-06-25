import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string
  created_at: string
  updated_at: string
}

const categoriesQueryKey = ["categories"] as const

const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true })
    .returns<Category[]>()

  if (error) {
    throw error
  }

  return data
}

export { categoriesQueryKey, getCategories }
export type { Category }
