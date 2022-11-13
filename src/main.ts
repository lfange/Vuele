import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import { loadLang } from '@/lang/index.ts'
import ElementPlus from 'element-plus'
import App from '@/App.tsx'
import router from './router/index'
import pinia from '@/stores/index'
import '@/permission.ts'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'



Nprogress.configure({ showSpinner: false, speed: 500 })
// Nprogress.start()

// Nprogress.done()

const app = createApp(App)

app.use(router)
app.use(pinia)

// 全局语言包加载
// const i18n = await loadLang(app)
app.use(ElementPlus, { size: 'small', zIndex: 3000}) //  i18n: i18n.global.t 

app.mount('#app')

export default app
