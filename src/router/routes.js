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
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: () => import('@/pages/Admin.vue')
  // },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/pages/Payment.vue'),
    beforeEnter: ifAuthenticated,
    props: route => ({
      data: route?.query?.data ?? false
    })
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
    beforeEnter: ifAuthenticated
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/Map.vue'),
    props: route => ({
      isMap: route?.query?.isMap ?? false
    }),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/pages/UserInfo.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/other-user/:id',
    name: 'other-user',
    component: () => import('@/pages/OtherUserInfo.vue'),
    props: route => ({
      id: route?.query?.id ?? false
    }),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/publication/create',
    name: 'createPublication',
    component: () => import('@/pages/PublicationCreate.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/tour/guide/create',
    name: 'createTourGuide',
    component: () => import('@/pages/PublicationCreateGuide.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/publication/:id',
    name: 'publication',
    component: () => import('@/pages/Publication.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/tour/:id',
    name: 'tour',
    component: () => import('@/pages/Tour.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/publication/create-route',
    name: 'createRoute',
    component: () => import('@/pages/Map.vue'),
    props: route => ({
      create: route?.query?.create ?? undefined,
      isTour: route?.query?.isTour ?? undefined
    }),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/view-route',
    name: 'view-route',
    component: () => import('@/pages/Map.vue'),
    props: route => ({
      outerRoute: route.query.outerRouteIds ?? undefined
    }),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/favourite/:id',
    name: 'favourite',
    component: () => import('@/pages/Favourite.vue'),
    beforeEnter: ifAuthenticated
  }
]
export default routes
