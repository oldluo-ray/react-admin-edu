import { GET_COURSE_LIMIT_LIST } from './constant'
import { reqGetCourseLimitList } from '@api/edu/course'

// 同步anction
function getCourseListSync(data) {
  return { type: GET_COURSE_LIMIT_LIST, data }
}

// 异步action
// data表示异步方法中需要的所有参数,包装在一个对象中
// data就是这个对象
export function getCourseList(data) {
  return dispatch => {
    //真正发送异步请求
    return reqGetCourseLimitList(data).then(res => {
      // 调用同步action
      dispatch(getCourseListSync(res))
      return res
    })
  }
}
