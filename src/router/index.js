import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/receptores',
      name: 'receptores',
      component: () => import('@/views/ReceptoresView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// proteger las rutas 
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else {
    if (to.path === '/' && localStorage.getItem('token')) {
      next('/home');
    } else {
      next()
    }
  }
})

export default router;
