import React, { useEffect, useState } from "react";
import {
  CommentOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";
import { useAuth } from "../../auth/AuthContext";

type MenuItem = Required<MenuProps>["items"][number];

const adminMenu: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: paths.home },
  { label: "Dashboard", icon: <DashboardOutlined />, key: paths.dashboard },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
  { label: "Feedback", icon: <CommentOutlined/>, key: paths.feedback },
  { label: "Student", icon: <UserOutlined/>, key: paths.student }
];

const studentMenu: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: paths.home },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
];

const mentorMenu: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: paths.home },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
  { label: "Request", icon: <SendOutlined/>, key: '/'}
];


const menu = {
  admin: adminMenu,
  mentor: mentorMenu,
  student: studentMenu,
}

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [items,setItems] = useState<MenuItem[]>(studentMenu)
  const { userInfo } = useAuth()
  
  useEffect(() => {
    const role = userInfo?.role
    if (role === 'Admin') {
      setItems(menu['admin'])
    } else if (role === 'Mentor') {
      setItems(menu['mentor'])
    } else {
      setItems(menu['student'])
    }
  },[userInfo])
  

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
