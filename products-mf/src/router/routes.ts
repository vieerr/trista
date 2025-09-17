import ProductsFormView from '@/views/ProductsFormView.vue'
import ProductsTableView from '@/views/ProductsTableView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ProductsTable',
    component: ProductsTableView,
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: ProductsFormView,
  },
]

export default routes
