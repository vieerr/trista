import { z } from 'zod'

export const productValidator = z.object({
  type: z.enum(['Producto', 'Servicio']),
  name: z.string().min(1, { message: 'Name is required' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  reference: z.string().optional(),
  price: z.number().min(0, { message: 'Price must be non-negative' }),
  tax: z.object({
    name: z.string(),
    rate: z.number(),
  }),
  description: z.string().optional(),
  image: z.union([z.instanceof(File), z.null()]).optional(),
})
