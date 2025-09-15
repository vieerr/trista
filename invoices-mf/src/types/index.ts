type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface ProductRow {
  id: string
  name: string
  quantity: number
  price: number
  product: Product | null
  discount: number
  tax: { id: number; name: string; rate: number }
  reference?: string
}
export interface Invoice {
  number: string
  client: string
  type: string
  paymentMethod: string
  date: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

export interface Product {
  id: string
  name: string
  reference?: string
  quantity?: number
  price: number
  taxRate?: number
}
