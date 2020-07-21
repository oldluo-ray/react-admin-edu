import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { constantRoutes } from '@conf/routes'

class PublicLayout extends Component {
  renderRoute = routes => {
    return routes.map(route => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      )
    })
  }

  render() {
    return (
      <Suspense
        fallback={<div style={{ color: 'red', fontSize: 40 }}>...loading</div>}
      >
        <Switch>{this.renderRoute(constantRoutes)}</Switch>{' '}
      </Suspense>
    )
  }

  /**
   *  <Switch>
   *        <Route path={} component={Login}></Route>
   *        <Route path={} component={NotFound}></Route>
   *        <Route path={} component={}></Route>
   * </Switch>
   * 
   * 

   */
}

export default PublicLayout
