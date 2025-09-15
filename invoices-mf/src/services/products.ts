import type { Product } from '@/types'

const products: Product[] = [
  { id: '1', name: 'Camisa Polo', price: 20.99, taxRate: 20, reference: 'S-001' },
  { id: '2', name: 'Pantalón de mezclilla', price: 45.5, taxRate: 10, reference: 'P-001' },
]

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 300)
  })
}
