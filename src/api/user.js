import request from '@/utils/request'

/*
*登录请求
 */
export const login = ({
  username, password
}) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

/*
*用户数据列表
 */
export const getUserList = (
  params
) => {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}
/*
*添加用户
 */
export const addUser = (
  data
) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

/*
*修改用户状态
 */
export const putUser = (
  { uId, type }
) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

/*
* 根据 ID 查询用户信息
 */
export const searchUser = (
  { id }
) => {
  return request({
    method: 'GET',
    url: `users/${id}`
  })
}

/*
* 编辑用户提交
 */
export const bianjiUser = (
  data
) => {
  return request({
    method: 'PUT',
    url: `users/${data.id}`,
    data

  })
}

/*
* 删除单个用户
 */
export const DelUser = (
  { id }
) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`

  })
}

/*
* 分配用户角色
 */
export const rolesUser = (
  data
) => {
  return request({
    method: 'PUT',
    url: `users/${data.id}/role`,
    data

  })
}
