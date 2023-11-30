import { Badge, Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import http from "../../../ultils/httpConfig";
import { getAppoinmentAPI } from "../../../ultils/apiURL";
import { useAuth } from "../../../context/AuthProvider";

const Appointment = () => {
  const [appoinment, setAppointment] = useState([]);
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.phone) {
      http
        .post(getAppoinmentAPI, {
          phoneNumber: userInfo.phone,
        })
        .then((response) => setAppointment(response.data.result))
        .catch((e) => console.log(e.message));
    }
  }, [userInfo]);

  const [address, setAddress] = useState({});
  /* 
  useEffect(() => {
    if (appoinment.length > 0) {
      const fetchAddress = async () => {
        let i = 0;
        for (const item of appoinment) {
          const apiUrl = `https://geocode.maps.co/reverse?lat=${item?.[0]}&lon=${item?.[1]}`;
          await fetch(apiUrl, { mode: "no-cors" })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok: ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
              setAddress({
                ...address,
                [i]: data.display_name,
              });
              i++;
              console.log(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
        }
      };
      fetchAddress();
    }
  }, [appoinment]); */

  console.log(address);

  return (
    <div>
      {appoinment?.map((item, index) => {
        const timeAgo = moment(item.date).fromNow();
        const date = moment(item.date).format("DD/MM/YYYY");
        const medicalRecord = item.medicalRecord;
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
            {/* <div>
              <span className="font-medium">Address: </span> {address[index]}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Appointment;
