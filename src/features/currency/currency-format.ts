import type { CurrencyCode } from "@/features/currency/currency-provider"

const zarConversionRates: Record<CurrencyCode, number> = {
  ZAR: 1,
  NGN: 85,
  KES: 7.1,
  GHS: 0.63,
  USD: 0.055,
}

const currencyLocales: Record<CurrencyCode, string> = {
  ZAR: "en-ZA",
  NGN: "en-NG",
  KES: "en-KE",
  GHS: "en-GH",
  USD: "en-US",
}

const convertFromZar = (amount: number, currency: CurrencyCode) => {
  return amount * zarConversionRates[currency]
}

const formatCurrency = (amount: number, currency: CurrencyCode) => {
  return new Intl.NumberFormat(currencyLocales[currency], {
    currency,
    style: "currency",
  }).format(convertFromZar(amount, currency))
}

export { convertFromZar, formatCurrency }
