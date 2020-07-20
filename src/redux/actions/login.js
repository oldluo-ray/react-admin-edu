import { reqLogin, reqLogout } from '@api/acl/login'
import { reqMobileLogin } from '@api/acl/oauth'
import { LOGIN_SUCCESS, REMOVE_TOKEN } from '../constants/login'

/**
 * 登陆
 */
export const loginSuccessSync = user => ({
  type: LOGIN_SUCCESS,
  data: user
})

// 用户名密码登录
export const login = (username, password) => {
  return dispatch => {
    return reqLogin(username, password).then(response => {
      dispatch(loginSuccessSync(response))
      // 返回token，外面才能接受
      return response.token
    })
  }
}

// 手机号
export const mobileLogin = (mobile, code) => {
  return dispatch => {
    return reqMobileLogin(mobile, code).then(response => {
      dispatch(loginSuccessSync(response))
      // 返回token，外面才能接受
      return response.token
    })
  }
}

/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN
})

/**
 * 登出
 */
export const logout = () => {
  return dispatch => {
    return reqLogout().then(() => {
      dispatch(removeToken())
    })
  }
}
