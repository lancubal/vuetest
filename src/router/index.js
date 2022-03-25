import { createRouter, createWebHistory } from 'vue-router'
import Visor from '../views/Visor.vue'
import Login from '../views/Login.vue'

import store from '../store/store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { disallowAuthed: true }
  },
  {
    path: '/visor-ee',
    name: 'Visor',
    component: Visor,
    meta: {
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.user.tokens) {
    next({ name: 'Login', query: { to: to.path } })
  } else if (store.state.user.tokens && to.meta.disallowAuthed) {
    return router.push('/visor-ee')
  }
  return next()
})

export default router
