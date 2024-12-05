import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    // Dit zorgt ervoor dat de component pas geladen wordt wanneer de route bezocht wordt
    component: () => import('../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
