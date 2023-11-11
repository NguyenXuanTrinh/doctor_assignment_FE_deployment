import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Select,
  Space,
  Divider,
  notification,
} from "antd";
import GoogleMap from "../../../components/GoogleMap";
import {
  CustomDatePicker,
  CustomSteps,
  FormInput,
} from "../../../components/StyledComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../paths";
import { useAuth } from "../../../context/AuthProvider";
import http from "../../../ultils/httpConfig";

const MedicalFinder = () => {
  const { userInfo } = useAuth();
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState({
    lat: 10.811596857085577,
    lng: 106.62712326427012,
  });
  const [hospital, setHospital] = useState([]);
  const [address, setAddress] = useState("");
  const [disease, setDisease] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addDisease = (e) => {
    e.preventDefault();
    if (name) {
      setDisease([...disease, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const onFinish = (values) => {
    console.log("Form data:", values);
    http
      .post("/hospital/recommend", {
        symptoms: values.disease,
        address: [position.lng, position.lat],
      })
      .then((response) => {
        console.log({
          symptoms: values.disease,
          address: [position.lng, position.lat],
        });
        const data = response.data.messagse;
        console.log(data);
        setHospital(
          data?.map((item) => [
            ...hospital,
            {
              hospitalName: item.name,
              hospitalAddress: [item.address[0], item.address[1]],
            },
          ])
        );
      })
      .catch((e) => console.log(e.message));
    setStep(step + 1);
  };

  useEffect(() => {
    console.log(hospital);
  }, [hospital]);

  const [seletedHospital, setSelectedHospital] = useState();

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

  ///////// FORM 2

  const onFinishStep2 = (values) => {
    notification.success({
      message: "Success",
      description: "Make a appointment successfully!",
    });
    navigate(PATH.APPOINTMENT);
  };

  useEffect(() => {
    http.get("/symptom").then((response) => {
      const data = response.data.messagse;
      setDisease(data?.map((item) => [...disease, item.diseaseName]));
    });
  }, []);

  useEffect(() => {
    if (seletedHospital) console.log(seletedHospital);
  }, [seletedHospital]);

  return (
    <>
      <CustomSteps
        current={step}
        items={[
          {
            title: "Submit form",
            description: "Type your information",
          },
          {
            title: "Medical center",
            description: "Choose your medical center",
          },
        ]}
        onChange={setStep}
      />
      {step === 0 && (
        <>
          <div className="text-2xl font-semibold mb-5 mt-5">
            Medical Center Finder
          </div>
          <FormInput
            name="personalHealthForm"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
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
                  label="Full name: "
                  name="name"
                  rules={[
                    { required: true, message: "Please type your name!" },
                  ]}
                >
                  <Input placeholder="Type your name" />
                </Form.Item>
              </div>

              <div className="w-1/3">
                <Form.Item
                  label="Date of birth: "
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
                  label="Gender: "
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
                  label="Disease: "
                  name="disease"
                  rules={[
                    {
                      required: true,
                      message: "Please select your disease!",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="choose your disease"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />
                        <Space
                          style={{
                            padding: "0 8px 4px",
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addDisease}
                          >
                            Add item
                          </Button>
                        </Space>
                      </>
                    )}
                    options={disease.map((item) => ({
                      label: item[0],
                      value: item[0],
                    }))}
                  />
                </Form.Item>
              </div>
              <div className="w-1/3">
                <Form.Item
                  label="Phone: "
                  name="phone"
                  rules={[
                    { required: true, message: "Please type your phone!" },
                  ]}
                >
                  <Input
                    placeholder="Type your phone"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="w-1/3">
                <Form.Item label="Email: " name="email">
                  <Input placeholder="Type your email" />
                </Form.Item>
              </div>
            </div>

            <div className="flex gap-[20px]">
              <div className="w-2/3">
                <Form.Item
                  label="Medical record: "
                  name="medicalRecord"
                  rules={[
                    {
                      required: true,
                      message: "Please type your medical record!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Type your medical record"
                    rows={4}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-2/3">
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
      )}
      {step === 1 && (
        <>
          <div className="text-2xl font-semibold mb-5">Make a appointment</div>
          <FormInput
            name="appointmentForm"
            layout="vertical"
            onFinish={onFinishStep2}
            onFinishFailed={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            style={{ position: "relative" }}
            fields={[
              {
                name: ["address"],
                value: "address hospital",
              },
            ]}
          >
            <div className="flex gap-[20px]">
              <div className="w-6/12">
                <Form.Item
                  label="Hospital: "
                  name="hospital"
                  rules={[
                    { required: true, message: "Please choose the hospital!" },
                  ]}
                >
                  <Select
                    placeholder="Choose the hospital"
                    options={hospital?.map((item) => ({
                      label: item[0].hospitalName,
                      value: item[0].hospitalName,
                    }))}
                  />
                </Form.Item>
              </div>

              <div className="w-6/12">
                <Form.Item
                  label="Date of appoinment: "
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the date",
                    },
                  ]}
                >
                  <CustomDatePicker />
                </Form.Item>
              </div>
            </div>
            <Form.Item style={{ position: "absolute", bottom: -60, right: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#1677ff" }}
              >
                Submit
              </Button>
            </Form.Item>
          </FormInput>
        </>
      )}
    </>
  );
};

export default MedicalFinder;
