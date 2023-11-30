import React from "react";
import { Form, Input, Checkbox, notification } from "antd";
import { FormLogin } from "../components/StyledComponent";
import { useNavigate } from "react-router-dom";
import { PATH } from "../pages/paths";
import http from "../ultils/httpConfig";
import { loginAPI } from "../ultils/apiURL";
import { setLocalToken, setSessionToken } from "../ultils/helpFunc";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../stores/reducer/authSlice";

const LoginForm = ({ setRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    http
      .post(loginAPI, {
        phoneNumber: values.phone,
        password: values.password,
      })
      .then((response) => {
        const data = response.data.result;
        const token = response.data.token;
        if (values.remember) {
          setLocalToken(token);
        } else {
          setSessionToken(token);
        }
        dispatch(
          loginSuccess({
            userInfo: {
              fullName: data.name,
              gender: data.gender,
              address: data.address ? [data.address[0], data.address[1]] : [],
              dob: data.dob,
              phone: data.phoneNumber,
            },
          })
        );
        navigate(PATH.MEDICAL_CENTER_FINDER);
        notification.success({
          message: "Success",
          description: "Login successfully!",
        });
      })
      .catch((e) =>
        notification.error({
          message: "Error",
          description: "Phone or password is not correct!",
        })
      );
  };

  const validatePhone = (rule, value, callback) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number for simplicity

    if (value && !phoneRegex.test(value)) {
      callback("Please enter a valid phone number");
    } else {
      callback();
    }
  };

  return (
    <FormLogin
      name="loginForm"
      layout="vertical"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Phone: "
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
          { validator: validatePhone },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password: "
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <div className="text-blue-600 mb-3 hover:text-blue-800 hover:underline cursor-pointer">
        Forgot password?
      </div>

      <Form.Item>
        <button
          type="submit"
          className="mb-3 px-4 py-3 border-2 border-solid border-[#d9d9d9] rounded w-full bg-blue-500 text-white font-semibold text-lg"
        >
          Login
        </button>
      </Form.Item>

      <div>
        Not a member?{" "}
        <span
          onClick={() => setRegister(true)}
          className="text-blue-600 mb-3 hover:text-blue-800 hover:underline  cursor-pointer"
        >
          Regiter now!
        </span>
      </div>
    </FormLogin>
  );
};

export default LoginForm;
