import { defineComponent, onMounted, reactive } from 'vue'
import classname from 'classnames'
// import Navbar from './components/Navbar';
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.tsx'
// import { Navbar, Sidebar, AppMain, TagsView } from './components';
import './layout.scss'

const Layout = defineComponent({
  name: 'Layout',
  setup() {
    const St = reactive({
      device: 'mobile',
      sidebar: {
        opened: false
      }
    })

    onMounted(() => {

    })

    const handleClickOutside = () => {
      // this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      console.log('handleClickOutside')
    }
    const classObj = () => {}

    const DrawBack = () => St.device==='mobile' && St.sidebar.opened && <div class="drawer-bg" onclick={handleClickOutside} />

    // classObj,
    return () => (
      <div className={classname('app-wrapper')}>
        { DrawBack() }
        <Sidebar class="sidebar-container" />
        <div class="main-container">
          classObj,
          {/* <Navbar /> */}
          {/* <tags-view /> */}
          {/* <AppMain /> */}
        </div>
      </div>
    )
  }
})

export default Layout

{
  /* <template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view />
      <app-main/>
    </div>
  </div>
</template>

<script setup>



</script>
<!-- <script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script> -->

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style> */
}
