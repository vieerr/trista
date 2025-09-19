export interface Product {
  _id?: string
  name: string
  type: string
  reference?: string
  unit: string
  price: number
  tax: object
  taxRate?: number
  taxName?: string
  description?: string
  image?: File | null
  image_url?: string
}
