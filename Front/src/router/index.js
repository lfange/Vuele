import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    {
      // meta: {
      //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      // }, 
      path: '/main',
      name: 'main',
      component:  resolve=> require(['@/view/index'],resolve),
      children:[
        // {
        //   path:" ",
        //   component:  resolve=> require(['@/view/ '],resolve),
        //   // meta: {
        //   //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        //   // }
        // },
      ]
    },
    // {
    //   path: '*',
    //   redirect: '/main'
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    // if (cookies('LoginClick')) {
    //     
    // } else {
    //    next({path: '/login',query: { redirect: to.fullPath }})
    // }
  } else {
      next();
  }

})

export default router