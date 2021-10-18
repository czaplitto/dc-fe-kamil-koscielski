import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: () => import('../components/Search.vue'),
    children: [{
      path: '/',
      component: () => import('../components/Table.vue'),
      props: true,
    }, {
      path: '/favorites',
      component: () => import('../components/Table.vue'),
      props: true,
    }],
    props:true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
