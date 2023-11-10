import React from "react";
import { Form, Input, Checkbox, notification } from "antd";
import { FormLogin } from "../components/StyledComponent";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { PATH } from "../route/paths";

const LoginForm = ({ setRegister }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    /* authService
      .login({ phone: values.phone, password: values.password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      }); */

    console.log(values);
    navigate(PATH.MEDICAL_CENTER_FINDER);
    notification.success({
      message: "Success",
      description: "Login successfully!",
    });
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
