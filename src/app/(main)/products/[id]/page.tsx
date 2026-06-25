import { ProductDetailView } from "@/components/products/product-detail-view"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params

  return <ProductDetailView productId={id} />
}

export default ProductPage
