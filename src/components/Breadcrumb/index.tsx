import { defineComponent, reactive, TransitionGroup, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNamedRaw } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'
import pathToRegexp from 'path-to-regexp'
import './breadcrubm.scss'

const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  setup() {
    const Route = useRoute()
    const Router = useRouter()
    
    // watch(Route, () => { getBreadcrumb() })

    const St = reactive({
      levelList: []
    })

    const getBreadcrumb = () => {
      let matched = Route.matched.filter(item => item.name)
      console.log('Route', Route)
      console.log('Breadcrumb', matched)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }

      St.levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)

      console.log('St.levelList.value', St.levelList.value)
    }
    const pathCompile = (path: RouteLocationNamedRaw) => {
      const { params } = Route

      console.log('params', params);
    //   var toPath = pathToRegexp.compile(path)
    //   return toPath(params)
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      console.log('handleLink', handleLink)
      if (redirect) {
        Router.push(redirect)
        return
      }
      // Router.push(pathCompile(path))
    }

    getBreadcrumb()

    const NoRedirect = (item) => <span class="no-redirect"> { item.meta.title }</span>
    // immeditately
    const Redirect = (item) => <a onclick={handleLink(item)}>{ item.meta.title }</a>

    return () => (
      <el-breadcrumb separator-icon={ArrowRight} class="app-breadcrumb" >
        {/* <TransitionGroup v-slots={{
          default: () =>  */}
          { St.levelList.map((item: any, index: number )=> 
            <el-breadcrumb-item key={item.path}>
              { 
              item.redirect === 'noredirect' || index === St.levelList.length - 1 
                ?  <NoRedirect item={item} /> : <Redirect item={item} />
              }
            </el-breadcrumb-item>
          ) }
        {/* }} /> */}
      </el-breadcrumb>
    )
  }
})

export default Breadcrumb