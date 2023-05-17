<template>
  <div id="app">
    <!--头部导航-->
    <banner
      v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"
    ></banner>
    <router-view></router-view>
    <div class="outtt">
      <el-button @click="outUser" type="primary" v-if="show"
        >退出登录</el-button
      >
    </div>
  </div>
</template>
<script>
import banner from "./components/banner";
import { removeID, removeAnswer } from "@/utils/auth";
export default {
  name: "App",
  components: {
    banner
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    $route(to, from) {
      console.log("路由变化了");
      console.log("当前页面路由：" + to.path);
      console.log("上一个路由：" + from);
      if (to.path === "/login") {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },

  mounted() {
    console.log("this.$route.path", this.$router);
  },
  methods: {
    outUser() {
      removeID();
      removeAnswer();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.outtt {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
