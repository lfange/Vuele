import { defineComponent } from 'vue';
import { useappStore } from '@/store/app.ts'
import Breadcrumb from '@/components/Breadcrumb/index.tsx'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
const Navbar = defineComponent({
  name: 'Navbar',
  props: {
  },
  setup() {
    const appStore = useappStore()
    const { ToggleSicebar } = appStore

    
    // Toggle sidebar Svg
    const Hamburger = () =>  (
      <div class="hamburger-container">
        <svg
          class={[ appStore.opened ? 'is-active': '', 'hamburger']}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          onclick={ ToggleSicebar }
          >
          <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
        </svg>
      </div>
    )

    return () => (
      <div class="navbar">
        <Hamburger  />
        <Breadcrumb />
        <el-dropdown class="avatar-container" trigger="click">
          <span class="avatar-wrapper el-dropdown-link">
            Dropdown List
            {/* <img src="https://tupian.qqw21.com/article/UploadPic/2020-3/202031522291979394.jpg" class="user-avatar" /> */}
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <el-dropdown-menu  v-slots={{
              dropdown: () => <el-dropdown-item >Action 4</el-dropdown-item>
            }} /> 
            {/* <el-dropdown-menu slot="dropdown" class="user-dropdown" >
            <el-dropdown-menu>
            <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
            <el-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
            <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
            <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
          </el-dropdown-menu>
              <router-link class="inlineBlock" to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu> */}
        </el-dropdown>
      </div>
    )
  }
})

export default Navbar