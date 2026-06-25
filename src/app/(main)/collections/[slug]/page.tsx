import { redirect } from "next/navigation"

import { CollectionsView } from "@/components/collections/collections-view"

type CollectionPageProps = {
  params: Promise<{
    slug: string
  }>
}

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const { slug } = await params

  if (slug === "all") {
    redirect("/collections")
  }

  return <CollectionsView collectionSlug={slug} />
}

export default CollectionPage
