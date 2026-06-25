import { cookies } from "next/headers"

import type { Product } from "@/features/products/products"
import { createClient } from "@/utils/supabase/server"

const getMarketplaceProductsServer = async (collectionSlug?: string) => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  let productsQuery = supabase
    .from("products")
    .select(
      collectionSlug
        ? "*, categories!inner(name, slug)"
        : "*, categories(name, slug)",
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (collectionSlug) {
    productsQuery = productsQuery.eq("categories.slug", collectionSlug)
  }

  const { data, error } = await productsQuery.returns<Product[]>()

  if (error) {
    throw error
  }

  return data
}

export { getMarketplaceProductsServer }
