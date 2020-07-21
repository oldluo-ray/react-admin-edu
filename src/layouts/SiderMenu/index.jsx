import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
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

import Icons from '@conf/icons'

import { defaultRoutes } from '@conf/routes'

const { SubMenu } = Menu

@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  // 定义一个函数,在函数中遍历数组,动态渲染菜单
  // 由于要遍历两个数组,所以未来这个函数要调用两次
  renderMenu = menus => {
    //1. 遍历传进来的数组
    // 这里return,是将renderMenu得到的新的数组返回出去
    return menus.map(menu => {
      // 先判断当前这个菜单是否要展示,判断依据就是menu中的hidden属性的值,true,不展示, false展示
      if (menu.hidden) return

      // 通过icon字符串,找到对应的icon组件
      const Icon = Icons[menu.icon]
      // 要展示了
      if (menu.children && menu.children.length) {
        //表示有二级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
            {menu.children.map(secMenu => {
              if (secMenu.hidden) return

              return (
                <Menu.Item key={secMenu.path}>
                  {/*注意:  二级菜单的路径: 是一级菜单的path + 二级菜单的path */}
                  <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        //只有一级菜单
        // 这里return, 是给新数组添加一个菜单组件
        return (
          // 注意: 只有首页的一级菜单才需要使用Link
          <Menu.Item key={menu.path} icon={<Icon />}>
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }

  render() {
    // console.log(this.props)

    // 注意: 在SiderMenu里面要遍历两个数组
    // 1. config/routes.js/defaultRoutes ==> 登录之后的首页
    // 2. redux中的permissionList. ==> 权限管理,教育管理,个人管理
    return (
      <>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
        </Menu>
      </>
    )
  }
}

export default SiderMenu
