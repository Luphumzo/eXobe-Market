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
  return (
    <div className="overflow-hidden rounded-lg border">
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
          {isLoading ? (
            <tr>
              <td className="px-4 py-6 text-steel" colSpan={5}>
                Loading products...
              </td>
            </tr>
          ) : products.length ? (
            products.map((product) => (
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
            ))
          ) : (
            <tr>
              <td className="px-4 py-8 text-steel" colSpan={5}>
                No products yet. Create your first listing.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export { SellerProductsTable }
