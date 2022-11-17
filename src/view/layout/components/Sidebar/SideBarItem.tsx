import { defineComponent, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate.ts'
import Link from './Link.vue'
import TextItem from './TextItem.tsx'
import path from 'path'
import MenuTitle from './menuTitle.vue'
import { Location } from '@element-plus/icons-vue'

const SideBarItem = defineComponent({
  name: 'SideBarItem',
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

    const St = reactive({
      onlyOneChild: {}
    })

    const hasOneShowingChild = (children = [], parent) => {
      
      children = children || []
      const showingChildren = children.filter((child) => {
        if (child.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          St.onlyOneChild = child
          return true
        }
      })
      console.log('showingChildren', showingChildren)
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) return true

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        St.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }

    const resolvePath = (routePath: any): string => {
      console.log('basePath', props.basePath)
      try {
        if (isExternal(routePath)) {
          return routePath
        }
        return path.resolve(props.basePath, routePath)
      } catch (e) {
        // Cannot access "path.resolve" in client code.
        return `${props.basePath}/${routePath}`
      }
    }

    console.log('>>> item', props.item, hasOneShowingChild(props.item.children, props.item))

    const OnlyText = () => {
      return (
        <Link to={resolvePath(St.onlyOneChild.path)}>
          <el-menu-item index={resolvePath(St.onlyOneChild.path)} class={!props.isNest ? 'submenu-title-noDropdown':''}>
            no: <TextItem meta={Object.assign({}, props.item, St.onlyOneChild.meta )} />
          </el-menu-item>
        </Link>
      )
    }

    const SubMenu = () => {
      return (
        // <el-sub-menu index='/cs/sys' v-slots={{
        //     default: () => <span>'header'</span>,
        //     title: () => (
        //       <div>
        //         <el-icon><Location /></el-icon>
        //         <span>系统管理</span>
        //       </div>)
        //   }} />
        <el-sub-menu ref="subMenu" index={resolvePath(props.item.path)} popper-append-to-body v-slots={{
          default: () => <SubDefault />,
          title: () => <SubTitle />
        }} />
      )
    }

    const SubTitle = () => {
      return (
        <div>
          <el-icon><Location /></el-icon>
          <span>{props.item.title}</span>
        </div>
      )
    }

    const SubDefault = () => {
      console.log('SubDefault', props.item) 
      return (
        props.item.children.map((child: any) => <SideBarItem is-nest={true} key={child.path} item={child} base-path={resolvePath(child.path)} class="nest-menu" /> )
      )
    }

    return () => (
      <div class="menu-wrapper" style="font-size: 14px;color: #000">
        {/* {
          hasOneShowingChild(props.item.children, props.item) && (!St.onlyOneChild.children||St.onlyOneChild.noShowingChildren)&&!props.item.alwaysShow 
          ? <OnlyText />  :
           <SubMenu />
        } */}
        { props.item.children && props.item.children.length ? <SubMenu /> : <OnlyText /> }
      </div>
    )
  }
})

export default SideBarItem
