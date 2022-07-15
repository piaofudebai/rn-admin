import request from '@/utils/request'
/*
* 编辑用户提交
 */
export const getReports = () => {
  return request({
    method: 'GET',
    url: 'reports/type/1'

  })
}
