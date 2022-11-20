import { defineComponent, reactive, TransitionGroup } from 'vue';
import { useRoute, useRouter, RouteLocationNamedRaw } from 'vue-router';
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
  setup(props) {
    const Route = useRoute()
    const Router = useRouter()

    const St = reactive({
      levelList: []
    })

    const getBreadcrumb = () => {
      let matched = Route.matched.filter(item => item.name)
      console.log('Breadcrumb')
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }

      St.levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const pathCompile = (path: RouteLocationNamedRaw) => {
      const { params } = Route

      console.log('params', params);
      // var toPath = pathToRegexp.compile(path)
      // return toPath(params)
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        Router.push(redirect)
        return
      }
      Router.push(pathCompile(path))
    }

    getBreadcrumb()

    const NoRedirect = (item) => <span class="no-redirect"> { item.meta.title }</span>
    // immeditately
    const Redirect = (item) => <a onclick={handleLink(item)}>{ item.meta.title }</a>

    return () => (
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <TransitionGroup name="breadcrumb">
          {St.levelList.map((item: any, index: number )=> <el-breadcrumb-item key={item.path}>
            { 
            item.redirect==='noredirect' || index=== St.levelList.length - 1 
              ?  <NoRedirect item={item} /> : <Redirect item={item} />
            }
          </el-breadcrumb-item>)}
        </TransitionGroup>
      </el-breadcrumb>
    )
  }
})

export default Breadcrumb