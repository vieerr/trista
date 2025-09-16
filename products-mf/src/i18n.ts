import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es: {
      products: {
        name: 'Nombre',
        reference: 'Referencia',
        price: 'Precio',
        description: 'Descripción',
        actions: 'Acciones',
        taxName: 'Tipo de IVA',
      },
      products_view: {
        title: 'Productos',
        createProduct: 'Crear Producto',
        description: 'Gestione sus productos aquí.',
      },
      products_table: {
        noProducts: 'No se han encontrado productos.',
        loading: 'Cargando productos. Por favor, espere.',
      },
    },
  },
})

export const exposeMessages = (locale: string) => {
  return i18n.global.getLocaleMessage(locale)
}
