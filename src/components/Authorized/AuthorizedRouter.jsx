import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'
import { connect } from 'react-redux'

import { defaultRoutes } from '@conf/routes'

import components from '@conf/asyncComps'

// 这个组件作用: 根据数据渲染Route组件的
// 渲染Route要使用的数据:
// 1. config/routes.js/defaultRoutes
// 2. redux中的permissionList
// 注意:返回的数据中component是字符串,要根据字符串找组件 从AsyncComps里面找
@connect(state => ({ permissionList: state.user.permissionList }))
class AuthorizedRouter extends React.Component {
  componentDidMount() {
    // 斐波那契额数列
    // 1、1、2、3、5、8、13、21、34.  前两项的值的和就是第三项
    // function fn(n) {
    //   if (n == 1 || n == 2) {
    //     return 1
    //   }
    //   return fn(n - 2) + fn(n - 1)
    // }
  }
  // 渲染Route的规则: 如果数据中的component属性是有内容的字符串,就渲染成一个Route组件,如果是空字符串就不渲染Route
  renderRoute = (routes, parentPath) => {
    return routes.map(route => {
      // 判断route数据中component属性是不是一个有内容的字符串
      if (route.component) {
        // 如果能进来,表示要渲染一个Route
        // 找到对应的组件
        // 通过component属性拿到对应的组件,但是由于之前代码写的比较啰嗦,拿到的并不是组件而是一个函数,所以必须要调用才能拿到组件
        const Component = components[route.component]()
        return (
          <Route
            //   如果parentPath有值,就证明要渲染二级路由,拼接path.没有值,就是一级路由,不拼接
            path={parentPath ? parentPath + route.path : route.path}
            component={Component}
            exact
            key={route.path}
          ></Route>
        )
      }

      // 如果有children属性,要渲染二级路由组件
      if (route.children && route.children.length) {
        // 由于遍历一级路由和二级路由的逻辑都是判断component有没有值,如果有就渲染Route,没有就不渲染.所以直接使用递归完成
        // 如果renderRoute调用,要渲染二级路由组件,那就需要传入一个父级的path
        return this.renderRoute(route.children, route.path)
      }
    })
  }

  render() {
    return (
      <Suspense fallback={<Spin />}>
        {/* <Route path={} component={懒加载的组件}></Route> */}
        {this.renderRoute(defaultRoutes)}
        {this.renderRoute(this.props.permissionList)}
      </Suspense>
    )
  }
}

export default AuthorizedRouter
