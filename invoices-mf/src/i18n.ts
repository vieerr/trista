import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    es: {
      select: 'Seleccionar',
      invoices: {
        invoices: 'Facturas',
        'Invoice Number': 'Número de Factura',
        Client: 'Cliente',
        Amount: 'Cantidad',
        Status: 'Estado',
        Date: 'Fecha',
        'Due Date': 'Fecha de Vencimiento',
        Type: 'Tipo',
        Paid: 'Pagado',
        Pending: 'Pendiente',
        Overdue: 'Atrasado',
        Simple: 'Simplificada',
        Normal: 'Ordinaria',
      },
      payment_method: 'Método de Pago',
      payment_methods: {
        cash: 'Efectivo',
        credit_card: 'Tarjeta de Crédito',
        bank_transfer: 'Transferencia Bancaria',
      },
      payment_period: 'Plazo de Pago',
      payment_periods: {
        cash: 'Contado',
        '7_days': '7 Días',
        '15_days': '15 Días',
        '1_month': '1 Mes',
        '2_months': '2 Meses',
      },
      invoices_form: {
        search_product_service: 'Buscar Producto/Servicio',
        product_service: 'Producto/Servicio',
        reference: 'Referencia',
        price: 'Precio',
        discount: 'Descuento',
        tax: 'Impuesto',
        quantity: 'Cantidad',
        total: 'Total',
        add_row: 'Añadir Fila',
      },
    },
  },
})
