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
      products_form: {
        title: 'Nuevo producto o servicio',
        description: 'Crea productos y/o servicios que podrás vender a tus clientes.',
        selectImage: 'Seleccionar imagen',
        save: 'Guardar ',
        cancel: 'Cancelar',
        create_again: 'Guardar y crear otro',
      },
    },
  },
})

export const exposeMessages = (locale: string) => {
  return i18n.global.getLocaleMessage(locale)
}
