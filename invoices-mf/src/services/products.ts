import type { Product } from '@/types'
import { getApiBaseUrl } from '@/utils'
import axios from 'axios'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/products`)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
