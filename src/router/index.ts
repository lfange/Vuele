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
          title: 'dball'
        }
      },
      {
        path: '/luckb',
        name: 'luckb',
        component: () => import('@/view/luckb.vue'),
        meta: {
          title: 'luckb',
          breadcrumb: true
        }
      },
      {
        path: '/qindex',
        name: 'qindex',
        component: () => import('@/view/index.tsx'),
        meta: {
          title: 'qindex'
        }
      },
      {
        path: '/db',
        name: 'db',
        component: () => import('@/view/db.tsx'),
        meta: {
          title: 'db',
          breadcrumb: true
        }
      },
      {
        path: 'menu/two/roles',
        name: 'roles',
        component: () => import('@/view/roles.tsx'),
        meta: {
          title: 'roles',
          breadcrumb: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'dashboard titlem'
    },
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