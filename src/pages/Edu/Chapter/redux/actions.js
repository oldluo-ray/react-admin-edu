import { GET_CHAPTER_LIST } from './constant'
import { reqGetCourseList } from '@api/edu/chapter'

// 获取章节列表同步action
function getChapterListSync(data) {
  return { type: GET_CHAPTER_LIST, data }
}

//获取章节列表异步action
export function getChapterList({ page, limit, courseId }) {
  return dispatch => {
    return reqGetCourseList({ page, limit, courseId }).then(res => {
      dispatch(getChapterListSync(res))
      return res
    })
  }
}
