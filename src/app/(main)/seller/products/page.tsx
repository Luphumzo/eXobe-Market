"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"

import { AccountPanel } from "@/components/account/account-panel"
import { AccountSidebarButton } from "@/components/account/account-sidebar-button"
import {
  CreateProductModal,
  type ProductFormValues,
} from "@/components/seller/create-product-modal"
import { SellerProductsTable } from "@/components/seller/seller-products-table"
import { Button } from "@/components/ui/button"
import { authUserQueryKey, getCurrentUser } from "@/features/auth/auth"
import { categoriesQueryKey, getCategories } from "@/features/categories/categories"
import {
  createProduct,
  getSellerProducts,
  sellerProductsQueryKey,
} from "@/features/products/products"
import { getCurrentProfile, profileQueryKey } from "@/features/profiles/profiles"

const SellerProductsPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: authUserQueryKey,
    queryFn: getCurrentUser,
  })
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getCurrentProfile,
    enabled: Boolean(user),
  })
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  })
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: sellerProductsQueryKey,
    queryFn: () => getSellerProducts(user?.id ?? ""),
    enabled: Boolean(user),
  })
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      setIsCreateOpen(false)
      await queryClient.invalidateQueries({ queryKey: sellerProductsQueryKey })
    },
  })
  const isSeller = profile?.account_type === "seller"

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login?redirectTo=/seller/products")
    }
  }, [isUserLoading, router, user])

  useEffect(() => {
    if (!isProfileLoading && profile && !isSeller) {
      router.push("/")
    }
  }, [isProfileLoading, isSeller, profile, router])

  const submitProduct = (values: ProductFormValues) => {
    if (!user) {
      return
    }

    const image = values.image.item(0)

    if (!image) {
      return
    }

    createProductMutation.mutate({
      categoryId: values.categoryId,
      description: values.description,
      image,
      name: values.name,
      price: Number(values.price),
      sellerId: user.id,
    })
  }

  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-6xl text-sm font-semibold text-steel">
          Loading portal...
        </div>
      </main>
    )
  }

  if (!user || !isSeller) {
    return null
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="self-start rounded-lg bg-jet p-3 text-white shadow-sm">
          <div className="border-b border-white/10 px-3 py-4">
            <p className="text-sm text-white/60">Seller portal</p>
            <p className="mt-1 text-lg font-black">
              {profile.full_name}
            </p>
          </div>
          <nav className="mt-3 grid gap-1">
            <AccountSidebarButton isActive onClick={() => undefined}>
              Products
            </AccountSidebarButton>
          </nav>
        </aside>

        <AccountPanel
          eyebrow="Products"
          title="Manage your listings"
          description="Create and manage the products buyers will discover across marketplace collections."
        >
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-steel">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <Button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="h-11 w-fit rounded-full bg-jet px-5 text-white hover:bg-primary"
            >
              <Plus className="size-4" />
              Create product
            </Button>
          </div>

          <SellerProductsTable
            isLoading={isProductsLoading}
            products={products}
          />
        </AccountPanel>
      </div>

      {isCreateOpen ? (
        <CreateProductModal
          categories={categories}
          error={createProductMutation.error?.message}
          isCategoriesLoading={isCategoriesLoading}
          isPending={createProductMutation.isPending}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={submitProduct}
        />
      ) : null}
    </main>
  )
}

export default SellerProductsPage
