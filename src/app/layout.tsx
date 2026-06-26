import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/features/cart/cart-provider"
import {
  CurrencyProvider,
  type CurrencyCode,
} from "@/features/currency/currency-provider"
import { QueryProvider } from "@/providers/react-query-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "eXobe Assessment",
  description: "Marketplace assessment foundation built with Next.js.",
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const cookieStore = await cookies()
  const initialCurrency =
    (cookieStore.get("exobe-currency")?.value as CurrencyCode | undefined) ??
    "ZAR"

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <CurrencyProvider initialCurrency={initialCurrency}>
            <CartProvider>{children}</CartProvider>
          </CurrencyProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
