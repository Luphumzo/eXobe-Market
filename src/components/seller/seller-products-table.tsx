import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/features/products/products"

type SellerProductsTableProps = {
  deletingProductId?: string
  isLoading: boolean
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
  products: Product[]
}

const SellerProductsTable = ({
  deletingProductId,
  isLoading,
  onDelete,
  onEdit,
  products,
}: SellerProductsTableProps) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border px-4 py-6 text-sm font-semibold text-steel">
        Loading products...
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="rounded-lg border px-4 py-8 text-sm font-semibold text-steel">
        No products yet. Create your first listing.
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-3 md:hidden">
        {products.map((product) => (
          <article key={product.id} className="rounded-lg border p-3">
            <div className="flex gap-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{product.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-steel">
                  {product.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-steel">
                  <span>{product.categories?.name ?? "Uncategorised"}</span>
                  <span>{product.currency} {Number(product.price).toFixed(2)}</span>
                  <span className="capitalize">{product.status}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                aria-label={`Edit ${product.name}`}
                onClick={() => onEdit(product)}
                className="h-10 rounded-full"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                aria-label={`Delete ${product.name}`}
                disabled={deletingProductId === product.id}
                onClick={() => onDelete(product)}
                className="h-10 rounded-full"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-muted text-xs uppercase text-steel">
            <tr>
              <th className="px-4 py-3 font-bold">Product</th>
              <th className="px-4 py-3 font-bold">Collection</th>
              <th className="px-4 py-3 font-bold">Price</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="line-clamp-1 max-w-72 text-xs text-steel">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-steel">
                  {product.categories?.name ?? "Uncategorised"}
                </td>
                <td className="px-4 py-4 font-semibold">
                  {product.currency} {Number(product.price).toFixed(2)}
                </td>
                <td className="px-4 py-4 capitalize text-steel">
                  {product.status}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Delete ${product.name}`}
                      disabled={deletingProductId === product.id}
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export { SellerProductsTable }
