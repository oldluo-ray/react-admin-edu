import React, { Component } from 'react'
import { loginSuccessSync } from '@redux/actions/login'
import { connect } from 'react-redux'

@connect()
class Oauth extends Component {
  componentDidMount() {
    //1. 从浏览器地址栏把token的值切出来
    // console.log(window.location)
    const token = window.location.search.split('=')[1]
    // console.log(token)
    //2. 把token存储到redux中
    // 调用登录成功的同步action
    // loginSuccessSync()
    this.props.dispatch(loginSuccessSync({ token }))
    // console.log(this.props)
    //3. 把token存储到本地缓存中
    localStorage.setItem('user_token', token)
    //4. 跳转到首页
    this.props.history.replace('/')
  }
  render() {
    return <div>git授权登录</div>
  }
}
export default Oauth
