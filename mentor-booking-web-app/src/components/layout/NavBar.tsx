import React from "react";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import paths from "../../routes/path";
import { useAuth } from "../../auth/AuthContext";



export default function NavBar() {
  const { isAuthenticated, handleLogout } = useAuth();
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: "Logout",
      onClick: handleLogout,
    }
  ]
  return (
    <nav className="relative bg-white border-b border-gray-300">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto p-2 md:px-8">
        <div className="flex items-center gap-4">
          <Link to='/'
          >
            <img className="w-20" src="src\assets\image\Logo.png" alt="" />
          </Link>
        </div>
        {
          !isAuthenticated ?
          (
            <Space>
              <Link to={paths.login}>
                <Button type="text" className="text-gray-600">
                  Log in
                </Button>
              </Link>
              <Link to={paths.register}>
                <Button type="primary" className="bg-blue-600 hover:bg-blue-500 text-white">
                  Sign up
                </Button>
              </Link>
            </Space>
          ) : (
            <Dropdown menu={{items}}>
              <div className="h-9 w-9 rounded-[50%]">
                <img className="w-full h-full " src="src\assets\image\UserLogo.png" alt="" />
              </div>
            </Dropdown>
          )
        }

      </div>
    </nav>
  );
}
