import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SolutionOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
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
    if (location.pathname === "/") {
      navigate(PATH.DASHBOARD);
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
              key: PATH.TAB1,
              icon: <PieChartOutlined className="me-2" />,
              label: "Tab1",
              onClick: () => {
                navigate(PATH.TAB1);
              },
            },
            {
              key: PATH.TAB2,
              icon: <UserOutlined className="me-2" />,
              label: "Tab2",
              onClick: () => {
                navigate(PATH.TAB2);
              },
            },
            {
              key: PATH.TAB3,
              icon: <UserOutlined className="me-2" />,
              label: "Tab3",
              onClick: () => {
                navigate(PATH.TAB3);
              },
            },
          ]}
        />
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
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            height: 200,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
