import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";

const initToken = localStorage.getItem("user_token") || "";

function token(prevState = initToken, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data.token;
    case REMOVE_TOKEN:
      return "";
    default:
      return prevState;
  }
}

export default token;
