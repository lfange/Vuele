import { defineComponent, computed, Transition, KeepAlive, Suspense } from 'vue';

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
  },
  setup() {

    return () => (
      <router-view>
        {{
          default: ({ Component, route }: { Component: () => JSX.Element, route: any }) => (
            <Transition name={ route.meta.transition || 'fade'} mode='out-in'>
              {{
                default: () => 
                  <section class="app-main">
                    <Suspense>
                      {{
                        default: () => <Component key={ route.meta.title || route.params.space_uid}/>,
                        fallback: () => '<Loading/>'
                      }}
                    </Suspense>
                  </section>
              }}
            </Transition>
          )
        }}
      </router-view>
    )
  }
})

export default AppMain