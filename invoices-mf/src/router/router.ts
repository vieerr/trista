import { createRouter, createWebHistory } from 'vue-router'

import TableView from '../views/TableView.vue'
import FormView from '../views/FormView.vue'
import DetailView from '@/views/DetailView.vue'

const routes = [
  { path: '/', component: TableView, name: 'InvoicesTable' },
  { path: '/add', component: FormView, name: 'AddInvoice' },
  { path: '/view/:id', component: DetailView, name: 'EditInvoice', props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
