import { defineComponent, toRefs, reactive } from 'vue';
import Link from './Link.tsx';

const SiderBarItem = defineComponent({
  name: 'SiderBarItem',
  props: {
    title: String,
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log('props', props)
    const { item } = toRefs(props)
    // !item.hidden
    const St = reactive({
      onlyOneChild: {}
    })

    const hasOneShowingChild = (children = [], parent) => {
      if (!children) {
        children = []
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
    return () => (
      <div class="menu-wrapper" style="fontSize: 14px">
        title = {props.title}
        <Link title={props.title} />
      </div>
    )
  }
})

export default SiderBarItem