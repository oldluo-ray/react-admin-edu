import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getUserMenu } from './redux'

@connect(
  null,
  { getUserInfo, getUserMenu }
)
class Authorized extends Component {
  componentDidMount() {
    //发送请求获取数据

    this.props.getUserInfo()
    this.props.getUserMenu()
  }
  render() {
    return this.props.render()
  }
}

export default Authorized
