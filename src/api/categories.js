import request from '@/utils/request'
/*
*编辑提交参数
*/
export const putCategories = (
  data
) => {
  return request({
    method: 'PUT',
    url: `categories/${data.id}/attributes/${data.attrId}`,
    data
  })
}
/*
*删除参数
*/
export const delCategories = (
  data
) => {
  return request({
    method: 'DELETE',
    url: `categories/${data.id}/attributes/${data.attrId}`
  })
}
/*
*添加动态参数或者静态属性
*/
export const addCategories = (
  data
) => {
  return request({
    method: 'POST',
    url: `categories/${data.id}/attributes`,
    data
  })
}
/*
*  商品分类管理
*/
export const categorList = (
  params
) => {
  return request({
    method: 'GET',
    url: 'categories',
    params
  })
}
