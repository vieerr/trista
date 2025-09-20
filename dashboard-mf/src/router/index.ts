import BusinnessSummary from '@/components/BusinnessSummary.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: BusinnessSummary,
    },
  ],
})

export default router
