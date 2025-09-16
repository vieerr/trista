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
  ],
})

export default router
