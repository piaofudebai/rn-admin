import request from '@/utils/request'

/*
*  商品列表
 */
export const getGoods = (
  params
) => {
  return request({
    method: 'GET',
    url: 'goods',
    params
  })
}

/*
*商品添加分类
*/
export const categoriesGoods = (
  data
) => {
  return request({
    method: 'GET',
    url: 'categories',
    data
  })
}

/*
*分类参数管理
*/
export const getAttributes = (
  { id, sel }
) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes?sel=${sel}`
  })
}
/*
*添加商品
*/
export const addgoods = (
  data
) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}
