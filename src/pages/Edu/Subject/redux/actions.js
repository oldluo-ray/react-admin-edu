import { reqGetSubjectList, reqGetSecSubjectList } from '@api/edu/subject'

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from './constants'

// 获取一级分类同步action
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list
})
// 获取一级课程分类异步action
export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubjectList(page, limit).then(response => {
      dispatch(getSubjectListSync(response))
      return response
    })
  }
}

// 获取二级分类同步action
const getSecSubjectListSync = list => ({
  type: GET_SECSUBJECT_LIST,
  data: list
})
// 获取二级课程分类异步action
export const getSecSubjectList = parentId => {
  return dispatch => {
    return reqGetSecSubjectList(parentId).then(response => {
      dispatch(getSecSubjectListSync(response))
      return response
    })
  }
}
