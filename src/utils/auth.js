import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const IDKey = "USER-ID";
const hasAnswerKey = "hasAnswer-Key";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getID() {
  return Cookies.get(IDKey);
}

export function setID(id) {
  return Cookies.set(IDKey, id);
}

export function removeID() {
  return Cookies.remove(IDKey);
}

export function getAnswer() {
  return Cookies.get(hasAnswerKey);
}

export function setAnswer(hasAnswer) {
  return Cookies.set(hasAnswerKey, hasAnswer);
}

export function removeAnswer() {
  return Cookies.remove(hasAnswerKey);
}
