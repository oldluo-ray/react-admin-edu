import {
  GET_USER_LIST,
  REMOVE_USER,
  BATCH_REMOVE_USER,
  ADD_USER,
  UPDATE_USER,
} from "./constants";

const initUserList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function userList(prevState = initUserList, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return action.data;
    case ADD_USER:
      return {
        total: prevState.total + 1,
        items: [...prevState.items, action.data],
      };
    case UPDATE_USER:
      return {
        total: prevState.total,
        items: prevState.items.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case REMOVE_USER:
      return {
        total: prevState.total - 1,
        items: prevState.items.filter((item) => item._id !== action.data),
      };
    case BATCH_REMOVE_USER:
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
