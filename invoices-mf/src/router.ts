import { createMemoryHistory, createRouter } from 'vue-router'

import TableView from './views/TableView.vue'
import FormView from './views/FormView.vue'

const routes = [
  { path: '/', component: TableView },
  { path: '/form', component: FormView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
