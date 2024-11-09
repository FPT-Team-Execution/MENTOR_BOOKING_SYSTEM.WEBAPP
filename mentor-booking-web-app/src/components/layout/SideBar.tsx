import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  CommentOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  UserOutlined,
  MessageOutlined,
  HistoryOutlined,
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
  { label: "Feedback", icon: <CommentOutlined />, key: paths.feedback },
  { label: "Student", icon: <UserOutlined />, key: paths.student },
  { label: "Mentor", icon: <UserOutlined />, key: paths.mentors },
  { label: "Resource", icon: <AppstoreOutlined />, key: paths.resource },
  { label: "Transaction", icon: <HistoryOutlined />, key: paths.transaction },

];

const studentMenu: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: paths.home },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
];

const mentorMenu: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: paths.home },
  { label: "Calendar", icon: <CalendarOutlined />, key: paths.calender },
  { label: "Project", icon: <ProjectOutlined />, key: paths.project },
];


const menu = {
  admin: adminMenu,
  mentor: mentorMenu,
  student: studentMenu,
}

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>(studentMenu)
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
  }, [userInfo])


  if (userInfo?.role === "Student" && !items.find(item => item?.key === '/students/requests')) {
    items.push({ label: "Request", icon: <UserOutlined />, key: '/students/requests' });
  }

  if (userInfo?.role === "Mentor" && !items.find(item => item?.key === '/mentor/requests')) {
    items.push({ label: "Request", icon: <UserOutlined />, key: '/mentor/requests' });
    items.push({ label: "Meeting", icon: <MessageOutlined />, key: '/mentor/meetings' });
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
