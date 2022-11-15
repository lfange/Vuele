import { defineComponent } from 'vue';

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
    title: String
  },
  setup(props) {
    console.log('props', props)

    return () => (
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive include={cachedViews}>
            <router-view key={key} />
          </keep-alive>
        </transition>
      </section>
    )
  }
})

export default AppMain