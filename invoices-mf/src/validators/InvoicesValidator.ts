import { z } from 'zod'

export const invoiceSchema = z.object({
  number: z.string().min(1, { message: 'Número es requerido' }),
  client: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    // .nullable()
    .refine((val) => val !== null, {
      message: 'Cliente es requerido',
    }),
  date: z.date().optional(),
  payment_method: z.object({ label: z.string(), value: z.string() }).optional(),
  payment_period: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  due_date: z.date().optional(),
  products: z
    .array(
      z.object({
        _id: z.string(),
      }),
    )
    .min(1, { message: 'Al menos un producto es requerido' }),
})
