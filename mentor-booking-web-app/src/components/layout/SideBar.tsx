import React from 'react';
import {
  CommentOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { label: "Home", icon: <HomeOutlined />, key: '/' },
  { label: "Dashboard", icon: <DashboardOutlined />, key: '/dashboard' },
  { label: "Project", icon: <ProjectOutlined />, key: '/project' },
  { label: "Group", icon: <TeamOutlined />, key: '/group' },
  { label: "Feedback", icon: <CommentOutlined/>, key: '/feedback' }
];

const SideBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Menu
      className='w-48'
      items={items}
      onClick={({key}) => {
        navigate(key)
      }}
      mode='inline'
    >
    </Menu>


  );
};

export default SideBar;