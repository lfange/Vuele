/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}


declare module '*.tsx' {
  import type { DefineComponent } from '*.tsx'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '*.ts' {
  import type { DefineComponent } from '*.ts'
  const component: DefineComponent<{}, {}, any>
  export default component
}



interface Window {
  existLoading: boolean
  lazy: NodeJS.Timer
  unique: number
  tokenRefreshing: boolean
  requests: Function[]
  eventSource: EventSource
}

interface anyObj {
  [key: string]: any
}

interface TableDefaultData<T = any> {
  list: T
  remark: string
  total: number
}

interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
  time: number
}

type ApiPromise<T = any> = Promise<ApiResponse<T>>
