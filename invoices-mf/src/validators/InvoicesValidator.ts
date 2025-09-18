import { z } from 'zod';

export const invoiceSchema = z.object({
  number: z.string().min(1, { message: 'Número es requerido' }),
  client_id: z.string().min(1, { message: 'ID del cliente es requerido' }),
  client_name: z.string().min(1, { message: 'Nombre del cliente es requerido' }),
  client_official_id: z.string().min(1, { message: 'ID oficial del cliente es requerido' }),
  client_phone: z.string().min(1, { message: 'Teléfono del cliente es requerido' }),
  operation_date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { message: 'Fecha de operación debe tener formato DD-MM-YYYY' }),
  type: z.string().min(1, { message: 'Tipo es requerido' }),
  payment_method: z.string().min(1, { message: 'Método de pago es requerido' }),
  payment_period: z.string().min(1, { message: 'Período de pago es requerido' }),
  due_date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { message: 'Fecha de vencimiento debe tener formato DD-MM-YYYY' }),
  products: z
    .array(
      z.object({
        row_id: z.string().min(1, { message: 'ID de fila es requerido' }),
        productName: z.string().min(1, { message: 'Nombre del producto es requerido' }),
        reference: z.string().min(1, { message: 'Referencia es requerida' }),
        price: z.number().positive({ message: 'Precio debe ser positivo' }),
        discount: z.number().nonnegative({ message: 'Descuento no puede ser negativo' }),
        taxRate: z.number().nonnegative({ message: 'Tasa de impuesto no puede ser negativa' }),
        taxName: z.string().min(1, { message: 'Nombre del impuesto es requerido' }),
        quantity: z.number().positive({ message: 'Cantidad debe ser positiva' }),
        total: z.number().positive({ message: 'Total debe ser positivo' }),
      })
    )
    .min(1, { message: 'Al menos un producto es requerido' }),
  subtotal: z.number().positive({ message: 'Subtotal debe ser positivo' }),
  discount: z.number().nonnegative({ message: 'Descuento no puede ser negativo' }),
  taxable_base: z.number().positive({ message: 'Base imponible debe ser positiva' }),
  taxes: z.record(z.string(), z.number().nonnegative({ message: 'Los impuestos no pueden ser negativos' })),
  total: z.number().positive({ message: 'Total debe ser positivo' }),
  created_at: z.string().regex(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/, { message: 'Fecha de creación debe tener formato DD-MM-YYYY HH:MM:SS' }),
  status: z.string().min(1, { message: 'Estado es requerido' }),
});
