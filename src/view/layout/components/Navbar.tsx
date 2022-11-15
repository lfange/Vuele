import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useappStore } from '@/store/app.ts'
import Hamburger from '@/components/Hamburger/index.tsx'
import Breadcrumb from '@/components/Breadcrumb/index.tsx'
import { ArrowDown } from '@element-plus/icons-vue'

const Navbar = defineComponent({
  name: 'Navbar',
  props: {
    title: String
  },
  setup(props) {
    console.log('props', props)

    const appStore = useappStore()
    const { CloseSideBar } = appStore
    const { sidebar } = storeToRefs(appStore)

    
    const toggleSideBar = () => {
      CloseSideBar
    }

    return () => (
      <div class="navbar">
        "@types/lodash-es { sidebar.opened }
        <Hamburger toggle-click={toggleSideBar} is-active={sidebar.value.opened} class="hamburger-container"/>
        <Breadcrumb />
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper el-dropdown-link">
            <img src="https://tupian.qqw21.com/article/UploadPic/2020-3/202031522291979394.jpg" class="user-avatar" />
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link class="inlineBlock" to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided onclick="logout">
                <span style="display:block;">注销</span>
              </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  }
})

export default Navbar