import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import { useNavTabsStore } from '@/store/user.ts'
import { useappStore } from '@/store/app.ts'
import variables from '@/styles/variables.scss'
import SideBarItem from './SideBarItem.tsx'


const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
    const Route = useRoute()
    const Router = useRouter()

    const navTabsStore = useNavTabsStore()
    const appStore = useappStore()

    const { menuRoutes } = storeToRefs(navTabsStore)
    const { sidebar } = storeToRefs(appStore)

    console.log('routers routers',  menuRoutes)
    console.log('onMounted', appStore)

    const isCollapse =  computed(() => appStore.sidebar.opened)
    
    console.log('isCollapse', isCollapse)
    console.log('sidebar', sidebar)
    
    const go = () => {
        Router.push({ name: '/' })
    }

    const handleSelect = () => {
      console.log('handleSelect')
    }

    return () => (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active={Route.path}
          collapse={sidebar.open}
          background-color={variables.menuBg}
          text-color={variables.menuText}
          active-text-color={variables.menuActiveText}
          collapse-transition="false"
          mode="vertical"
        >
          { menuRoutes.value.map((route: any) => <SideBarItem key={route.path} item={route} base-path={route.path}/>) }
        </el-menu>

        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="vertical"
          onselect={handleSelect}
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          {/* <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> */}
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </el-scrollbar>
    )
  }
})

export default SideBar