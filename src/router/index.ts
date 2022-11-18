import { createRouter, createWebHashHistory } from "vue-router";

const Layout = () => import('@/view/layout/Layout.tsx')

const routes: any[] = [
  {
    path: '/',
    component: Layout,
    // name: 'dashboard',
    children: [
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
  },
  {
    path: '/tsx',
    name: 'tsx',
    component: () => import('@/view/layout/Layout.tsx')
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

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router