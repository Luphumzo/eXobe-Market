import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
export default MainLayout
