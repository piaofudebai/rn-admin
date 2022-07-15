import request from '@/utils/request'

/*
* 编辑用户提交
 */
export const getOrders = (
  params
) => {
  return request({
    method: 'GET',
    url: 'orders',
    params

  })
}
