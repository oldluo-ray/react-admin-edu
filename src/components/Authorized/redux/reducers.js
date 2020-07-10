import { UPDATE_USER, UPDATE_PERMISSION_LIST, RESET_USER } from "./constants";

const initUser = {
  roles: [], // 权限
  name: "", // 用户名
  avatar: "", // 头像
  permissionValueList: [], // 按钮权限
  permissionList: [], // 路由/菜单权限
};

export default function user(prevState = initUser, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...prevState,
        ...action.data,
        permissionList: prevState.permissionList,
      };
    case UPDATE_PERMISSION_LIST:
      return {
        ...prevState,
        permissionList: action.data,
      };
    case RESET_USER:
      return initUser;
    default:
      return prevState;
  }
}
