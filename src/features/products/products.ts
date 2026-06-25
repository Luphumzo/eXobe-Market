import { uploadProductImage } from "@/features/storage/storage"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

type ProductStatus = "draft" | "active" | "archived"

type Product = {
  id: string
  seller_id: string
  category_id: string
  name: string
  description: string
  price: number
  currency: string
  image_url: string
  status: ProductStatus
  created_at: string
  updated_at: string
  categories?: {
    name: string
    slug: string
  } | null
}

type CreateProductInput = {
  sellerId: string
  categoryId: string
  name: string
  description: string
  price: number
  image: File
}

type UpdateProductInput = {
  id: string
  sellerId: string
  categoryId: string
  name: string
  description: string
  price: number
  image?: File
}

const sellerProductsQueryKey = ["products", "seller"] as const

const createProduct = async ({
  categoryId,
  description,
  image,
  name,
  price,
  sellerId,
}: CreateProductInput) => {
  const imageUrl = await uploadProductImage({
    file: image,
    sellerId,
  })
  const { data, error } = await supabase
    .from("products")
    .insert({
      seller_id: sellerId,
      category_id: categoryId,
      name,
      description,
      price,
      currency: "ZAR",
      image_url: imageUrl,
      status: "active",
    })
    .select()
    .single<Product>()

  if (error) {
    throw error
  }

  return data
}

const getSellerProducts = async (sellerId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false })
    .returns<Product[]>()

  if (error) {
    throw error
  }

  return data
}

const updateProduct = async ({
  categoryId,
  description,
  id,
  image,
  name,
  price,
  sellerId,
}: UpdateProductInput) => {
  const imageUrl = image
    ? await uploadProductImage({
        file: image,
        sellerId,
      })
    : undefined
  const { data, error } = await supabase
    .from("products")
    .update({
      category_id: categoryId,
      description,
      image_url: imageUrl,
      name,
      price,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("seller_id", sellerId)
    .select()
    .single<Product>()

  if (error) {
    throw error
  }

  return data
}

const deleteProduct = async (productId: string) => {
  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    throw error
  }
}

export {
  createProduct,
  deleteProduct,
  getSellerProducts,
  sellerProductsQueryKey,
  updateProduct,
}
export type { Product }
