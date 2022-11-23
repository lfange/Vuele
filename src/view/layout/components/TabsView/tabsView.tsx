import { defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavTabsStore } from '@/store/navTabs.ts'

export default defineComponent({
  name: 'tabsView',
  setup() {
    const Route = useRoute()
    const Router = useRouter()
    
    const navbar = useNavTabsStore()

    console.log('navbar', navbar)
    watch(Route, () => {
      navbar.addTab()
    })

    const isActive = (route) => route.path === Route.path
   
    const closeSelectedTag = (view) => {
      navbar.closeTab(view)
      // this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      //   if (this.isActive(view)) {
      //     this.toLastView(visitedViews)
      //   }
      // })
    }

    console.log('navbar.tabsView', navbar.tabsView)
    return () => (
      <div id="tags-view-container" class="tags-view-container">
        <el-scrollbar >
          {
            navbar.tabsView.map((tab: any) => 
              <router-link
                ref="tag"
                key={tab.path}
                class={[isActive(tab)?'active':'', 'tags-view-item']}
                to={{ path: tab.path, query: tab.query, fullPath: tab.fullPath }}
                tag="span"
                onclick={closeSelectedTag(tab)}
                // @contextmenu.prevent.native="openMenu(tag,$event)"
              >
                { tab.title }
                <span v-if="!tag.meta.affix" class="el-icon-close" onclick={closeSelectedTag(tab)} />
              </router-link>
            )
          }
          tagsViewtagsViewtagsViewtagsViewtagsViewtagsViewtagsViewtagsViewtagsViewtagsView
        </el-scrollbar>
      </div>
    )
  }
})
