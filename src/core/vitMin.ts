// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'
// 导入转换图标名称的函数

export const register = (app: any) => {
  // 统一注册el-icon图标
  for (const iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
  }
  app.config.globalProperties.$GIN_VUE_ADMIN = config
}

export default {
  install: (app: any) => {
    // register(app)
    console.log(`
      https://github.com/lfange
       当前版本:v0.0.1
       加群方式:微信：l_fange QQ：653398363
    `)
  }
}
