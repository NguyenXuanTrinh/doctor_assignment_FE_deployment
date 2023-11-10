import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileSearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme, notification } from "antd";
import { MenuDashboard } from "../../components/StyledComponent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../route/paths";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/dashboard") {
      navigate(PATH.MEDICAL_CENTER_FINDER);
    }
  }, []);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          minHeight: "100vh",
          background: "#3b3a48",
        }}
        width="230px"
      >
        <div className="sticky top-0">
          <div className="flex justify-center ">
            <img
              className="w-[10rem]"
              src="https://wallpapercave.com/wp/wp8864237.png"
              alt="logo"
            />
          </div>
          <MenuDashboard
            mode="inline"
            selectedKeys={location.pathname}
            className="text-white bg-[#3b3a48] px-2 "
            items={[
              {
                key: PATH.MEDICAL_CENTER_FINDER,
                icon: <FileSearchOutlined className="me-2" />,
                label: "Medical Finder",
                onClick: () => {
                  navigate(PATH.MEDICAL_CENTER_FINDER);
                },
              },
              {
                key: PATH.APPOINTMENT,
                icon: <UserOutlined className="me-2" />,
                label: "Schedule Management",
                onClick: () => {
                  navigate(PATH.APPOINTMENT);
                },
              },
              {
                key: PATH.PROFILE,
                icon: <UserOutlined className="me-2" />,
                label: "User Profile",
                onClick: () => {
                  navigate(PATH.PROFILE);
                },
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center gap-[20px]">
              <div>
                Hi, <span className="font-semibold">Quang Minh</span>
              </div>
              <Button
                className="mr-6  rounded"
                onClick={() => {
                  navigate(PATH.HOME);
                  notification.success({
                    message: "Success",
                    description: "Logout successfully!",
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
