import request from '@utils/request'

// 请求路径不写主机名,会将这个路径和package.json中配置的代理proxy的主机名进行拼接
const BASE_URL = '/admin/edu/chapter'

// 获取所有课程数据
export function reqGetChapterList({ page, limit, courseId }) {
  // request返回一个promise
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      courseId
    }
  })
}

// 批量删除章节数据
export function reqBatchDelChapter(chapterIds) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'DELETE',
    data: {
      idList: chapterIds
    }
  })
}
