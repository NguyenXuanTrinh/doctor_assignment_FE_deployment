import { LOCAL_ITEM } from "./constant";

export const setLocalToken = (token) => {
  if (token) {
    localStorage.setItem(LOCAL_ITEM.ACCESS_TOKEN, token.accessToken);
  }
};

export const setSessionToken = (token) => {
  if (token) {
    sessionStorage.setItem(LOCAL_ITEM.ACCESS_TOKEN, token.accessToken);
  }
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_ITEM.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_ITEM.REFRESH_TOKEN);
  sessionStorage.removeItem(LOCAL_ITEM.ACCESS_TOKEN);
  sessionStorage.removeItem(LOCAL_ITEM.REFRESH_TOKEN);
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem(LOCAL_ITEM.USER_INFO, JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
  localStorage.removeItem(LOCAL_ITEM.USER_INFO);
};

export const getUserInfo = () =>
  JSON.parse(localStorage.getItem(LOCAL_ITEM.USER_INFO));
