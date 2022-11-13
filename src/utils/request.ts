import axios, { AxiosPromise, Method } from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'
import router from '@/router/index'
import { i18n } from '@/lang/index'

window.requests = []
window.tokenRefreshing = false

/*
 * 根据运行环境获取基础请求URL
 */
export const getUrl = (): string => {
  const value: string = import.meta.env.VITE_AXIOS_BASE_URL as string
  return value == 'getCurrentDomain'
    ? window.location.protocol + '//' + window.location.host
    : value
}

/*
 * 根据运行环境获取基础请求URL的端口
 */
export const getUrlPort = (): string => {
  const url = getUrl()
  return new URL(url).port
}

/*
 * 创建Axios
 * 默认开启`reductDataFormat(简洁响应)`,返回类型为`ApiPromise`
 * 关闭`reductDataFormat`,返回类型则为`AxiosPromise`
 */

const service = axios.create({
  // baseURL: getUrl(),
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  responseType: 'json',
  withCredentials: true // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
})

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 自动携带token
    if (config.headers) {
      // const token = adminInfo.getToken()
      // if (token) config.headers.batoken = token
    }

    return config
  },
  (error: AxiosError) => {
    console.log('err', error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use((response: AxiosResponse) => {
    if (response.config.responseType == 'json') {
      if (response.data && response.data.code !== 1) {
        // 自动跳转到路由name或path，仅限server端返回302的情况
        if (response.data.code == 302) {
          if (response.data.data.routeName) {
            router.push({ name: response.data.data.routeName })
          } else if (response.data.data.routePath) {
            router.push({ path: response.data.data.routePath })
          }
        }
      }
    }
    return response.data
  },
  (error: AxiosError) => {
    httpErrorStatusHandle(error) // 处理错误状态码
    return Promise.reject(error) // 错误继续返回给到具体页面
  }
)

export default service

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error(
      i18n.global.t('axios.Automatic cancellation due to duplicate request:') +
        error.message
    )
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = i18n.global.t('axios.Interface redirected!')
        break
      case 400:
        message = i18n.global.t('axios.Incorrect parameter!')
        break
      case 401:
        message = i18n.global.t('axios.You do not have permission to operate!')
        break
      case 403:
        message = i18n.global.t('axios.You do not have permission to operate!')
        break
      case 404:
        message =
          i18n.global.t('axios.Error requesting address:') +
          error.response.config.url
        break
      case 408:
        message = i18n.global.t('axios.Request timed out!')
        break
      case 409:
        message = i18n.global.t(
          'axios.The same data already exists in the system!'
        )
        break
      case 500:
        message = i18n.global.t('axios.Server internal error!')
        break
      case 501:
        message = i18n.global.t('axios.Service not implemented!')
        break
      case 502:
        message = i18n.global.t('axios.Gateway error!')
        break
      case 503:
        message = i18n.global.t('axios.Service unavailable!')
        break
      case 504:
        message = i18n.global.t(
          'axios.The service is temporarily unavailable Please try again later!'
        )
        break
      case 505:
        message = i18n.global.t('axios.HTTP version is not supported!')
        break
      default:
        message = i18n.global.t(
          'axios.Abnormal problem, please contact the website administrator!'
        )
        break
    }
  }
  if (error.message.includes('timeout'))
    message = i18n.global.t('axios.Network request timeout!')
  if (error.message.includes('Network'))
    message = window.navigator.onLine
      ? i18n.global.t('axios.Server exception!')
      : i18n.global.t('axios.You are disconnected!')

  ElNotification({
    type: 'error',
    message
  })
}

/**
 * 根据请求方法组装请求数据/参数
 */
export function requestPayload(method: Method, data: anyObj) {
  if (method == 'GET') {
    return {
      params: data
    }
  } else if (method == 'POST') {
    return {
      data: data
    }
  }
}
