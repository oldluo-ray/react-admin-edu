import request from "@utils/request";

const BASE_URL = "/admin/acl/user";

// 获取/搜索 用户分页数据
export function reqUserList({ page, limit, username, nickName }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    params: {
      username,
      nickName,
    },
    method: "GET",
  });
}

// 请求单个用户数据
export function reqUserData(userId) {
  return request({
    url: `${BASE_URL}/get/${userId}`,
    method: "GET",
  });
}

// 请求添加用户
export function reqAddUser({ username, password, nickName }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { username, password, nickName },
  });
}

// 请求更新用户
export function reqUpdateUser({ username, password, nickName, id }) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { username, password, nickName, id },
  });
}

// 删除单个用户
export function reqRemoveUser(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

// 批量删除用户
export function reqBatchRemoveUser(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: { idList },
  });
}

// 根据用户获取角色数据
export function reqGetUserRole(id) {
  return request({
    url: `${BASE_URL}/toAssign/${id}`,
    method: "GET",
  });
}

// 给用户分配角色数据
export function reqAssignUserRole(userId, roleId) {
  return request({
    url: `${BASE_URL}/doAssign`,
    method: "POST",
    data: {userId, roleId}
  });
}