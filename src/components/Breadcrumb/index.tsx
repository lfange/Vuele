import { defineComponent, reactive, TransitionGroup, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNamedRaw } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'
import './breadcrubm.scss'

const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  setup() {
    const Route = useRoute()
    
    watch(Route, () => { getBreadcrumb() })

    const St = reactive({
      levelList: []
    })

    const getBreadcrumb = () => {
      let matched = Route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页', breadcrumb: true }}].concat(matched)
      }

      St.levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
 
    getBreadcrumb()

    return () => (
      <el-breadcrumb separator-icon={ArrowRight} class="app-breadcrumb" >
        {/* <TransitionGroup v-slots={{
        default: () =>  */}
          { St.levelList.value.map((item: any, index: number )=> 
            <el-breadcrumb-item key={item.path} to={
              item.redirect === 'noredirect' || index === St.levelList.length - 1 ? '' : item.path}>
                { item.meta.title }
            </el-breadcrumb-item>
          ) }
        {/* }} /> */}
      </el-breadcrumb>
    )
  }
})

export default Breadcrumb