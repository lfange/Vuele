// 变量名对应含义请在 /stores/* 里边找
import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'


export interface NavTabs {
  tabsView: RouteLocationNormalized[],
  tabsViewRoutes: RouteRecordRaw[]
}