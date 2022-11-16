import { defineComponent, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate.ts'
import Link from './Link.vue'
import TextItem from './TextItem.tsx'
import path from 'path'
import MenuTitle from './menuTitle.vue'

const SiderBarItem = defineComponent({
  name: 'SiderBarItems',
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
    const { item } = toRefs(props)
    // !item.hidden
    const St = reactive({
      onlyOneChild: {}
    })

    console.log('!itemitem.item', item)
    const hasOneShowingChild = (children = [], parent) => {
      console.log('!hasOneShowingChild.isNest', children)
      if (!children) {
        children = []
      }
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          St.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) return true

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        St.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const resolvePath = (routePath) => {
      console.log('resolvePath', routePath)
      if (!routePath) return 'routePath null'
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return () => (
      <div class="menu-wrapper" style="font-size: 14px;color: #000">
        {hasOneShowingChild(props.item.children, props.item) &&
          (!St.onlyOneChild.children || St.onlyOneChild.noShowingChildren) ? (
            <Link to={resolvePath(St.onlyOneChild.path)}>
              <el-menu-item
                index={resolvePath(St.onlyOneChild.path)}
                class={!props.isNest ? 'submenu-title-noDropdown' : ''}
              >
                <TextItem
                  meta={Object.assign({},
                    props.item.meta,
                    St.onlyOneChild.meta
                  )}
                />
              </el-menu-item>
            </Link>
          ) : <MenuTitle item={props.item} />
        }
        {/* //   title = {props.title}
        // <Link title={props.title} /> */}
      </div>
    )
  }
})

export default SiderBarItem
