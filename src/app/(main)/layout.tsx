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
    </>
  )
} 
export default MainLayout
