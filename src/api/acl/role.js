import request from "@utils/request";

const BASE_URL = "/admin/acl/role";

// 获取/搜索 角色分页数据
export function reqRoleList({ page, limit, roleName }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    params: {
      roleName,
    },
    method: "GET",
  });
}

// 请求单个角色数据
export function reqRoleData(roleId) {
  return request({
    url: `${BASE_URL}/get/${roleId}`,
    method: "GET",
  });
}

// 请求添加角色
export function reqAddRole({ roleName, remark }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { roleName, remark },
  });
}

// 请求更新角色
export function reqUpdateRole({ roleName, remark, id }) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { roleName, id, remark },
  });
}

// 删除单个角色
export function reqRemoveRole(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

// 批量删除角色
export function reqBatchRemoveRole(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: { idList },
  });
}
