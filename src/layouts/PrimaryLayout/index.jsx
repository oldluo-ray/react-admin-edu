import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

// 导入sidermenu
import SiderMenu from '../SiderMenu'
import AuthorizedRouter from '@comps/Authorized/AuthorizedRouter'

import './index.less'

import logo from '@assets/images/logo.png'

const { Header, Content, Footer, Sider } = Layout
// const { SubMenu } = Menu

@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    let { name, avatar, permissionList } = this.props.user

    // 获取浏览器地址栏路径
    const path = this.props.location.pathname
    // console.log(path)

    // 定义一个正则
    // 注意:正则后面加g, 只提取符合条件的第一个
    // 如果加了g ,表示全局, 会提取所有符合条件的
    const reg = /[/][a-z]*/g
    const matchArr = path.match(reg)
    // 获取一级path
    const firstPath = matchArr[0]
    // 获取二级path的第一个
    const secPath = matchArr[1]
    // 获取二级path的第二个
    const thirdPath = matchArr[2] || ''

    // 遍历,查找对应的一级菜单名称和二级菜单名称
    let firstName
    let secName
    permissionList.forEach(item => {
      if (item.path === firstPath) {
        firstName = item.name
        item.children.forEach(secItem => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name
          }
        })
      }
    })

    // console.log(firstName, secName)

    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <h1>硅谷教育管理系统</h1> */}
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
          {/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />} />
          </Menu> */}
        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {firstName === undefined ? (
                '首页'
              ) : (
                <>
                  {' '}
                  <Breadcrumb>
                    <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                  </Breadcrumb>
                  <h3>{secName}</h3>
                </>
              )}
            </div>

            <div className='layout-content'>
              <AuthorizedRouter></AuthorizedRouter>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
