import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNavTabsStore } from '@/store/navTabs.ts'

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
    title: String
  },
  setup(props) {
    console.log('props', props)

    const Route = useRoute()

    const navTabsStore = useNavTabsStore()
    const { tabsView } = storeToRefs(navTabsStore)

    const key = computed(() => Route.fullPath)

    return () => (
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive include={tabsView.value}>
            <router-view key={key.value} />
          </keep-alive>
        </transition>
      </section>
    )
  }
})

export default AppMain