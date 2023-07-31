import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('tryLogin').then(() => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  })
})

export default router
