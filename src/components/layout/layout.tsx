import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import classname from 'classnames'
import chalk from 'chalk'
import './layout.scss'

// const backgroundColor = computed(() => {
//   if (userStore.sideMode === 'dark') {
//     return '#191a23'
//   } else if (userStore.sideMode === 'light') {
//     return '#fff'
//   } else {
//     return userStore.sideMode
//   }
// })

const layout = defineComponent({
  name: 'layout',
  setup() {

    const changeShadow = () => {
      St.isSider = !St.isSider
      St.isShadowBg = !St.isShadowBg
    }

    // TypeScript Reactive
    const St: any = reactive({
      isSider: true,
      isMobile: false,
      isShadowBg: true
    })

    onMounted(() => {
      console.log(import.meta.env) // undefined
      console.log(
        chalk.green(
          `hi there， I m fange My github: https://github.com/lfange`
        )
      )
    })

    return () => (
      // <el-container>
      //   <el-header>Header</el-header>
      //   <el-container>
      //     <el-aside width="200px">Aside</el-aside>
      //     <el-main>Main</el-main>
      //   </el-container>
      // </el-container>
      <el-container class="layout-cont">
        <el-container className={ classname(St.isSider ? 'openside':'hideside', St.isMobile ? 'mobile': '')}>
          <el-row class={[St.isShadowBg?'shadowBg':'']} onclick={changeShadow} />
          <el-header>Header</el-header>
          <el-container>

            <el-aside class="main-cont main-left gva-aside">
              <div class="tilte" style={{background: '#191a23'}}>
                {/* <img alt class="logoimg" src={$GIN_VUE_ADMIN.appLogo}> */}
                <div class="tit-text" style="{color:textColor}"> 'appName' </div>
              </div>

              {/* <Aside class="aside" /> */}
            </el-aside>
            <el-main>Main</el-main>
          </el-container>

        </el-container>
      </el-container>
    )
  }
})

export default layout