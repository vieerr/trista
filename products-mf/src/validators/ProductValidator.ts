import { z } from 'zod'

export const productValidator = z.object({
  type: z.enum(['Producto', 'Servicio'], "El tipo debe ser 'Producto' o 'Servicio'"),
  name: z.string('El nombre es requerido').min(1, { message: 'Name is required' }),
  unit: z.string('La unidad es requerida').min(1, { message: 'Unit is required' }),
  reference: z.string().optional(),
  price: z.number('El precio es requerido').min(0, { message: 'Price must be non-negative' }),
  tax: z.object(
    {
      name: z.string('El nombre del impuesto es requerido'),
      rate: z
        .number('La tasa del impuesto es requerida')
        .min(0, { message: 'Tax rate must be non-negative' }),
    },
    ' El impuesto es requerido',
  ),
  description: z.string().optional(),
  image: z.union([z.instanceof(File), z.null()]).optional(),
})
