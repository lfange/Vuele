import { defineComponent, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useNavTabsStore } from '@/store/navTabs.ts'
import { useappStore } from '@/store/app.ts'
// import variables from '@/styles/variables.scss'        // ??
import SideBarItem from './SideBarItem.tsx'

const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
    const St = reactive({
      variables: {
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
        subMenuActiveText: '#f4f4f5',
        menuBg: '#304156',
        menuHover: '#263445',
        subMenuBg: '#1f2d3d',
        subMenuHover: '#001528',
        sideBarWidth: '210px'
      }
    })
    const Route = useRoute()
    const Router = useRouter()

    const navTabsStore = useNavTabsStore()
    const appStore = useappStore()
    const { setMenuRoutes } = navTabsStore
    const { menuRoutes } = storeToRefs(navTabsStore)

    setMenuRoutes()

    return () => (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active={Route.path}
          collapse={appStore.open}
          background-color={ St.variables.menuBg}
          text-color={St.variables.menuText}
          active-text-color={St.variables.menuActiveText}
          collapse-transition="false"
          mode="vertical"
        >
          { menuRoutes.value.map((route: any) => <SideBarItem key={route.path} item={route} base-path={route.path}/>) }
        </el-menu>
      </el-scrollbar>
    )
  }
})

export default SideBar