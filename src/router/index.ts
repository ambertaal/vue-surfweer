import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // Dit zorgt ervoor dat de component pas geladen wordt wanneer de route bezocht wordt
    component: () => import('@/views/about/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
