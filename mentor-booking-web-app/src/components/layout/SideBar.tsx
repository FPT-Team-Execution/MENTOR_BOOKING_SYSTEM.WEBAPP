import React, { useEffect, useState } from 'react';
import {
  CommentOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";
import { TokenData } from "../../types/common.types";
import { decode } from "../../utils/utils";
type MenuItem = Required<MenuProps>["items"][number];

const baseItems: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: '/' },
  { label: "Dashboard", icon: <DashboardOutlined />, key: '/dashboard' },
  { label: "Project", icon: <ProjectOutlined />, key: '/project' },
  { label: "Group", icon: <TeamOutlined />, key: '/group' },
  { label: "Feedback", icon: <CommentOutlined />, key: '/feedback' },
  { label: "Student", icon: <UserOutlined />, key: paths.student },
  { label: "Schedule", icon: <UserOutlined />, key: '/calendar' }
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<TokenData>();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    // Giải mã `accessToken` và lưu vào `userInfo`
    if (accessToken != null) {
      setUserInfo(decode(accessToken));
    }
  }, [accessToken]);
  const items = [...baseItems];

  if (userInfo?.role === "Student" && !items.find(item => item?.key === '/students/requests')) {
    items.push({ label: "Request", icon: <UserOutlined />, key: '/students/requests' });
  }

  if (userInfo?.role === "Mentor" && !items.find(item => item?.key === '/mentor/requests')) {
    items.push({ label: "Request", icon: <UserOutlined />, key: '/mentor/requests' });
  }
  return (
    <Menu
      className="w-48"
      items={items}
      onClick={({ key }) => {
        navigate(key);
      }}
      mode="inline"
    ></Menu>
  );
};

export default SideBar;
