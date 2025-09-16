import type { Product } from '@/types'
import axios from 'axios'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('http://localhost:8000/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
