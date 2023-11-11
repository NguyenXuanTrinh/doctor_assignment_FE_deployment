import { Badge, Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import http from "../../../ultils/httpConfig";
import { getAppoinmentAPI } from "../../../ultils/apiURL";
import { useAuth } from "../../../context/AuthProvider";

const Appointment = () => {
  const [appoinment, setAppointment] = useState([]);
  const { userInfo } = useAuth();
  const [address, setAddress] = useState([]);
  useEffect(() => {
    if (userInfo.phone) {
      http
        .post(getAppoinmentAPI, {
          phoneNumber: userInfo.phone,
        })
        .then((response) => setAppointment(response.data.result))
        .catch((e) => console.log(e.message));
    }
  }, [userInfo]);

  useEffect(() => {
    if (appoinment) {
      setAddress(
        appoinment?.map((cur) => {
          if (cur.hospitalAddress) {
            const apiUrl = `https://geocode.maps.co/reverse?lat=${cur.hospitalAddress[0]}&lon=${cur.hospitalAddress[1]}`;
            fetch(apiUrl)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Network response was not ok: ${response.status}`
                  );
                }
                return response.json();
              })
              .then((data) => {
                setAddress([...address, data.display_name]);
              })
              .catch((error) => console.error("Error fetching data:", error));
          }
        }, [])
      );
    }
  }, [appoinment]);

  useEffect(() => {
    if (address) address?.map((item, index) => console.log(item, index));
  }, [address]);

  return (
    <div>
      {appoinment?.map((item, index) => {
        const timeAgo = moment(item.date).fromNow();
        const date = moment(item.date).format("DD/MM/YYYY");
        const medicalRecord =
          "Tiền sử bệnh cá nhân: Bao gồm thông tin chi tiết về tất cả những vấn đề sức khỏe mà người bệnh trãi qua trong lịch sử cuộc sống của họ. Cần thiết khai thác chi tiết về các bất thường về sức khỏe. Nếu có, thời gian phát hiện bệnh, nếu là bệnh mạn tính, việc chi tiết về điều trị: Thuốc, sự tuân thủ điều trị và các hỗ trợ qua chế độ ăn, thói quen sinh hoạt của bệnh nhân là rất quan trọng.";
        const disease = item.symptomsList;
        return (
          <div className="mb-6 px-6 py-8 border border-[#c3c3c3] rounded">
            <div className="flex items-center mb-6 justify-between">
              <div className="flex gap-[20px] items-center">
                <div className="font-semibold text-2xl">
                  {item.hospitalName}
                </div>
                <Badge
                  style={{ color: "#c3c3c3" }}
                  text={timeAgo}
                  color="#c3c3c3"
                />
              </div>
              <div className="font-medium">{date}</div>
            </div>
            <div className="mb-4">
              <span className="font-medium">Disease: </span>{" "}
              {disease?.map((item, index) => (
                <Tag key={index} color="volcano">
                  {item}
                </Tag>
              ))}
            </div>
            <div className="mb-4">
              <span className="font-medium">Medical record: </span>{" "}
              {medicalRecord}
            </div>
            <div>
              <span className="font-medium">Address: </span> {address[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Appointment;
