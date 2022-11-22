import { defineComponent, computed, Transition, KeepAlive } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router';
import { useNavTabsStore } from '@/store/navTabs.ts'

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
  },
  setup() {

    const Route = useRoute()
    const Router = useRouter()

    const Component = computed(() => Route[this.currentPath.slice(1) || '/'] || NotFound)

    const navTabsStore = useNavTabsStore()
    const { tabsView } = storeToRefs(navTabsStore)
    console.log('Router', Router)

    const key = computed(() => Route.fullPath)
    console.log('tabsView', tabsView)

    return () => (
      <section class="app-main">
        <Transition name="fade-transform" mode="out-in">
          <KeepAlive include={tabsView.value}>
            <router-view key={key.value} />
          </KeepAlive>
          {/* <router-view v-slot={ Component } >
            <KeepAlive include={tabsView.value}>
              <component is={Component} />
            </KeepAlive>
          </router-view> */}
        </Transition>
      </section>
    )
  }
})

export default AppMain