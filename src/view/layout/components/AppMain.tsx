import { defineComponent, computed, Transition, KeepAlive, Suspense } from 'vue';
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

    const navTabsStore = useNavTabsStore()
    const { tabsView } = storeToRefs(navTabsStore)
    console.log('Router', Router)

    console.log('tabsView', tabsView)

    return () => (
      <section class="app-main">
        {/* <Transition name="fade-transform" mode="out-in"> */}
          {/* <KeepAlive include={tabsView.value}>
            <router-view key={key.value} />
          </KeepAlive> */}
          {/* <router-view v-slot={ Component } >
            <KeepAlive include={tabsView.value}>
              <component is={Component} />
            </KeepAlive>
          </router-view> */}
        {/* </Transition> */}
        <router-view>
          {{
            default: ({ Component, route }: { Component: () => JSX.Element, route: any }) => (
              <Transition name={route.meta.transition || 'fade'} mode='out-in'>
                <Suspense>
                  {{
                    default: () => <Component key={ route.meta.title || route.params.space_uid}/>,
                    fallback: () => '<Loading/>',
                  }}
                </Suspense>

              </Transition>
            ),
          }}
        </router-view>

        {/* <router-view v-slot={ Component }>
          <Transition name="setTransitionProperty" mode="out-in" v-slots={{
            default: () => <component is={Component} key={ Route.meta.usePathKey ? Route.path : undefined} />
          }} />
        </router-view> */}
        
      </section>
    )
  }
})

export default AppMain