import request from '@/utils/request.ts'

export const ulist = (data: any) => {
  return request({
    url: '/v1/meber/GetUrl',
    method: 'GET',
    params: data
  })
}

