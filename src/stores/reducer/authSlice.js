import { createSlice } from "@reduxjs/toolkit";
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
    userInfo: getUserInfo() ? getUserInfo() : "{}",
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
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
