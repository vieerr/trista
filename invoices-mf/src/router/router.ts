import { createRouter, createWebHistory } from 'vue-router'

import TableView from '../views/TableView.vue'
import FormView from '../views/FormView.vue'

const routes = [
  { path: '/', component: TableView, name: 'InvoicesTable' },
  { path: '/add', component: FormView, name: 'AddInvoice' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
