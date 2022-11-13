// @/types/index.ts
export interface MyResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

// @/utils/request.ts
import axios, { AxiosRequestConfig } from 'axios'
// import { MyResponseType } from '@/types'sss

const instance = axios.create({
  baseURL: '/api'
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
  try {
    const { data } = await instance.request<MyResponseType<T>>(config)
    data.code === 0
      ? console.log(data.message) // 成功消息提示
      : console.error(data.message) // 失败消息提示
    return data
  } catch (err: any) {
    const message = err.message || '请求失败'
    console.error(message) // 失败消息提示
    return {
      code: -1,
      message,
      data: null as any
    }
  }
}

export default request