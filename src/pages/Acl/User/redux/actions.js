import {
  reqUserList,
  reqRemoveUser,
  reqBatchRemoveUser,
  reqAddUser,
  reqUpdateUser,
} from "@api/acl/user";

import {
  GET_USER_LIST,
  REMOVE_USER,
  BATCH_REMOVE_USER,
  UPDATE_USER,
  ADD_USER,
} from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getUserListSync = (list) => ({
  type: GET_USER_LIST,
  data: list,
});

export const getUserList = ({ page, limit, username, nickName }) => {
  return (dispatch) => {
    return reqUserList({ page, limit, username, nickName }).then((response) => {
      dispatch(getUserListSync(response));
      return response.total;
    });
  };
};

/**
 * 删除单个用户数据
 */
const removeUserSync = (id) => ({ type: REMOVE_USER, data: id });

export const removeUser = (id) => {
  return (dispatch) => {
    return reqRemoveUser(id).then(() => {
      dispatch(removeUserSync(id));
    });
  };
};

/**
 * 批量删除用户数据
 */
const batchRemoveUserSync = (idList) => ({
  type: BATCH_REMOVE_USER,
  data: idList,
});

export const batchRemoveUser = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveUser(idList).then(() => {
      dispatch(batchRemoveUserSync(idList));
    });
  };
};

/**
 * 添加用户数据
 */
const addUserSync = (user) => ({ type: ADD_USER, data: user });

export const addUser = ({ username, nickName, password }) => {
  return (dispatch) => {
    return reqAddUser({ username, nickName, password }).then((response) => {
      dispatch(addUserSync(response));
    });
  };
};

/**
 * 更新用户数据
 */
const updateUserSync = (user) => ({ type: UPDATE_USER, data: user });

export const updateUser = ({ username, nickName, password, id }) => {
  return (dispatch) => {
    return reqUpdateUser({ username, nickName, password, id }).then(
      (response) => {
        dispatch(updateUserSync(response));
      }
    );
  };
};
