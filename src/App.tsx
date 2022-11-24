import { defineComponent } from 'vue'

const App = defineComponent({
  setup() {
    return () => (
      <router-view>
        {{
          default: ({ Component, route }: { Component: () => JSX.Element, route: any }) => (
            <Component key={ route.meta.title || route.path }/>
          )
        }}
      </router-view>
    )
  }
})

export default App