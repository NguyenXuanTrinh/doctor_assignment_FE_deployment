import React, { useEffect, useState } from "react";
import { ContainerLogin, WrapperLogin } from "../components/StyledComponent";
import LoginForm from "../feature/LoginForm";
import RegisterForm from "../feature/RegisterForm";
import { useSelector } from "react-redux";
import { selectAuth } from "../stores/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const LoginPage = () => {
  const [register, setRegister] = useState(false);
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
      notification.error({
        message: "Error",
        description: "You was loggedIn!",
      });
    }
  }, []);
  return (
    <WrapperLogin>
      <ContainerLogin>
        <div className={register ? "w-full" : "w-5/12"}>
          <div
            className="text-[3rem] font-medium mb-5"
            style={{ width: register ? "42%" : "" }}
          >
            Welcome to Medical Center Finder
          </div>
          {register ? (
            <RegisterForm setRegister={setRegister} />
          ) : (
            <LoginForm setRegister={setRegister} />
          )}
        </div>
        {!register && (
          <>
            <div className="w-1/12"></div>
            <div className="w-6/12">
              <img
                className="h-full"
                src="https://static.vecteezy.com/system/resources/previews/002/127/140/non_2x/medical-insurance-concept-illustration-a-man-filling-medical-document-form-can-use-for-web-homepage-mobile-apps-web-banner-character-cartoon-illustration-flat-style-free-vector.jpg"
                alt="img"
              />
            </div>
          </>
        )}
      </ContainerLogin>
    </WrapperLogin>
  );
};

export default LoginPage;
