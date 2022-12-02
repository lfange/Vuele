import { defineComponent, watch } from 'vue';
import { setTitleFromRoute } from '@/utils/common.ts'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    watch(() => route.path,
      () => {
        setTitleFromRoute()
      }
    )

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