import {
  reqRoleList,
  reqAddRole,
  reqUpdateRole,
  reqRemoveRole,
  reqBatchRemoveRole,
} from "@api/acl/role";

import {
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE,
  REMOVE_ROLE,
  BATCH_REMOVE_ROLE,
} from "./constants";

/**
 * 获取/搜索 角色分页数据
 */
const getRoleListSync = (list) => ({
  type: GET_ROLE_LIST,
  data: list,
});

export const getRoleList = ({ page, limit, roleName }) => {
  return (dispatch) => {
    return reqRoleList({ page, limit, roleName }).then((response) => {
      dispatch(getRoleListSync(response));
      return response.total;
    });
  };
};

/**
 * 删除单个角色数据
 */
const removeRoleSync = (id) => ({ type: REMOVE_ROLE, data: id });

export const removeRole = (id) => {
  return (dispatch) => {
    return reqRemoveRole(id).then(() => {
      dispatch(removeRoleSync(id));
    });
  };
};

/**
 * 批量删除角色数据
 */
const batchRemoveRoleSync = (idList) => ({
  type: BATCH_REMOVE_ROLE,
  data: idList,
});

export const batchRemoveRole = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveRole(idList).then(() => {
      dispatch(batchRemoveRoleSync(idList));
    });
  };
};

/**
 * 添加角色数据
 */
const addRoleSync = (role) => ({ type: ADD_ROLE, data: role });

export const addRole = ({ roleName, remark }) => {
  return (dispatch) => {
    return reqAddRole({ roleName, remark }).then((response) => {
      dispatch(addRoleSync(response));
    });
  };
};

/**
 * 更新角色数据
 */
const updateRoleSync = (role) => ({ type: UPDATE_ROLE, data: role });

export const updateRole = ({ roleName, remark, id }) => {
  return (dispatch) => {
    return reqUpdateRole({ roleName, remark, id }).then((response) => {
      dispatch(updateRoleSync(response));
    });
  };
};
