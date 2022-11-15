import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import Routes from './routes.json'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export const usetagsViewStore = defineStore('tagsView', () => {
  const state = reactive({
    /* 用于渲染菜单*/
    visitedViews: [],
    cachedViews: []
  })
      
  const GetRoutes = () => {
    console.log('GetRoutes', state.routers)
    state.routers.value = Routes
  }

  return {
    ...toRefs(state),
    GetRoutes
  }
})