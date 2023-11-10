import { Badge, Tag } from "antd";
import moment from "moment/moment";
import React, { useState } from "react";

const Appointment = () => {
  const [appoinment, setAppointment] = useState([
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
    {
      hospitalName: "Hospital A",
      address:
        "D9 Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City, 736923, Vietnam",
      createAt: new Date(),
    },
  ]);

  return (
    <div>
      {appoinment?.map((item) => {
        console.log(item.createAt);
        const timeAgo = moment(item.createAt).fromNow();
        const date = moment(item.createAt).format("DD/MM/YYYY");
        const medicalRecord =
          "Tiền sử bệnh cá nhân: Bao gồm thông tin chi tiết về tất cả những vấn đề sức khỏe mà người bệnh trãi qua trong lịch sử cuộc sống của họ. Cần thiết khai thác chi tiết về các bất thường về sức khỏe. Nếu có, thời gian phát hiện bệnh, nếu là bệnh mạn tính, việc chi tiết về điều trị: Thuốc, sự tuân thủ điều trị và các hỗ trợ qua chế độ ăn, thói quen sinh hoạt của bệnh nhân là rất quan trọng.";
        const disease = ["Disease A", "Disease B", "Disease C"];
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
              {disease.map((item) => (
                <Tag color="volcano">{item}</Tag>
              ))}
            </div>
            <div className="mb-4">
              <span className="font-medium">Medical record: </span>{" "}
              {medicalRecord}
            </div>
            <div>
              <span className="font-medium">Address: </span> {item.address}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Appointment;
