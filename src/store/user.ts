import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import Routes from './routes.json'

export const useuserStore = defineStore('user', () => {
  const state = reactive({
    /* 用于渲染菜单*/
    routers: [
      {
        name: 'user'
      }
    ]
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