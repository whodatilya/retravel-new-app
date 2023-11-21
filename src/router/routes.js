const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
    return
  }
  next('/login')
}
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/signUp',
    name: 'register',
    component: () => import('@/pages/Register.vue')
  },
  {
      path: '/',
      name: 'index',
      component: () => import('@/pages/Index.vue'),
      // beforeEnter: ifAuthenticated
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/Map.vue'),
    // beforeEnter: ifAuthenticated
  }
]
export default routes
