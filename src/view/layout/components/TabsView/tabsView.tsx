import { defineComponent, watch, reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useNavTabsStore } from '@/store/navTabs.ts'
import Link from '../Sidebar/Link.tsx'
import { Close } from '@element-plus/icons-vue'
import Routes from '@/store/routes.json'

export default defineComponent({
  name: 'tabsView',
  setup() {
    const Route = useRoute()
    const Router = useRouter()
    const St = reactive({
      menu: []
    })
    const navbar = useNavTabsStore()

    navbar.setMenuRoutes(Routes)

    navbar.addTab(Route)
    watch(Route, () => {
      navbar.addTab(Route)
      console.log(' Watch Watch',  Route.meta.title)
      console.log('Watch St.menu ', St.menu,)
    })

    const isActive = (route) => {
      console.log('isActive', route.path, Route.paths)
      return route.path === Route.path
    }

    const closeSelectedTag = (view) => {
      navbar.closeTab(view)
    }

    const teeee = () => {
      console.log('Primary St.menu', St.menu)
    }

    return () => (
      <div id="tags-view-container" class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper">
          { navbar.tabsView.map((tab: any) => (
            <RouterLink
              to={{ path: tab.path }}
              key={tab.path}
              ref="tab"
              tag="span"
              class={[isActive(tab) ? 'active' : '', 'tags-view-item']}
            >
              {tab.meta.title}
              { !tab.meta.affix && <el-icon class="el-icon-close"><Close onclick={() => closeSelectedTag(tab)} /></el-icon>}
            </RouterLink>
            // <router-link
            //   to={{ path: tab.path, query: tab.query, fullPath: tab.fullPath }}
            //   tag="span"
            //   // @contextmenu.prevent.native="openMenu(tag,$event)"
            // >
            // </router-link>
          ))}
        </el-scrollbar>
      </div>
    )
  }
})
