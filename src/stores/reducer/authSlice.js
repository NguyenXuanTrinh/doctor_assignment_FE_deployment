import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../ultils/constant";
import {
  getUserInfo,
  setUserInfo,
  removeToken,
  removeUserInfo,
} from "../../ultils/helpFunc";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: getUserInfo() ? true : false,
    isRegister: false,
    userInfo: getUserInfo() ? getUserInfo() : "{}",
    loginStatus: STATUS.IDLE,
    signUpStatus: STATUS.IDLE,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      setUserInfo(action.payload.userInfo);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      removeToken();
      removeUserInfo();
    },

    registerSuccess: (state, action) => {
      state.isRegister = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setSignUpStatus: (state, action) => {
      state.signUpStatus = action.payload;
    },
  },
});

export const {
  setLoginStatus,
  setSignUpStatus,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
