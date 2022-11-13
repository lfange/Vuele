import router from '@/router'
import Nprogress from 'nprogress'

router.beforeEach((to, from) => {
  // Nprogress.start()
})

router.afterEach(() => {
  // 路由加载完成后关闭进度条
  // Nprogress.done()
})

router.onError(() => {
  // 路由发生错误后销毁进度条
  Nprogress.remove()
})
