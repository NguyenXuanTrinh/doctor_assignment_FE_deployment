import { Button, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomDatePicker,
  FormInput,
} from "../../../components/StyledComponent";
import GoogleMap from "../../../components/GoogleMap";

const Profile = () => {
  const [position, setPosition] = useState({
    lat: 10.811596857085577,
    lng: 106.62712326427012,
  });
  const [address, setAddress] = useState("");

  const onFinish = (values) => {
    console.log("Form data:", values);
  };

  useEffect(() => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${position.lat}&lon=${position.lng}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAddress(String(data.display_name));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [position]);

  return (
    <>
      <div className="text-2xl font-semibold mb-5">Profile</div>
      <FormInput
        name="profileForm"
        layout="vertical"
        onFinish={onFinish}
        style={{ position: "relative" }}
        fields={[
          {
            name: ["address"],
            value: address,
          },
        ]}
      >
        <div className="flex gap-[20px]">
          <div className="w-1/3">
            <Form.Item
              label="Full name"
              name="name"
              rules={[{ required: true, message: "Please type your name!" }]}
            >
              <Input placeholder="Type your name" />
            </Form.Item>
          </div>

          <div className="w-1/3">
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <CustomDatePicker />
            </Form.Item>
          </div>

          <div className="w-1/3">
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="w-1/3">
            <Form.Item
              label="Address: "
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please choose your address in map!",
                },
              ]}
            >
              <Input placeholder="Choose your address in map!" disabled />
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item
              label="Phone: "
              name="phone"
              rules={[{ required: true, message: "Please type your phone!" }]}
            >
              <Input placeholder="Type your phone" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item label="Email: " name="email">
              <Input placeholder="Type your email" />
            </Form.Item>
          </div>
        </div>
        <GoogleMap position={position} setPosition={setPosition} />

        <Form.Item style={{ position: "absolute", bottom: -30, right: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#1677ff" }}
          >
            Continue
          </Button>
        </Form.Item>
      </FormInput>
    </>
  );
};

export default Profile;
