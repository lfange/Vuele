import { defineComponent, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate.ts'
import Link from './Link.tsx'
import path from 'path'
import * as Icons from '@element-plus/icons-vue'

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
        return routePath ?  `${props.basePath}/${routePath}` : props.basePath
      }
    }

    console.log('LinkItem', props)
    // Link header item options
    const LinkItem = () => {
      return (
        <Link to={resolvePath(St.onlyOneChild.path)}>
          <el-menu-item index={resolvePath(St.onlyOneChild.path)} 
            v-slots={{
              default: () => <IconLink />,
              title: () => <span>{props.item.title}</span>
            }}
            />
        </Link>
      )
    }

    const IconLink = () =>{
      const key = props.item.icon
      const Icon = key && Icons[key]
      if (key && !Icon) {
        console.warn(`No Match found "${key}" Icon in Elementplus!, 
          Menu ICONS are derived from Elementplus and use the hump nomenclature, Please Check Menu Icon options!!`)
      }
      return( props.item.icon && <el-icon><Icon /></el-icon>)
    }

    // parent has children
    const SubMenu = () => {
      const SubDefault = () => {
        return (
          props.item.children.map((child: any) => 
            <SideBarItem is-nest={true} key={child.path} item={child} base-path={resolvePath(child.path)} class="nest-menu" /> )
        )
      }
      const TextLink = () => {
        return (
          <>
            <IconLink />
            <span>{props.item.title}</span>
          </>
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
      <>
        { props.item.children && props.item.children.length ? <SubMenu /> : <LinkItem /> }
      </>
    )
  }
})

export default SideBarItem
