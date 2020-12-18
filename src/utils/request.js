import axios from "axios";
import NProgress from "nprogress";
import getUserTempId from "@utils/getUserTempId";
import "nprogress/nprogress.css";
import store from "../store";

const userTempId = getUserTempId();
const prefixUrl = process.env.NODE_ENV === "development" ? "/" : "http://182.92.128.115/";
const instance = axios.create({
  baseURL: `${prefixUrl}api`,
  headers: {
    //
  }
});
//设置请求拦截器
instance.interceptors.request.use(config => {
  //config请求配置对象
  NProgress.start();
  const token = store.state.user.token;
  if (token) {
    config.headers.token = token;
  }
  config.headers.userTempId = userTempId;
  return config;
  //舒适化默认返回成功的Promise,所有只会触发成功状态的回调
});
//设置响应拦截器
instance.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data.message);
  },
  error => {
    NProgress.done();
    const message = error.message || "网络错误";
    return Promise.reject(message);
  }
);
export default instance;
