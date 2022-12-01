import { defineComponent } from 'vue'
import classname from 'classnames'
// import Navbar from './components/Navbar';
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import Navbar from './components/Navbar.tsx'
import TagsView from './components/TabsView/tabsView.tsx'
// import { Navbar, Sidebar, AppMain, TagsView } from './components';
import './layout.scss'
import { useappStore } from '@/store/app.ts'
// import ResizeMixin from './mixin/ResizeHandler'
import { useNavTabsStore } from '@/store/navTabs.ts'

export default  defineComponent({
  name: 'Layout',
//   mixins: [ResizeMixin],
  setup() {

    const appStore = useappStore()
    const { opened, device, withoutAnimation } = storeToRefs(appStore)
    const { CloseSideBar } = appStore

    const wrapStyle = () => {
      return {
        hideSidebar: !opened.value,
        openSidebar: opened.value,
        withoutAnimation: withoutAnimation.value,
        mobile: device.value === 'mobile'
      }
    }

    const DrawBack = () => device.value ==='mobile' && opened.value && <div class="drawer-bg" onclick={CloseSideBar(false)} />

    return () => (
      <div className={classname(wrapStyle(),'app-wrapper')}>
        <DrawBack />
        <Sidebar class="sidebar-container" />
        <div class="main-container">
          <Navbar />
          <TagsView />
          <AppMain />
        </div>
      </div>
    )
  }
})


// import ResizeMixin from './mixin/ResizeHandler'

// export default {
//   components: {
//     TagsView
//   },
//   mixins: [ResizeMixin],
// }