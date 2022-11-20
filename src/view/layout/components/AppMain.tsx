import { defineComponent, computed, Transition, KeepAlive } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNavTabsStore } from '@/store/navTabs.ts'

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
  },
  setup() {

    const Route = useRoute()

    const navTabsStore = useNavTabsStore()
    const { tabsView } = storeToRefs(navTabsStore)

    const key = computed(() => Route.fullPath)
    console.log('tabsView', tabsView)

    return () => (
      <section class="app-main">
        <Transition name="fade-transform" mode="out-in">
          <KeepAlive include={tabsView.value}>
            <router-view key={key.value} />
          </KeepAlive>
        </Transition>
      </section>
    )
  }
})

export default AppMain