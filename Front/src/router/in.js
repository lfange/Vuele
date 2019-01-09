Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 @a653398363 Sign out
0
0 0 oufish/vue-vuex-axios
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
vue-vuex-axios/src/router/index.js
0bcf268  on 28 May 2017
@oufish oufish vue
     
99 lines (93 sloc)  2.77 KB
import Vue from 'vue';
import Router from 'vue-router';
import store from './../vuex/store';
import cookies from 'cookiesjs';
import content from '../components/index/content';
import login from './../components/login/login.vue';

Vue.use(Router);
const router = new Router({
  // mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      path: '/main',
      name: 'main',
      component: content,
      children: [
        {
          path:"",
          component:resolve => require(['@/view/index/index.vue'], resolve),
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'Sys/LogManagement/',
          component: resolve => require(['@/view/Sys/LogManagement/index.vue'], resolve),
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'Sys/ModuleManagement/',
          component: resolve => require(['@/view/Sys/ModuleManagement/index.vue'], resolve),
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'Sys/RoleManagement/',
          component: resolve => require(['@/view/Sys/RoleManagement/index.vue'], resolve),
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'Sys/UserManagement/',
          component: resolve => require(['@/view/Sys/UserManagement/index.vue'], resolve),
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
      ]
    }
    ,
    {
      path: '*',
      redirect: '/main'
    }
  ]
})
 
const addTab = (getLeftMenu, to) => {
  getLeftMenu.forEach((item) => {
    if (item.ModuleUri == to.path) {
      store.dispatch('changeUrlState', '' + item.ModuleId)
      store.dispatch('addOpenTab', item)
    }
  })
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
      if (cookies('LoginClick')) {
            if (store.getters.getLeftMenu.length) {
              addTab(store.getters.getLeftMenu, to)
            } else {
              store.dispatch('getLeftMenuActions').then(() => {
                addTab(store.getters.getLeftMenu, to)
              })
            }
            next();
      } else {
         next({path: '/login',query: { redirect: to.fullPath }})
      }
    } else {
        next();
    }

})

export default router