// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";
import animated from "animate.css";
import axios from "./utils/axios";
import "../static/css/global.css";
import store from "./store";
import VueLazyload from "vue-lazyload";
import "../src/assets/iconfont/css/iconfont.css";
import VueRouter from "vue-router";
import { Message } from "element-ui";

import { getID, getAnswer } from "@/utils/auth";
// 富文本
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: require('@/img/case1.png'),   //请求失败后显示的图片
  // loading: require('@/img/case1.png'),   //加载的loading过渡图片
  attempt: 1 // 加载图片数量
});
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.use(ElementUI);
Vue.use(animated);
// 全局变量

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
// 路由守卫
const whiteList = ["/login", "/register"];
router.beforeEach((to, from, next) => {
  const hasId = getID();
  const hasAnswer = getAnswer();
  console.log("hasId======", hasId);
  // 判断路由组件中的某个属性
  if (hasId) {
    // 登录后
    console.log("to.path", to.path);
    if (to.path === "/contact") {
      next();
    } else {
      if (hasAnswer === "true") {
        next();
      } else {
        Message({
          message: "没有填写问卷，请先填写问卷",
          type: "warning"
        });
      }
    }
    // if (to.path === "/cantact") {
    //   next();
    // } else {
    //   if (hasAnswer === "true") {
    //     next();
    //   } else {
    //     next({ path: "/cantact" });
    //   }
    // }

    // if (to.path === "/cantact") {
    //   // next({ path: "/cantact" });
    //   next();
    // } else {
    //   // 登陆后
    //   if (hasAnswer === "false") {
    //     // 没有则去填写
    //     next({ path: "/cantact" });
    //     Message({
    //       message: "没有填写问卷，请先填写问卷",
    //       type: "warning"
    //     });
    //   } else {
    //     next();
    //   }
    // }
  } else {
    /* has no token*/
    // 不做token校验,用id来判断是否登录
    // next();
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
