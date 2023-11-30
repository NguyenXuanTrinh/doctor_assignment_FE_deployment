import { Button, Form, Input, Radio, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomDatePicker,
  FormInput,
} from "../../../components/StyledComponent";
import GoogleMap from "../../../components/GoogleMap";
import { useAuth } from "../../../context/AuthProvider";
import moment from "moment";
import http from "../../../ultils/httpConfig";

const Profile = () => {
  const { userInfo } = useAuth();
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });
  const [address, setAddress] = useState("");

  const onFinish = (values) => {
    const body = {
      phone: values.phone,
      fullName: values.name,
      gender: values.gender,
      address: [position.lat, position.lng],
      dob: new Date(values.dob),
      password: "0123456789",
    };

    http.put(`/user/${values?.phone}`, body).then((response) => {
      console.log(response);
    });

    notification.success({
      message: "Success",
      description: "Update information successfully!",
    });
  };

  useEffect(() => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${position?.lat}&lon=${position?.lng}`;
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

  useEffect(() => {
    if (userInfo) {
      setPosition({
        lat: userInfo?.address?.[0] + 5,
        lng: userInfo?.address?.[1],
      });
    }
  }, [userInfo]);

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
          {
            name: ["name"],
            value: userInfo?.fullName,
          },
          {
            name: ["phone"],
            value: userInfo?.phone,
          },
          {
            name: ["gender"],
            value: userInfo?.gender,
          },
          {
            name: ["dob"],
            value: moment(new Date(userInfo?.dob)),
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
        <div className="flex gap-[20px]">
          <div className="w-[32.2%]">
            <Form.Item
              label="Password: "
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please type your password!",
                },
              ]}
            >
              <Input.Password placeholder="Type your pasword" />
            </Form.Item>
          </div>
        </div>{" "}
        <GoogleMap position={position} setPosition={setPosition} />
        <Form.Item style={{ position: "absolute", bottom: -30, right: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#1677ff" }}
          >
            Update
          </Button>
        </Form.Item>
      </FormInput>
    </>
  );
};

export default Profile;
