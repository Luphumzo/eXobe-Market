"use client"

import { useForm } from "react-hook-form"
import { X } from "lucide-react"

import { FormMessage } from "@/components/account/form-message"
import { Button } from "@/components/ui/button"
import type { Category } from "@/features/categories/categories"

type ProductFormValues = {
  name: string
  description: string
  price: string
  categoryId: string
  image: FileList
}

type CreateProductModalProps = {
  categories: Category[]
  isCategoriesLoading: boolean
  isPending: boolean
  error?: string
  onClose: () => void
  onSubmit: (values: ProductFormValues) => void
}

const CreateProductModal = ({
  categories,
  error,
  isCategoriesLoading,
  isPending,
  onClose,
  onSubmit,
}: CreateProductModalProps) => {
  const productForm = useForm<ProductFormValues>({
    mode: "onTouched",
  })

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-jet/70 px-4 py-8">
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-primary">
              New product
            </p>
            <h2 className="mt-2 text-2xl font-black">Create listing</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <form
          className="mt-6 grid gap-5"
          onSubmit={productForm.handleSubmit(onSubmit)}
          noValidate
        >
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Name</span>
            <input
              type="text"
              {...productForm.register("name", {
                required: "Enter a product name.",
                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters.",
                },
              })}
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            {productForm.formState.errors.name?.message ? (
              <span className="mt-2 block text-sm font-semibold text-primary">
                {productForm.formState.errors.name.message}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Description
            </span>
            <textarea
              rows={4}
              {...productForm.register("description", {
                required: "Describe the product.",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters.",
                },
              })}
              className="min-h-28 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            {productForm.formState.errors.description?.message ? (
              <span className="mt-2 block text-sm font-semibold text-primary">
                {productForm.formState.errors.description.message}
              </span>
            ) : null}
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Price</span>
              <input
                type="number"
                min="0"
                step="0.01"
                {...productForm.register("price", {
                  required: "Enter a price.",
                  min: {
                    value: 0,
                    message: "Price cannot be negative.",
                  },
                })}
                className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
              />
              {productForm.formState.errors.price?.message ? (
                <span className="mt-2 block text-sm font-semibold text-primary">
                  {productForm.formState.errors.price.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Collection
              </span>
              <select
                disabled={isCategoriesLoading}
                {...productForm.register("categoryId", {
                  required: "Choose a collection.",
                })}
                className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
              >
                <option value="">Select collection</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {productForm.formState.errors.categoryId?.message ? (
                <span className="mt-2 block text-sm font-semibold text-primary">
                  {productForm.formState.errors.categoryId.message}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              {...productForm.register("image", {
                validate: (files) =>
                  files.length > 0 || "Upload a product image.",
              })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-jet file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {productForm.formState.errors.image?.message ? (
              <span className="mt-2 block text-sm font-semibold text-primary">
                {productForm.formState.errors.image.message}
              </span>
            ) : null}
          </label>

          <FormMessage error={error} />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 rounded-full bg-jet px-6 text-white hover:bg-primary"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CreateProductModal }
export type { ProductFormValues }
