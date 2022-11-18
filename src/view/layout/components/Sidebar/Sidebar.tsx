import { defineComponent, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useNavTabsStore } from '@/store/navTabs.ts'
import { useappStore } from '@/store/app.ts'
import variables from '@/styles/variables.module.scss'        // ??
import SideBarItem from './SideBarItem.tsx'

const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
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
          background-color={ variables.menuBg}
          text-color={variables.menuText}
          active-text-color={variables.menuActiveText}
          class="el-menu-vertical-demo"
          mode="vertical"
        >
          { menuRoutes.value.map((route: any) => <SideBarItem key={route.path} item={route} base-path={route.path}/>) }
        </el-menu>
      </el-scrollbar>
    )
  }
})

export default SideBar