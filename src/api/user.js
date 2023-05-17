import axios from "../utils/axios";

// 填问卷展示
export const getQuestion = data => {
  return axios.post("/questionnaire/all", data);
};

// 登录
export const login = data => {
  return axios.post("/api/user/login", data);
};

// 注册
export const register = data => {
  return axios.post("/api/user/register", data);
};
