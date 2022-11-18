import { defineComponent, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate.ts'
import Link from './Link.tsx'
import path from 'path'
import { Location } from '@element-plus/icons-vue'

const SideBarItem = defineComponent({
  name: 'SideBarItem',
  props: {
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
    const St = reactive({
      onlyOneChild: {}
    })

    const hasOneShowingChild = (children = [], parent: any) => {
      
      children = children || []
      const showingChildren = children.filter((child: any) => {
        if (child.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          St.onlyOneChild = child
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
    hasOneShowingChild(props.item.children, props.item)

    const resolvePath = (routePath: any): string => {
      try {
        if (isExternal(routePath)) {
          return routePath
        }
        return path.resolve(props.basePath, routePath)
      } catch (e) {
        console.warn(`resolve menu has some problem:`, e)
        // Cannot access "path.resolve" in client code.
        return `${props.basePath}/${routePath}`
      }
    }

    // Link header item options
    const LinkItem = () => {
      return (
        <Link to={resolvePath(St.onlyOneChild.path)}>
          <el-menu-item index={resolvePath(St.onlyOneChild.path)} class={!props.isNest ? 'submenu-title-noDropdown':''}
            v-slots={{
              default: () => <TextLink />
            }}
            />
        </Link>
      )
    }


    const TextLink = () => {
      return (
        <>
          <el-icon><Location /></el-icon>
          <span>{props.item.title}</span>
        </>
      )
    }

    // parent has children
    const SubMenu = () => {
      const SubDefault = () => {
        return (
          props.item.children.map((child: any) => <SideBarItem is-nest={true} key={child.path} item={child} base-path={resolvePath(child.path)} class="nest-menu" /> )
        )
      }
      return (
        <el-sub-menu ref="subMenu" index={resolvePath(props.item.path)} popper-append-to-body class="nest-menu" v-slots={{
          default: () => <SubDefault />,
          title: () => <TextLink />
        }} />
      )
    }

    return () => (
      <div class="menu-wrapper">
        { props.item.children && props.item.children.length ? <SubMenu /> : <LinkItem /> }
      </div>
    )
  }
})

export default SideBarItem
