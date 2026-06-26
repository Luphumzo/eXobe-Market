"use client"

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

type CurrencyCode = "ZAR" | "NGN" | "KES" | "GHS" | "USD"

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
}

type CurrencyProviderProps = {
  children: ReactNode
  initialCurrency?: CurrencyCode
}

const currencyStorageKey = "exobe-currency"
const currencyCookieKey = "exobe-currency"
const currencyStorageEvent = "exobe-currency-change"
const supportedCurrencies: CurrencyCode[] = ["ZAR", "NGN", "KES", "GHS", "USD"]
const currencyLabels: Record<CurrencyCode, string> = {
  ZAR: "🇿🇦 ZAR",
  NGN: "🇳🇬 NGN",
  KES: "🇰🇪 KES",
  GHS: "🇬🇭 GHS",
  USD: "🇺🇸 USD",
}
const CurrencyContext = createContext<CurrencyContextValue | null>(null)

const subscribeToCurrency = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {}
  }

  window.addEventListener("storage", onStoreChange)
  window.addEventListener(currencyStorageEvent, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(currencyStorageEvent, onStoreChange)
  }
}

const getValidCurrency = (currency: string): CurrencyCode => {
  return supportedCurrencies.includes(currency as CurrencyCode)
    ? (currency as CurrencyCode)
    : "ZAR"
}

const setStoredCurrency = (currency: CurrencyCode) => {
  window.localStorage.setItem(currencyStorageKey, currency)
  document.cookie = `${currencyCookieKey}=${currency}; path=/; max-age=31536000; SameSite=Lax`
  window.dispatchEvent(new Event(currencyStorageEvent))
}

const CurrencyProvider = ({
  children,
  initialCurrency = "ZAR",
}: CurrencyProviderProps) => {
  const initialCurrencyValue = getValidCurrency(initialCurrency)
  const getCurrencySnapshot = () => {
    if (typeof window === "undefined") {
      return initialCurrencyValue
    }

    return (
      window.localStorage.getItem(currencyStorageKey) ?? initialCurrencyValue
    )
  }
  const currencySnapshot = useSyncExternalStore(
    subscribeToCurrency,
    getCurrencySnapshot,
    () => initialCurrencyValue,
  )
  const currency = getValidCurrency(currencySnapshot)
  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency: setStoredCurrency,
    }),
    [currency],
  )

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

const useCurrency = () => {
  const currency = useContext(CurrencyContext)

  if (!currency) {
    throw new Error("useCurrency must be used within CurrencyProvider")
  }

  return currency
}

export { CurrencyProvider, currencyLabels, supportedCurrencies, useCurrency }
export type { CurrencyCode }
