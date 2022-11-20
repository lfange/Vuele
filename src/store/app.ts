import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
// import Cookies from 'js-cookie'

export const useappStore = defineStore('app', () => {
  const state = reactive({
    device: 'desktop',
    falgs: 'falgs',
    opened: true,
    withoutAnimation: false
  })
      
  // toggle sidebar
  const ToggleSicebar = () => {
    state.opened = !state.opened
    // Cookies.set('sidebarStatus', +state.opened)
    console.log('TOGGLE_SIDEBAR ======', state.opened, state)
  }

  const CloseSideBar = (withoutAnimation: boolean) => {
    console.log('CloseSideBar', state.opened, state.opened, withoutAnimation )
    // Cookies.set('sidebarStatus', 1)
    state.opened = false
    state.withoutAnimation = withoutAnimation
  }
  
  return {
    ...toRefs(state),
    ToggleSicebar,
    CloseSideBar,
  }
})