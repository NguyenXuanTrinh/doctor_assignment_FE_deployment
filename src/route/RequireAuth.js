import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../stores/reducer/authSlice";
import { PATH } from "../pages/paths";
import { notification } from "antd";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.HOME);
      notification.error({
        message: "Error",
        description: "You need login before in dashboard!",
      });
    }
  }, []);
  return <div>{children}</div>;
};

export default RequireAuth;
