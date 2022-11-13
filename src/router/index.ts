import { createRouter, createWebHashHistory } from "vue-router";

import Layout from '@/view/layout/Layout.vue'

const routes: any[] = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/view/index.tsx')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/layout/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/components/layout/layout.tsx')
  },
  {
    path: '/dball',
    name: 'dball',
    component: () => import('@/view/dball.tsx'),
    meta: {
      title: 'meta'
    }
  },
  {
    path: '/luckb',
    name: 'luckb',
    component: () => import('@/view/luckb.vue'),
    meta: {
      title: 'meta'
    }
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router