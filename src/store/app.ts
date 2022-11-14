import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import Cookies from 'js-cookie'

export const useappStore = defineStore('app', () => {
  const state = reactive({
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    }
  })
      
  // 也可以这样定义
  const increment = () => {
    state.sidebar.opened = !state.sidebar.opened
  }
  return {
    ...toRefs(state)
  }
})