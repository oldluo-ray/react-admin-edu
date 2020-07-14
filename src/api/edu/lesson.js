import request from '@utils/request'

// 请求路径不写主机名,会将这个路径和package.json中配置的代理proxy的主机名进行拼接
const BASE_URL = '/admin/edu/lesson'

// 获取所有课程数据
export function reqGetLessonList(chapterId) {
  // request返回一个promise
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}

// 新增课时, 上传视频, 获取七牛云token的方法

export function reqGetQiniuToken() {
  return request({
    url: '/uploadtoken',
    method: 'GET'
  })
}
