import React from "react";
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

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: "/" },
  { label: "Dashboard", icon: <DashboardOutlined />, key: paths.dashboard },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
  { label: "Group", icon: <TeamOutlined />, key: "/group" },
  { label: "Feedback", icon: <CommentOutlined />, key: "/feedback" },
  { label: "Student", icon: <UserOutlined />, key: paths.student },
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();

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
