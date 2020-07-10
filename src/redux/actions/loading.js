import { UPDATE_LOADING } from "../constants/loading";

export const updateLoading = loading => ({
  type: UPDATE_LOADING,
  data: loading
});
