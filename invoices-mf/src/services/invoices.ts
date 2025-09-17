import type { Invoice } from '@/types'
import { getApiBaseUrl } from '@/utils'
import axios from 'axios'

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/invoices`)
    return response.data
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return []
  }
}

export const getInvoicesCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/invoices/count`)
    return response.data
  } catch (error) {
    console.error('Error fetching invoices count:', error)
    return 0
  }
}

export const createInvoice = async (invoice: Invoice): Promise<void> => {
  try {
    await axios.post(`${getApiBaseUrl()}/invoices`, invoice)
  } catch (error) {
    console.error('Error creating invoice:', error)
    throw error
  }
}
