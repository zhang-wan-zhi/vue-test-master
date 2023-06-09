import Vue from "vue";
import vuex from "vuex";
import { setID, getID, removeID, setAnswer } from "@/utils/auth";
import { login } from "@/api/user";
Vue.use(vuex);
export default new vuex.Store({
  state: {
    token: window.sessionStorage.getItem("token"), //存到localStorage中一样m
    test: "111",
    indexspan: 0,
    id: getID(),
    hasAnswer: false
  },
  mutations: {
    Company: (state, data) => {
      state.test = data;
    },
    setindex(state, value) {
      localStorage.setItem("indexspan", value);
      state.indexspan = value;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_HASANSWER: (state, hasAnswer) => {
      setAnswer(hasAnswer);
      state.hasAnswer = hasAnswer;
    }
  },
  actions: {
    login: ({ commit }, userInfo) => {
      const { account, password } = userInfo;
      console.log("111111111");
      return new Promise((resolve, reject) => {
        login({ account: account.trim(), password: password })
          .then(response => {
            console.log("登录接口", response);
            const { data } = response;
            // commit("SET_NAME", data.name);
            commit("SET_ID", data.id);
            // commit("SET_TOKEN", data.token);
            setID(data.id);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
