import request from "@utils/request";

const BASE_URL = "/admin/acl/permission";

// 请求菜单列表
export function reqGetMenuList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}

// 请求添加菜单
export function reqAddMenu(menu) {
  return request({
    url: `${BASE_URL}/save`,
    data: menu,
    method: "POST",
  });
}

// 根据角色获取菜单
export function reqGetRoleMenu(roleId) {
  return request({
    url: `${BASE_URL}/toAssign/${roleId}`,
    method: "GET",
  });
}

// 给角色分配菜单
export function reqAssignRoleMenu({ roleId, permissionId }) {
  return request({
    url: `${BASE_URL}/doAssign`,
    data: {
      roleId,
      permissionId,
    },
    method: "POST",
  });
}

// 请求更新菜单
export function reqUpdateMenu(permission) {
  return request({
    url: `${BASE_URL}/update`,
    data: {
      permission,
    },
    method: "PUT",
  });
}

// 请求删除菜单
export function reqRemoveMenu(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
