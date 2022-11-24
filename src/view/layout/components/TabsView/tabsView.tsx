import { defineComponent, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useNavTabsStore } from '@/store/navTabs.ts'
import Link from '../Sidebar/Link.tsx'
import { Close } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'tabsView',
  setup() {
    const Route = useRoute()
    const Router = useRouter()

    const navbar = useNavTabsStore()

    navbar.addTab(Route)
    watch(Route, () => {
      console.log('Watch ', Route.meta.title)
      navbar.addTab(JSON.parse(JSON.stringify(Route)))
    })

    const isActive = (route) => {
      console.log('isActive', route.path, Route.paths)
      return route.path === Route.path
    }

    const closeSelectedTag = (view) => {
      navbar.closeTab(view)
    }

    const teeee = (tab) => {
      console.log('teeee', tab)
    }

    return () => (
      <div id="tags-view-container" class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper">
          { navbar.tabsView.map((tab: any) => (

            <RouterLink
              to={{ path: tab.path, query: tab.query, fullPath: tab.fullPath }}
              key={tab.path}
              ref="tab"
              tag="span"
              class={[isActive(tab) ? 'active' : '', 'tags-view-item']}
            >
              {tab.meta.title} {teeee(tab.meta)}
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
