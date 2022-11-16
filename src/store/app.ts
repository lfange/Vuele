import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import Cookies from 'js-cookie'

export const useappStore = defineStore('app', () => {
  const state = reactive({
    device: 'mobile',
    falgs: 'falgs',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    }
  })
      
  // toggle sidebar
  const ToggleSicebar = () => {
    state.sidebar.opened = !state.sidebar.opened
    Cookies.set('sidebarStatus', +state.sidebar.opened)
    console.log('TOGGLE_SIDEBAR', state.sidebar.opened, state.sidebar.opened, )
  }

  const CloseSideBar = (withoutAnimation: boolean) => {
    console.log('CloseSideBar', state.sidebar.opened, state.sidebar.opened, )
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
  
  return {
    ...toRefs(state),
    ToggleSicebar,
    CloseSideBar,
  }
})