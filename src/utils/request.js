/*
  封装axios
*/
import axios from "axios";
import { notification } from "antd";
import history from "./history";
import store from "../redux/store";
import { removeToken } from "@redux/actions/login";
import { resetUser } from "@comps/Authorized/redux";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const CancelToken = axios.CancelToken;
const cancelTokenMap = new Map();
const CANCEL_REQUEST_MESSAGE = "cancel request";

const axiosInstance = axios.create({
  baseURL: "", // 基础路径：所有请求的公共路径
  timeout: 10000, // 如果请求超过10s都没有响应结果，就自动中断请求
  headers: {
    // 公共的请求头参数
  },
});

// 一旦地址发生变化，就要取消上一个地址的所有请求。（当当前地址和之前保存的地址不一样时）
history.listen(({ pathname }) => {
  cancelTokenMap.forEach((value, key) => {
    // 登录的不处理~ 解决登录时跳转导致请求失败
    if (!value.pathname) return;
    if (value.pathname !== pathname) {
      value.cancel(CANCEL_REQUEST_MESSAGE);
      cancelTokenMap.delete(key);
    }
  });
});

// 设置axios拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start();

    config.cancelToken = new CancelToken(function (cancel) {
      cancelTokenMap.set(Symbol(Date.now()), {
        pathname: history.pathname,
        cancel,
      });
    });

    // 从redux中读取token
    const { token } = store.getState();

    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  // 将要发送请求是失败的（内部出错了）触发回调函数
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  // 响应成功触发的回调函数（status: [200, 300)）
  // 响应成功之后，用户设置回调函数之前触发
  (res) => {
    NProgress.done();
    // console.log(res);
    const data = res.data;
    // 统一处理：功能成功/失败
    if (data.code === 20000) {
      // 返回成功的数据
      return data.data;
    } else {
      notification.error({
        description: data.message,
        message: "请求失败",
      });
      // 功能失败
      return Promise.reject(data.message);
    }
  },
  // 响应失败触发的回调函数
  (error) => {
    NProgress.done();

    console.log(error);

    const { response } = error;

    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;

      // 401说明token非法
      if (status === 401) {
        localStorage.removeItem("user_token");
        store.dispatch(resetUser());
        store.dispatch(removeToken());
      }

      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    } else if (!response) {
      notification.error({
        description: "您的网络发生异常，无法连接服务器",
        message: "网络异常",
      });
    }
  }
);

export default axiosInstance;
