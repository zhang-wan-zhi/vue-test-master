// 引入模块
import axios from "axios";
import qs from "qs";
import store from "../store";
import { Message } from "element-ui";

// 是否允许跨域
axios.defaults.withCredentials = false;
// axios初始化：延迟时间，主路由地址
let instance = axios.create({
  baseURL: "",
  timeout: 10000
});

// 设置拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // console.log(store.state.token)
      config.headers.token = `${store.state.token}`;
      // config['headers']['Authorization'] = AUTH_TOKEN
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器
const _this = this;
instance.interceptors.response.use(
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== "200") {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

// 是否销毁拦截器
// 1.给拦截器起个名称 var myInterceptors = instance.interceptors.requesst.use();
// 2.instance.interceptors.request.eject(myInterceptor);

//模块化导出
export default {
  get(url, params) {
    if (!url) return;
    return instance({
      method: "get",
      url: url,
      params,
      timeout: 30000
    });
  },
  post(url, data) {
    if (!url) return;
    return instance({
      method: "post",
      url: url,
      data,
      timeout: 30000
    });
  },
  postFile(url, data) {
    if (!url) return;
    return instance({
      method: "post",
      url: url,
      data
    })
      .then(checkStatus)
      .then(checkCode);
  }
};
