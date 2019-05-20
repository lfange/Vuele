import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'     //导入菜单配置模块
import nav from './modules/nav'       //导入导航菜单配置模块
import page from './modules/page'     //导入分页配置模块
import baseModuleMaxLength from './modules/baseModuleMaxLength'     //导入基础数据码表长度配置
import devie_code from './modules/device_code.js'     //导入device模块配置

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
        //放置公用状态
        
    },
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        menu,nav,page,baseModuleMaxLength,devie_code
    }
})