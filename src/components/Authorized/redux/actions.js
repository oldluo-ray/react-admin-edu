// 写两对同步/异步action

// 导入请求数据的方法
import { getInfo, getMenu } from '@api/acl/login'

import { GET_USER_INFO, GET_USER_MENU } from './constants'

// 1. 第一对  获取用户信息
function GetUserInfoSync(data) {
  return { type: GET_USER_INFO, data }
}

export function getUserInfo() {
  return dispatch => {
    return getInfo().then(res => {
      dispatch(GetUserInfoSync(res))
      return res
    })
  }
}

// 1. 第二对  获取菜单列表
function GetUserMenuSync(data) {
  return { type: GET_USER_MENU, data }
}

export function getUserMenu() {
  return dispatch => {
    return getMenu().then(res => {
      dispatch(GetUserMenuSync(res.permissionList))
      return res.permissionList
    })
  }
}
