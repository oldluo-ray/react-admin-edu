import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

import { defaultRoutes } from "@conf/routes";
import asyncComps from "@conf/asyncComps";
import NotFound from "@pages/404";

export default class AuthorizedRouter extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  renderRoutes = (routes, prefix = "") => {
    const composeRoutes = routes.reduce((allRoutes, route) => {
      const { children } = route;
      // 过滤level:4的没有组件的菜单
      if (!route.path) return allRoutes;

      if (children && children.length) {
        const routes = this.renderRoutes(children, route.path);
        allRoutes = allRoutes.concat(routes);
      }

      const commonPath = prefix + route.path;

      if (route.redirect && children && children.length) {
        const item = (
          <Redirect key={commonPath} from={commonPath} to={route.redirect} />
        );
        allRoutes.push(item);
      } else {
        const item = (
          <Route
            key={commonPath}
            path={commonPath}
            component={
              asyncComps[route.component]
                ? asyncComps[route.component]()
                : NotFound
            }
            exact
          />
        );

        allRoutes.push(item);
      }

      return allRoutes;
    }, []);
    return composeRoutes;
  };

  render() {
    const { routes } = this.props;

    const initRoutes = this.renderRoutes(defaultRoutes);
    const asyncRoutes = this.renderRoutes(routes);

    return (
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Switch>
          {initRoutes}
          {asyncRoutes}
        </Switch>
      </Suspense>
    );
  }
}
