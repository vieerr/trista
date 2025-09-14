import type { Invoice } from '@/types'

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const invoices: Invoice[] = [
    {
      number: 'INV001',
      client: 'Client A',
      type: 'Simple',
      date: '2023-01-01',
      dueDate: '2023-01-15',
      amount: 1000,
      status: 'Paid',
    },
    {
      number: 'INV002',
      client: 'Client B',
      type: 'Normal',
      date: '2023-02-01',
      dueDate: '2023-02-15',
      amount: 500,
      status: 'Pending',
    },
    {
      number: 'INV003',
      client: 'Client C',
      type: 'Simple',
      date: '2023-03-01',
      dueDate: '2023-03-10',
      amount: 2000,
      status: 'Overdue',
    },
    {
      number: 'INV004',
      client: 'Client D',
      type: 'Normal',
      date: '2023-04-01',
      dueDate: '2023-04-20',
      amount: 800,
      status: 'Paid',
    },
    {
      number: 'INV005',
      client: 'Client E',
      type: 'Simple',
      date: '2023-05-01',
      dueDate: '2023-05-15',
      amount: 1500,
      status: 'Pending',
    },
    {
      number: 'INV006',
      client: 'Client F',
      type: 'Normal',
      date: '2023-06-01',
      dueDate: '2023-06-25',
      amount: 7000,
      status: 'Paid',
    },
    {
      number: 'INV007',
      client: 'Client G',
      type: 'Simple',
      date: '2023-07-01',
      dueDate: '2023-07-15',
      amount: 400,
      status: 'Overdue',
    },
    {
      number: 'INV008',
      client: 'Client H',
      type: 'Normal',
      date: '2023-08-01',
      dueDate: '2023-08-10',
      amount: 600,
      status: 'Pending',
    },
    {
      number: 'INV009',
      client: 'Client I',
      type: 'Simple',
      date: '2023-09-01',
      dueDate: '2023-09-20',
      amount: 300,
      status: 'Paid',
    },
    {
      number: 'INV010',
      client: 'Client J',
      type: 'Normal',
      date: '2023-10-01',
      dueDate: '2023-10-15',
      amount: 900,
      status: 'Pending',
    },
    {
      number: 'INV011',
      client: 'Client K',
      type: 'Simple',
      date: '2023-11-01',
      dueDate: '2023-11-30',
      amount: 1100,
      status: 'Overdue',
    },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoices)
    }, 500) // Simulate 500ms delay
  })
}
