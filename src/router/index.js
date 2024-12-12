import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/botanicals',
      name: 'botanicals',
      // route level code-splitting
      // this generates a separate chunk (botanicals.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BotanicalsView.vue'),
    },
    {
      path: '/flora',
      name: 'flora',
      // route level code-splitting
      // this generates a separate chunk (flora.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FloraView.vue'),
    },
    {
      path: '/house',
      name: 'house',
      // route level code-splitting
      // this generates a separate chunk (house.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HouseView.vue'),
    },
    {
      path: '/italy',
      name: 'italy',
      // route level code-splitting
      // this generates a separate chunk (italy.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ItalyView.vue'),
    },
    {
      path: '/sanfran',
      name: 'sanfran',
      // route level code-splitting
      // this generates a separate chunk (sanfran.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SanFranView.vue'),
    },
    {
      path: '/roads',
      name: 'roads',
      // route level code-splitting
      // this generates a separate chunk (roads.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OtherRoadsView.vue'),
    },
  ],
})

export default router
