import { isEmpty } from 'lodash-es'
import { defineStore } from 'pinia'
import { i18n } from '../lang'
import { reactive, toRefs } from 'vue'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import { NavTabs } from '@/store/interface/index.ts'

export const useNavTabsStore = defineStore('navTabs', () => {

  const state: NavTabs = reactive({
    // 激活tab的index
    activeIndex: 0,
    // 激活的tab
    activeRoute: null,
    // tab列表
    tabsView: [],
    paths: [],
    tabFullScreen: false,
    // 从后台加载到的菜单路由列表
    menuRoutes: [],
  })
      
  function addTab(route) {
    console.log(route.meta.title, ':=> ', route, )
    if (!route.meta.addtab) return
    for (const key in state.tabsView) {
      console.log('key', key)
        if (state.tabsView[key].path === route.path) {
            state.tabsView[key].params = !isEmpty(route.params) ? route.params : state.tabsView[key].params
            state.tabsView[key].query = !isEmpty(route.query) ? route.query : state.tabsView[key].query
            return
        }
    }
    if (typeof route.meta.title == 'string') {
        route.meta.title = route.meta.title.indexOf('pagesTitle.') === -1 ? route.meta.title : i18n.global.t(route.meta.title)
    }
    state.paths.push(route.path)
    state.tabsView.push({ path: route.path, meta: route.meta })
    console.log('addTab pushpush', state.tabsView)
  }

  function closeTab(route: RouteLocationNormalized) {
      state.tabsView.map((v: RouteLocationNormalized, k: number) => {
          if (v.path == route.path) {
              state.tabsView.splice(k, 1)

              if (!state.tabsView.length){
                state.tabsView.push({ path: '/dashboard', meta: { title: '首页' } })
              }
              return
          }
      })
  }

  const setMenuRoutes = (data: RouteRecordRaw[]): void => {
    if (data) {
      state.menuRoutes = encodeRoutesURI(data)
      return
    }
  }

  return {
    ...toRefs(state),
    addTab,
    closeTab,
    setMenuRoutes
  }
})

/**
 * 对iframe的url进行编码
 */
 function encodeRoutesURI(data: RouteRecordRaw[]) {
   data.forEach((item) => {
      if (item.meta?.type == 'iframe') {
          item.path = '/admin/' + encodeURIComponent(item.path)
      }

      if (item.children && item.children.length) {
          item.children = encodeRoutesURI(item.children)
      }
  })
  return data
}
