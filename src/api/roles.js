import request from '@/utils/request'

/*
* 编辑用户提交
 */
export const getRoles = (
  params
) => {
  return request({
    method: 'GET',
    url: 'roles',
    params

  })
}
/*
*  指定权限

 */
export const getrightsList = (
  list
) => {
  return request({
    method: 'GET',
    url: `rights/${list}`
  })
}

/*
*  获取树状控件

 */
export const getrightsTree = (
  tree
) => {
  return request({
    method: 'GET',
    url: `rights/${tree}`
  })
}

/*
*  删除角色指定权限

 */
export const delrights = (
  { roleId, rightId }
) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
/*
*  角色授权

 */
export const autorrights = (
  data
) => {
  return request({
    method: 'POST',
    url: `roles/${data.roleId}/rights`,
    data
  })
}
