import request from "@utils/request";

const BASE_URL = "/admin/acl/index";

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: `${BASE_URL}/menu`,
    method: "GET",
  });
}

export function getInfo() {
  return request({
    url: `${BASE_URL}/info`,
    method: "GET",
  });
}

// 登录
export function reqLogin(username, password) {
  return request({
    url: `${BASE_URL}/login`,
    method: "post",
    data: {
      username,
      password,
    },
  });
}

// 登出
export function reqLogout() {
  return request({
    url: `${BASE_URL}/logout`,
    method: "post",
  });
}
