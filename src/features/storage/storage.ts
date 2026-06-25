import { createClient } from "@/utils/supabase/client"

const supabase = createClient()
const marketplaceImagesBucket = "marketplace-images"

type UploadProductImageInput = {
  file: File
  sellerId: string
}

const uploadProductImage = async ({
  file,
  sellerId,
}: UploadProductImageInput) => {
  const fileExtension = file.name.split(".").pop() ?? "jpg"
  const filePath = `products/${sellerId}/${crypto.randomUUID()}.${fileExtension}`
  const { error } = await supabase.storage
    .from(marketplaceImagesBucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    throw error
  }

  const { data } = supabase.storage
    .from(marketplaceImagesBucket)
    .getPublicUrl(filePath)

  return data.publicUrl
}

export { uploadProductImage }
