type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface ProductRow {
  id: number
  name: string
  quantity: number
  price: number
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
  id: number
  name: string
  reference?: string
  quantity?: number
  price: number
  taxRate?: number
}
