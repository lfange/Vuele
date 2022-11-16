import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import { useNavTabsStore } from '@/store/navTabs.ts'
import { useappStore } from '@/store/app.ts'
import variables from '@/styles/variables.scss'
import SideBarItem from './SideBarItem.tsx'
import MenuTitle from './menuTitle.vue'


const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
    const Route = useRoute()
    const Router = useRouter()

    const navTabsStore = useNavTabsStore()
    const appStore = useappStore()
    const { setMenuRoutes } = navTabsStore
    const { menuRoutes } = storeToRefs(navTabsStore)
    console.log('routers routers',  menuRoutes)
    console.log('onMounted', appStore)

    const isCollapse =  computed(() => appStore.opened)
    
    console.log('isCollapse', isCollapse)
    
    const go = () => {
        Router.push({ name: '/' })
    }

    const handleSelect = () => {
      console.log('handleSelect', menuRoutes)
    }

    setMenuRoutes()

    console.log('variables', variables.menuBg)
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>,
    };
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
        
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="vertical"
          onSelect={handleSelect}
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
            <MenuTitle />
          <el-sub-menu index="2">
            <span >menuTitle</span>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2-4">
            <template v-slots={{
              default: () => <span>'header'</span>,
              title: () => ( <div>ope.name</div>),
              // content: () => <span>侧边导航栏</span>,
              title1: () => { return (
                <>
                  <el-icon><location /></el-icon>
                  <span>侧边导航栏</span>
                </>
              );}
            }} ></template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">{variables}</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </el-scrollbar>
    )
  }
})

export default SideBar