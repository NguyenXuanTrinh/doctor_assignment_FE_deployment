import React from "react";
import { FormLogin } from "../components/StyledComponent";
import { DatePicker, Form, Input, notification } from "antd";

const RegisterForm = ({ setRegister }) => {
  const onFinish = (values) => {
    console.log(values);
    setRegister(false);
    notification.success({
      message: "Success",
      description: "Register successfully!",
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
      name="registerForm"
      layout="vertical"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="flex gap-[20px]">
        <div className="w-6/12">
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
            <Input placeholder="Type your phone" />
          </Form.Item>
        </div>
        <div className="w-6/12">
          <Form.Item label="Address: " name="address">
            <Input placeholder="Type your address" />
          </Form.Item>
        </div>
      </div>

      <div className="flex gap-[20px]">
        <div className="w-6/12">
          <Form.Item
            label="Full name: "
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Type your name" />
          </Form.Item>
        </div>
        <div className="w-6/12">
          <Form.Item label="Date of birth: " name="dob">
            <DatePicker />
          </Form.Item>
        </div>
      </div>

      <div className="flex gap-[20px] mb-4 ">
        <div className="w-6/12">
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
            <Input.Password placeholder="Type your password" />
          </Form.Item>
        </div>
        <div className="w-6/12">
          <Form.Item
            label="Confirm password: "
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>
        </div>
      </div>

      <Form.Item>
        <button
          type="submit"
          className="mb-2 px-4 py-3 border-2 border-solid border-[#d9d9d9] rounded w-full bg-blue-500 text-white font-semibold text-lg"
        >
          Register
        </button>
      </Form.Item>

      <div>
        Do you have an account?{" "}
        <span
          onClick={() => setRegister(false)}
          className="text-blue-600 mb-3 hover:text-blue-800 hover:underline  cursor-pointer"
        >
          Login now!
        </span>
      </div>
    </FormLogin>
  );
};

export default RegisterForm;
