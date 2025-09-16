import TestComponent from '@/components/TestComponent.vue'
import FormView from '@/views/FormView.vue'
import TableView from '@/views/TableView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'InvoicesTable',
    component: TableView,
  },
  {
    path: '/add',
    name: 'AddInvoice',
    component: FormView,
  },
  {
    path: '/test',
    name: 'Test',
    component: TestComponent,
  },
]

export default routes
