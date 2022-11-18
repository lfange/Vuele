import { defineComponent, reactive } from 'vue'
import classname from 'classnames'
// import Navbar from './components/Navbar';
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import Navbar from './components/Navbar.tsx'
// import TagsView from './components/TagsView/index.vue'
// import { Navbar, Sidebar, AppMain, TagsView } from './components';
import './layout.scss'
import { useappStore } from '@/store/app.ts'
// import ResizeMixin from './mixin/ResizeHandler'

const Layout = defineComponent({
  name: 'Layout',
//   mixins: [ResizeMixin],
  setup() {
    const St = reactive({
      device: 'mobile',
      sidebar: {
        opened: true
      }
    })

    const appStore = useappStore()
    const { opened, falgs, device, withoutAnimation } = storeToRefs(appStore)
    const { CloseSideBar } = appStore

    console.log('sidebarsidebarsidebar', falgs)
    const handleClickOutside = () => {
      // this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      CloseSideBar(false)
      console.log('handleClickOutside', sidebar)
    }

    const wrapStyle = () => {
      return {
        hideSidebar: opened.value,
        openSidebar: opened.value,
        withoutAnimation: withoutAnimation.value,
        mobile: device.value === 'mobile'
      }
    }

    const DrawBack = () => St.device ==='mobile' && opened.value && <div class="drawer-bg" onclick={handleClickOutside} />

    const changes = () => {
      console.log('device')
      appStore.$patch({
        device: 'webpackks',
        falgs: 'change falgs'
      })
    }
    
    // classObj,
    return () => (
      <div className={classname(wrapStyle(),'app-wrapper')}>
        { DrawBack() }
        <Sidebar class="sidebar-container" />
        <div class="main-container">
          <el-button type="primary" onclick={changes}>Primary</el-button>
          opened: { ~opened.value }
          <div>div:\ { appStore.falgs } </div>
          <div>:\falgs { falgs.value } </div>
          <p>device: {device.value} </p>
          St: { St.device }
          {/* <Navbar /> */}
          {/* <tags-view /> */}
          <AppMain />
        </div>
      </div>
    )
  }
})

export default Layout

// import ResizeMixin from './mixin/ResizeHandler'

// export default {
//   components: {
//     TagsView
//   },
//   mixins: [ResizeMixin],
//   computed: {
//     classObj() {
//       return {
//         hideSidebar: !this.sidebar.opened,
//         openSidebar: this.sidebar.opened,
//         withoutAnimation: this.sidebar.withoutAnimation,
//         mobile: this.device === 'mobile'
//       }
//     }
//   },
//   methods: {
//     handleClickOutside() {
//       this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
//     }
//   }
// }