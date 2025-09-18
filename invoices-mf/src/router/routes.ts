import TestComponent from '@/components/TestComponent.vue'
import DetailView from '@/views/DetailView.vue'
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
    path: '/view/:id',
    name: 'ViewInvoice',
    component: DetailView,
    props: true,
  },
  {
    path: '/test',
    name: 'Test',
    component: TestComponent,
  },
]

export default routes
