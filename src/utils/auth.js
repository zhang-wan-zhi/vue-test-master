import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const IDKey = "USER-ID";

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
