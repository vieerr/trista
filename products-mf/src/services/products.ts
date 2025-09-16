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

export const getProductsCount = async (): Promise<number> => {
  try {
    const response = await axios.get('http://localhost:8000/products/count')
    return response.data
  } catch (error) {
    console.error('Error fetching products count:', error)
    return 0
  }
}

export const createProduct = async (product: Product): Promise<void> => {
  try {
    await axios.post('http://localhost:8000/products', product)
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
