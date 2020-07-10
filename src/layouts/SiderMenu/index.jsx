import React, { Component } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";

import createMenus from "./menus";
import { defaultRoutes } from "@conf/routes";
import { findPathIndex } from "@utils/tools";

@withRouter
class SiderMenu extends Component {
  state = {
    openKeys: [],
    prevOpenKeys: [],
  };

  static getDerivedStateFromProps(props, state) {
    const nextPropOpenKey = props.defaultOpenKey;
    const prevPropOpenKey = state.prevOpenKeys;

    if (prevPropOpenKey[0] !== nextPropOpenKey) {
      return {
        openKeys: [nextPropOpenKey],
        prevOpenKeys: [nextPropOpenKey],
      };
    }

    return {
      openKeys: state.openKeys,
    };
  }

  openChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  render() {
    const { routes, location } = this.props;

    let { pathname } = location;
    const index = findPathIndex(pathname, "/");
    if (index) {
      pathname = pathname.slice(0, index) + "/list";
    }

    const { openKeys } = this.state;

    const initMenus = createMenus(defaultRoutes);
    const asyncMenus = createMenus(routes);

    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        openKeys={openKeys}
        onOpenChange={this.openChange}
        onSelect={this.select}
      >
        {initMenus}
        {asyncMenus}
      </Menu>
    );
  }
}
export default SiderMenu;
