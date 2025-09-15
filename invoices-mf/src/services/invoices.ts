import type { Invoice } from '@/types'

// const taxes = [
//   { id: 1, name: 'IVA 20%', rate: 20 },
//   { id: 2, name: 'IVA 10%', rate: 10 },
//   { id: 3, name: 'No Tax', rate: 0 },
// ]

export const fetchInvoices = async (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const invoices = localStorage.getItem('invoices')
      if (invoices) {
        resolve(JSON.parse(invoices))
      }
      // resolve(invoices)
    }, 300) // Simulate 300ms delay
  })
}

export const getInvoicesCount = async (): Promise<number> => {
  const invoices = await fetchInvoices()
  return invoices.length
}

export const createInvoice = async (invoice: Invoice): Promise<void> => {
  const invoices = await fetchInvoices()
  invoices.push(invoice)
  localStorage.setItem('invoices', JSON.stringify(invoices))
}

// const invoices: Invoice[] = [
//   {
//     number: 'INV-001',
//     client: 'TechCorp Inc.',
//     type: 'Simple',
//     paymentMethod: 'Bank Transfer',
//     date: '2025-01-05',
//     dueDate: '2025-01-19',
//     amount: 360,
//     products: [
//       {
//         id: 'row1',
//         product: {
//           id: '1023456',
//           name: 'Cotton T-Shirt',
//           reference: 'TSH-001',
//           price: 30,
//           taxRate: 20,
//         },
//         reference: 'TSH-001',
//         price: 30,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 10,
//         total: 360, // (30 * 10) * 1.2
//       },
//     ],
//     status: 'Paid',
//   },
//   {
//     number: 'INV-002',
//     client: 'GrowEasy LLC',
//     type: 'Simple',
//     paymentMethod: 'Credit Card',
//     date: '2025-02-01',
//     dueDate: '2025-02-15',
//     amount: 440,
//     products: [
//       {
//         id: 'row2',
//         product: {
//           id: '2034567',
//           name: 'Leather Jacket',
//           reference: 'JCK-001',
//           price: 200,
//           taxRate: 10,
//         },
//         reference: 'JCK-001',
//         price: 200,
//         discount: 20,
//         tax: taxes[1],
//         quantity: 2,
//         total: 396, // (200 - 20) * 2 * 1.1
//       },
//     ],
//     status: 'Pending',
//   },
//   {
//     number: 'INV-003',
//     client: 'BlueWave Solutions',
//     type: 'Simple',
//     paymentMethod: 'PayPal',
//     date: '2025-03-10',
//     dueDate: '2025-03-24',
//     amount: 150,
//     products: [
//       {
//         id: 'row3',
//         product: {
//           id: '3045678',
//           name: 'Running Shoes',
//           reference: 'SHO-001',
//           price: 75,
//           taxRate: 0,
//         },
//         reference: 'SHO-001',
//         price: 75,
//         discount: 0,
//         tax: taxes[2],
//         quantity: 2,
//         total: 150, // 75 * 2
//       },
//     ],
//     status: 'Overdue',
//   },
//   {
//     number: 'INV-004',
//     client: 'NextGen Enterprises',
//     type: 'Simple',
//     paymentMethod: 'Bank Transfer',
//     date: '2025-04-15',
//     dueDate: '2025-04-29',
//     amount: 108,
//     products: [
//       {
//         id: 'row4',
//         product: {
//           id: '4056789',
//           name: 'Denim Jeans',
//           reference: 'JNS-001',
//           price: 45,
//           taxRate: 20,
//         },
//         reference: 'JNS-001',
//         price: 45,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 2,
//         total: 108, // (45 * 2) * 1.2
//       },
//     ],
//     status: 'Paid',
//   },
//   {
//     number: 'INV-005',
//     client: 'Starlight Media',
//     type: 'Simple',
//     paymentMethod: 'Credit Card',
//     date: '2025-05-20',
//     dueDate: '2025-06-03',
//     amount: 720,
//     products: [
//       {
//         id: 'row5',
//         product: {
//           id: '5067890',
//           name: 'Wool Sweater',
//           reference: 'SWT-001',
//           price: 60,
//           taxRate: 20,
//         },
//         reference: 'SWT-001',
//         price: 60,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 10,
//         total: 720, // (60 * 10) * 1.2
//       },
//     ],
//     status: 'Pending',
//   },
//   {
//     number: 'INV-006',
//     client: 'TechCorp Inc.',
//     type: 'Simple',
//     paymentMethod: 'PayPal',
//     date: '2025-06-01',
//     dueDate: '2025-06-15',
//     amount: 510,
//     products: [
//       {
//         id: 'row6',
//         product: {
//           id: '1023456',
//           name: 'Cotton T-Shirt',
//           reference: 'TSH-001',
//           price: 30,
//           taxRate: 20,
//         },
//         reference: 'TSH-001',
//         price: 30,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 10,
//         total: 360, // (30 * 10) * 1.2
//       },
//       {
//         id: 'row7',
//         product: {
//           id: '3045678',
//           name: 'Running Shoes',
//           reference: 'SHO-001',
//           price: 75,
//           taxRate: 0,
//         },
//         reference: 'SHO-001',
//         price: 75,
//         discount: 0,
//         tax: taxes[2],
//         quantity: 2,
//         total: 150, // 75 * 2
//       },
//     ],
//     status: 'Overdue',
//   },
//   {
//     number: 'INV-007',
//     client: 'GrowEasy LLC',
//     type: 'Simple',
//     paymentMethod: 'Bank Transfer',
//     date: '2025-07-10',
//     dueDate: '2025-07-24',
//     amount: 216,
//     products: [
//       {
//         id: 'row8',
//         product: {
//           id: '4056789',
//           name: 'Denim Jeans',
//           reference: 'JNS-001',
//           price: 45,
//           taxRate: 20,
//         },
//         reference: 'JNS-001',
//         price: 45,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 4,
//         total: 216, // (45 * 4) * 1.2
//       },
//     ],
//     status: 'Paid',
//   },
//   {
//     number: 'INV-008',
//     client: 'BlueWave Solutions',
//     type: 'Simple',
//     paymentMethod: 'Credit Card',
//     date: '2025-08-05',
//     dueDate: '2025-08-19',
//     amount: 200,
//     products: [
//       {
//         id: 'row9',
//         product: {
//           id: '2034567',
//           name: 'Leather Jacket',
//           reference: 'JCK-001',
//           price: 200,
//           taxRate: 10,
//         },
//         reference: 'JCK-001',
//         price: 200,
//         discount: 0,
//         tax: taxes[1],
//         quantity: 1,
//         total: 220, // 200 * 1.1
//       },
//     ],
//     status: 'Pending',
//   },
//   {
//     number: 'INV-009',
//     client: 'NextGen Enterprises',
//     type: 'Simple',
//     paymentMethod: 'PayPal',
//     date: '2025-09-01',
//     dueDate: '2025-09-15',
//     amount: 378,
//     products: [
//       {
//         id: 'row10',
//         product: {
//           id: '5067890',
//           name: 'Wool Sweater',
//           reference: 'SWT-001',
//           price: 60,
//           taxRate: 20,
//         },
//         reference: 'SWT-001',
//         price: 60,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 3,
//         total: 216, // (60 * 3) * 1.2
//       },
//       {
//         id: 'row11',
//         product: {
//           id: '3045678',
//           name: 'Running Shoes',
//           reference: 'SHO-001',
//           price: 75,
//           taxRate: 0,
//         },
//         reference: 'SHO-001',
//         price: 75,
//         discount: 0,
//         tax: taxes[2],
//         quantity: 2,
//         total: 150, // 75 * 2
//       },
//     ],
//     status: 'Overdue',
//   },
//   {
//     number: 'INV-010',
//     client: 'Starlight Media',
//     type: 'Simple',
//     paymentMethod: 'Bank Transfer',
//     date: '2025-10-10',
//     dueDate: '2025-10-24',
//     amount: 180,
//     products: [
//       {
//         id: 'row12',
//         product: {
//           id: '1023456',
//           name: 'Cotton T-Shirt',
//           reference: 'TSH-001',
//           price: 30,
//           taxRate: 20,
//         },
//         reference: 'TSH-001',
//         price: 30,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 5,
//         total: 180, // (30 * 5) * 1.2
//       },
//     ],
//     status: 'Paid',
//   },
//   {
//     number: 'INV-011',
//     client: 'TechCorp Inc.',
//     type: 'Simple',
//     paymentMethod: 'Credit Card',
//     date: '2025-11-01',
//     dueDate: '2025-11-15',
//     amount: 440,
//     products: [
//       {
//         id: 'row13',
//         product: {
//           id: '2034567',
//           name: 'Leather Jacket',
//           reference: 'JCK-001',
//           price: 200,
//           taxRate: 10,
//         },
//         reference: 'JCK-001',
//         price: 200,
//         discount: 0,
//         tax: taxes[1],
//         quantity: 2,
//         total: 440, // (200 * 2) * 1.1
//       },
//     ],
//     status: 'Pending',
//   },
//   {
//     number: 'INV-012',
//     client: 'GrowEasy LLC',
//     type: 'Simple',
//     paymentMethod: 'PayPal',
//     date: '2025-12-05',
//     dueDate: '2025-12-19',
//     amount: 270,
//     products: [
//       {
//         id: 'row14',
//         product: {
//           id: '3045678',
//           name: 'Running Shoes',
//           reference: 'SHO-001',
//           price: 75,
//           taxRate: 0,
//         },
//         reference: 'SHO-001',
//         price: 75,
//         discount: 0,
//         tax: taxes[2],
//         quantity: 3,
//         total: 225, // 75 * 3
//       },
//       {
//         id: 'row15',
//         product: {
//           id: '4056789',
//           name: 'Denim Jeans',
//           reference: 'JNS-001',
//           price: 45,
//           taxRate: 20,
//         },
//         reference: 'JNS-001',
//         price: 45,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 1,
//         total: 54, // 45 * 1.2
//       },
//     ],
//     status: 'Overdue',
//   },
//   {
//     number: 'INV-013',
//     client: 'BlueWave Solutions',
//     type: 'Simple',
//     paymentMethod: 'Bank Transfer',
//     date: '2026-01-10',
//     dueDate: '2026-01-24',
//     amount: 144,
//     products: [
//       {
//         id: 'row16',
//         product: {
//           id: '5067890',
//           name: 'Wool Sweater',
//           reference: 'SWT-001',
//           price: 60,
//           taxRate: 20,
//         },
//         reference: 'SWT-001',
//         price: 60,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 2,
//         total: 144, // (60 * 2) * 1.2
//       },
//     ],
//     status: 'Paid',
//   },
//   {
//     number: 'INV-014',
//     client: 'NextGen Enterprises',
//     type: 'Simple',
//     paymentMethod: 'Credit Card',
//     date: '2026-02-01',
//     dueDate: '2026-02-15',
//     amount: 90,
//     products: [
//       {
//         id: 'row17',
//         product: {
//           id: '1023456',
//           name: 'Cotton T-Shirt',
//           reference: 'TSH-001',
//           price: 30,
//           taxRate: 20,
//         },
//         reference: 'TSH-001',
//         price: 30,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 3,
//         total: 108, // (30 * 3) * 1.2
//       },
//     ],
//     status: 'Pending',
//   },
//   {
//     number: 'INV-015',
//     client: 'Starlight Media',
//     type: 'Simple',
//     paymentMethod: 'PayPal',
//     date: '2026-03-05',
//     dueDate: '2026-03-19',
//     amount: 594,
//     products: [
//       {
//         id: 'row18',
//         product: {
//           id: '2034567',
//           name: 'Leather Jacket',
//           reference: 'JCK-001',
//           price: 200,
//           taxRate: 10,
//         },
//         reference: 'JCK-001',
//         price: 200,
//         discount: 20,
//         tax: taxes[1],
//         quantity: 2,
//         total: 396, // (200 - 20) * 2 * 1.1
//       },
//       {
//         id: 'row19',
//         product: {
//           id: '5067890',
//           name: 'Wool Sweater',
//           reference: 'SWT-001',
//           price: 60,
//           taxRate: 20,
//         },
//         reference: 'SWT-001',
//         price: 60,
//         discount: 0,
//         tax: taxes[0],
//         quantity: 3,
//         total: 216, // (60 * 3) * 1.2
//       },
//     ],
//     status: 'Overdue',
//   },
// ]
