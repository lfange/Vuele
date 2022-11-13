import request from '@/utils/request.ts'

// dbolue
export const dblist = (data: any) => {
  return request({
    url: '/db/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice',
    method: 'get',
    params: data
  })
}

// lottery
export const lolist = (data: any) => {
  return request({
    url: '/lo/gateway/lottery/getHistoryPageListV1.qry',
    method: 'get',
    params: data
  })
}



export const list = (data: any) => {
  return request({
    url: '/v1/list',
    method: 'get',
    params: data
  })
}
// ?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=1&termLimits=30

export const craw = (data: any) => {
  return request({
    url: '/v1/craw',
    method: 'get',
    params: data
  })
}


