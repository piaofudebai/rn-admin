import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/home/users',
    children: [
      { path: 'users', name: 'users', component: () => import('@/views/Users') },
      { path: 'roles', name: 'roles', component: () => import('@/views/Roles') },
      { path: 'rights', name: 'rights', component: () => import('@/views/Rights') },
      { path: 'goods', name: 'goods', component: () => import('@/views/Goods') },
      { path: 'add', name: 'add', component: () => import('@/views/Goods/components/add.vue') },
      { path: 'params', name: 'params', component: () => import('@/views/Params') },
      { path: 'categories', name: 'categories', component: () => import('@/views/Categories') },
      { path: 'orders', name: 'orders', component: () => import('@/views/Orders') },
      { path: 'reports', name: 'reports', component: () => import('@/views/reports') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
