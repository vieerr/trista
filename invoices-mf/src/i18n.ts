import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    es: {
      invoices: 'Facturas',
      'Invoice Number': 'Número de Factura',
      Client: 'Cliente',
      Amount: 'Cantidad',
      Status: 'Estado',
      Date: 'Fecha',
      'Due Date': 'Fecha de Vencimiento',
      Type: 'Tipo',
    },
  },
})
