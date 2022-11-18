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
      sidebar: {
        opened: true
      }
    })

    const appStore = useappStore()
    const { opened, falgs, device, withoutAnimation } = storeToRefs(appStore)
    const { CloseSideBar } = appStore

    const handleClickOutside = () => {
      // this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      CloseSideBar(false)
    }

    const wrapStyle = () => {
      return {
        hideSidebar: !opened.value,
        openSidebar: opened.value,
        withoutAnimation: withoutAnimation.value,
        mobile: device.value === 'mobile'
      }
    }

    const DrawBack = () => device.value ==='mobile' && opened.value && <div class="drawer-bg" onclick={handleClickOutside} />

    const changes = () => {
      appStore.$patch({
        device: 'mobile',
        falgs: 'change falgs'
      })
    }
    
    // classObj,
    return () => (
      <div className={classname(wrapStyle(),'app-wrapper')}>
        { DrawBack() }
        <Sidebar class="sidebar-container" />
        <div class="main-container">
          <Navbar />
          <el-button type="primary" onclick={changes}>Primary</el-button>
            opened: { opened.value ? '111' : '222' }
            <div>div:\ { appStore.falgs } </div>
            <div>:\falgs { falgs.value } </div>
            <p>device: {device.value} </p>
            St: { St.sidebar.opened }
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