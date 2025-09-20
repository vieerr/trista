import axios from 'axios'
import { getApiBaseUrl } from '@/utils'

export const getSalesOverTime = async (startDate?: string, endDate?: string) => {
  const params: { startDate?: string; endDate?: string } = {}
  if (startDate) params.startDate = startDate
  if (endDate) params.endDate = endDate

  try {
    const response = await axios.get(`${getApiBaseUrl()}/analytics/sales-over-time`, { params })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch sales over time data')
  }
}

export const getTopProducts = async (limit: number = 10) => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/analytics/top-products`, {
      params: { limit },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch top products data')
  }
}

export const getTopCustomers = async (limit: number = 5) => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/analytics/top-customers`, {
      params: { limit },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch top customers data')
  }
}
