import { defineComponent, onMounted, reactive } from 'vue'
import classname from 'classnames'
// import Navbar from './components/Navbar';
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.tsx'
import Navbar from './components/Navbar.tsx'
// import { Navbar, Sidebar, AppMain, TagsView } from './components';
import './layout.scss'
import { useappStore } from '@/store/app.ts'

const Layout = defineComponent({
  name: 'Layout',
  setup() {
    const St = reactive({
      device: 'mobile',
      sidebar: {
        opened: true
      }
    })

    const appStore = useappStore()
    const { CloseSideBar } = appStore
    const { sidebar } = storeToRefs(appStore)

    console.log('sidebarsidebarsidebar', sidebar, sidebar.value.opened)
    const handleClickOutside = () => {
      // this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      CloseSideBar(false)
      console.log('handleClickOutside', sidebar)
    }
    const classObj = () => {}

    const DrawBack = () => St.device==='mobile' && sidebar.value.opened && <div class="drawer-bg" onclick={handleClickOutside} />

    // classObj,
    return () => (
      <div className={classname('app-wrapper')}>
        { DrawBack() }
        <Sidebar class="sidebar-container" />
        <div class="main-container">
          <Navbar />
          {/* <tags-view /> */}
          {/* <AppMain /> */}
        </div>
      </div>
    )
  }
})

export default Layout

// import { Navbar, Sidebar, AppMain, TagsView } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

// export default {
//   name: 'Layout',
//   components: {
//     Navbar,
//     Sidebar,
//     AppMain,
//     TagsView
//   },
//   mixins: [ResizeMixin],
//   computed: {
//     sidebar() {
//       return this.$store.state.app.sidebar
//     },
//     device() {
//       return this.$store.state.app.device
//     },
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