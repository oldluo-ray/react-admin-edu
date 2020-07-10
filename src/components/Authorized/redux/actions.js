import { getMenu, getInfo } from "@api/acl/login";

import { UPDATE_USER, UPDATE_PERMISSION_LIST, RESET_USER } from "./constants";
/**
 * 获取权限菜单
 */
const getAccessRoutesSync = (menu) => ({
  type: UPDATE_PERMISSION_LIST,
  data: menu,
});

export const getAccessRoutes = () => {
  return (dispatch) => {
    return getMenu().then((response) => {
      dispatch(getAccessRoutesSync(response ? response.permissionList : {}));
    });
  };
};

/**
 * 获取用户信息（包含权限）
 */
const getUserInfoSync = (info) => ({
  type: UPDATE_USER,
  data: info,
});

export const getUserInfo = () => {
  return (dispatch) => {
    return getInfo().then((response) => {
      dispatch(getUserInfoSync(response));
    });
  };
};

export const resetUser = () => ({
  type: RESET_USER,
});
