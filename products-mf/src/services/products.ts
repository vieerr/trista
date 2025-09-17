import type { Product } from '@/types'
import axios from 'axios'
import { getApiBaseUrl } from '@/utils'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/products`)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductsCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/products/count`)
    return response.data
  } catch (error) {
    console.error('Error fetching products count:', error)
    return 0
  }
}

export const createProduct = async (product: FormData): Promise<void> => {
  try {
    await axios.post(`${getApiBaseUrl()}/products`, product)
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
