import {
  reqGetMenuList,
  reqAddMenu,
  reqRemoveMenu,
  reqUpdateMenu,
} from "@api/acl/permission";

import { GET_MENU_LIST, ADD_MENU, UPDATE_MENU, REMOVE_MENU } from "./constants";

/**
 * 获取菜单
 */
const getMenuListSync = (menuList) => ({
  type: GET_MENU_LIST,
  data: menuList,
});

export const getMenuList = () => {
  return (dispatch) => {
    return reqGetMenuList().then((response) => {
      dispatch(getMenuListSync(response.menuList));
      return response.menuList;
    });
  };
};

/**
 * 添加菜单
 */
const addMenuSync = (menu) => ({
  type: ADD_MENU,
  data: menu,
});

export const addMenu = (menu) => {
  return (dispatch) => {
    return reqAddMenu(menu).then((response) => {
      dispatch(addMenuSync(response));
      return response;
    });
  };
};

/**
 * 更新菜单
 */
const updateMenuSync = (menuList) => ({
  type: UPDATE_MENU,
  data: menuList,
});

export const updateMenu = (permission) => {
  return (dispatch) => {
    return reqUpdateMenu(permission).then((response) => {
      dispatch(updateMenuSync(permission));
      return response;
    });
  };
};

/**
 * 删除菜单
 */
const removeMenuSync = (id) => ({
  type: REMOVE_MENU,
  data: id,
});

export const removeMenu = (id) => {
  return (dispatch) => {
    return reqRemoveMenu(id).then((response) => {
      dispatch(removeMenuSync(id));
      return response;
    });
  };
};
