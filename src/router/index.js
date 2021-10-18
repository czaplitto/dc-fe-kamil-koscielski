import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: () => import('../components/Search.vue')
  },
  {
    path: '/',
    name: 'Table',
    component: () => import('../components/Table.vue')
  },
  {
    path: '/favorites',
    name: 'Table',
    component: () => import('../components/Table.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
