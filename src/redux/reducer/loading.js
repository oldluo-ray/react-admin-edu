import { UPDATE_LOADING } from "../constants/loading";

const initLoading = true;

export default function loading(prevState = initLoading, action) {
  switch (action.type) {
    case UPDATE_LOADING:
      return action.data;
    default:
      return prevState;
  }
}
