import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('../0.test/')
  },
  {
    path: '/high-order',
    name: 'highOrder',
    component: () => import('../1.high-order/')
  },
  {
    path: '/pub-sub',
    name: 'pubSub',
    component: () => import('../2.pub-sub/index1')
  },
  {
    path: '/observer',
    name: 'Observer',
    component: () => import('../3.observer/')
  },
  {
    path: '/promise',
    name: 'Promise',
    component: () => import('../4.promise/')
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('../5.generator/')
  },
  {
    path: '/es6',
    name: 'Es6',
    component: () => import('../6.es6')
  },
  {
    path: '/compose',
    name: 'compose',
    component: () => import('../7.compose')
  },
  {
    path: '/curry',
    name: 'curry',
    component: () => import('../8.curry')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
