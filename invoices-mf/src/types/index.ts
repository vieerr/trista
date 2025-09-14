type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface Invoice {
  number: string
  client: string
  type: string
  date: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}
