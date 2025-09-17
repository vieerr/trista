import ProductsFormView from '@/views/ProductsFormView.vue'
import ProductsTableView from '@/views/ProductsTableView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router
