import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import { useNavTabsStore } from '@/store/navTabs.ts'
import { useappStore } from '@/store/app.ts'
import variables from '@/styles/variables.scss'
import SideBarItem from './SideBarItem.tsx'
import MenuTitle from './menuTitle.vue'
import { Location, } from '@element-plus/icons-vue'


const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
    const Route = useRoute()
    const Router = useRouter()

    const navTabsStore = useNavTabsStore()
    const appStore = useappStore()
    const { setMenuRoutes } = navTabsStore
    const { menuRoutes } = storeToRefs(navTabsStore)

    const isCollapse =  computed(() => appStore.opened)
    
    
    const go = () => {
        Router.push({ name: '/' })
    }

    const handleSelect = () => {
      console.log('handleSelect', menuRoutes)
    }

    setMenuRoutes()

    return () => (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active={Route.path}
          collapse={appStore.open}
          background-color={variables.menuBg}
          text-color={variables.menuText}
          active-text-color={variables.menuActiveText}
          collapse-transition="false"
          mode="vertical"
        >
          { menuRoutes.value.map((route: any) => <SideBarItem key={route.path} item={route} base-path={route.path}/>) }
        </el-menu>
        
        {/* <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="vertical"
          onSelect={handleSelect}
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
            <MenuTitle />
            <el-sub-menu index='/cs/sys' v-slots={{
                default: () => <span>'header'</span>,
                title: () => (
                  <div>
                    <el-icon><Location /></el-icon>
                    <span>系统管理</span>
                  </div>)
              }}>
            <el-menu-item index='/cs/sys/user'>用户管理</el-menu-item>
          </el-sub-menu>

          <el-menuitem index="3">{variables}</el-menuitem>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu> */}
      </el-scrollbar>
    )
  }
})

export default SideBar