import {
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE,
  REMOVE_ROLE,
  BATCH_REMOVE_ROLE,
} from "./constants";

const initRoleList = {
  total: 0, // 总数
  items: [], // 详细role数据
};

export default function roleList(prevState = initRoleList, action) {
  switch (action.type) {
    case GET_ROLE_LIST:
      return action.data;
    case ADD_ROLE:
      return {
        total: prevState.total + 1,
        items: [...prevState.items, action.data],
      };
    case UPDATE_ROLE:
      return {
        total: prevState.total,
        items: prevState.items.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case REMOVE_ROLE:
      return {
        total: prevState.total - 1,
        items: prevState.items.filter((item) => item._id !== action.data),
      };
    case BATCH_REMOVE_ROLE:
      return {
        total: prevState.total - action.data.length,
        items: prevState.items.filter(
          (item) => action.data.indexOf(item._id) === -1
        ),
      };
    default:
      return prevState;
  }
}
