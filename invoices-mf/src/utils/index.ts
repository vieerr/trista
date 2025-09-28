import type { Product, ProductRow } from '@/types'

const defaultTax = { name: 'IVA Tarifa 0', rate: 0 }

export const getApiBaseUrl = (): string => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV
}

export const getVoiceAPIBaseUrl = (): string => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_VOICE_API_URL_PROD
    : import.meta.env.VITE_VOICE_API_URL_DEV
}
export const formatCurrency = (value: number | undefined): string => {
  return `$${value?.toFixed(2).replace('.', ',')}`
}

export const createRow = (): ProductRow => ({
  row_id: Date.now().toString(),
  product: null,
  quantity: 1,
  price: 0,
  discount: 0,
  tax: defaultTax,
  reference: '',
})

export const createProductRow = (product: Product, quantity: number): ProductRow => {
  return {
    ...createRow(),
    product: product,
    price: product.price,
    tax: {
      rate: product.taxRate || 0,
      name: product.taxName || '',
    },
    reference: product.reference,
    quantity: quantity,
    discount: 0,
  }
}
