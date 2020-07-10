import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import icons from "@conf/icons";

const { SubMenu } = Menu;

const createSubMenu = (menu) => {
  const { name, icon } = menu;
  const Icon = icons[icon];
  return (
    <SubMenu
      key={menu.path}
      title={
        <span>
          <Icon />
          <span>{name}</span>
        </span>
      }
    >
      {createMenus(menu.children, menu.path)}
    </SubMenu>
  );
};

const createMenuItem = (menu, prefix) => {
  const { name, icon } = menu;
  const Icon = icons[icon];
  return (
    <Menu.Item key={prefix + menu.path}>
      <Link to={prefix + menu.path}>
        {Icon ? <Icon /> : null}
        <span>{name}</span>
      </Link>
    </Menu.Item>
  );
};

const createMenus = (routes, prefix = "") => {
  return routes.reduce((prevRoutes, route) => {
    let menu = null;

    if (route.hidden) return prevRoutes;

    if (route.children) {
      menu = createSubMenu(route);
    } else {
      menu = createMenuItem(route, prefix);
    }

    prevRoutes.push(menu);

    return prevRoutes;
  }, []);
};

export default createMenus;
