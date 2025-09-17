export interface Product {
  _id?: string
  name: string
  type: string
  reference?: string
  unit: string
  price: number
  tax: object,
  description?: string
  image?: File | null
}
