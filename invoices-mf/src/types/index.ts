type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface ProductRow {
  id: string
  product: Product | null
  reference?: string
  price: number
  discount: number
  tax: { id: number; name: string; rate: number }
  quantity: number
  total?: number
}
export interface Invoice {
  number: string
  client: string
  type: string
  paymentMethod: string
  date: string
  dueDate: string
  amount: number
  products: ProductRow[]
  status: InvoiceStatus
}

export interface Product {
  id: string
  name: string
  reference?: string
  price: number
  taxRate?: number
}
