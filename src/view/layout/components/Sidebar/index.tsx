import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import { useuserStore } from '@/store/user.ts'
import { useappStore } from '@/store/app.ts'
import variables from '@/styles/variables.scss'
import SideBarItem from './SideBarItem.tsx'


const SideBar = defineComponent({
  name: 'SideBar',
  setup() {
    const Route = useRoute()
    const Router = useRouter()

    const userStore = useuserStore()
    const appStore = useappStore()

    const { routers } = storeToRefs(userStore)

    console.log('routers routers',  routers)
    console.log('onMounted', appStore)

    const isCollapse =  computed(() => appStore.sidebar.opened)

    const go = () => {
        Router.push({ name: '/' })
    }

    return () => (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active={Route.path}
          collapse={isCollapse}
          background-color={variables.menuBg}
          text-color={variables.menuText}
          active-text-color={variables.menuActiveText}
          collapse-transition="false"
          mode="vertical"
        >
          { routers.value.map((route: any) => <SideBarItem key={route.path} item={route} base-path={route.path}/>) }
        </el-menu>
      </el-scrollbar>
    )
  }
})

export default SideBar