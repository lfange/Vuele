// 变量名对应含义请在 /stores/* 里边找
import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'


export interface NavTabs {
  tabsView: RouteLocationNormalized[],
  tabsViewRoutes: RouteRecordRaw[]
}

export interface SiteConfig {
  site_name: string
  record_number?: string
  version: string
  cdn_url: string
  api_url: string
  upload: {
      mode: string
      maxsize: number
      mimetype: string
      savename: string
      url?: string
      params?: anyObj
  }
}
