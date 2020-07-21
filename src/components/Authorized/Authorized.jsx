import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getUserMenu } from './redux'
import Loading from '@comps/Loading'

@connect(
  null,
  { getUserInfo, getUserMenu }
)
class Authorized extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    // 这样获取,一条一条获取太慢
    // await this.props.getUserInfo()
    // await this.props.getUserMenu ()
    // 改成下面的方式
    //发送请求获取数据
    // this.setState({
    //   loading: false
    // })
    let { getUserInfo, getUserMenu } = this.props

    await Promise.all([getUserInfo(), getUserMenu()])
    //数据一定存储到了redux中
    this.setState({
      loading: false
    })
  }
  render() {
    let { loading } = this.state
    return loading ? <Loading></Loading> : this.props.render()
  }
}

export default Authorized
