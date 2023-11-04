import { LOCAL_ITEM } from "./constant";

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(LOCAL_ITEM.ACCESS_TOKEN, token.access_token);
    localStorage.setItem(LOCAL_ITEM.REFRESH_TOKEN, token.refresh_token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_ITEM.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_ITEM.REFRESH_TOKEN);
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem(LOCAL_ITEM.USER_INFO, JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
  localStorage.removeItem(LOCAL_ITEM.USER_INFO);
};

export const getUserInfo = () =>
  JSON.parse(localStorage.getItem(LOCAL_ITEM.USER_INFO));
