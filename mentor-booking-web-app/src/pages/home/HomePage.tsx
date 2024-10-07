import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnLoginClick = () => {
    navigate(paths.login);
  };

  const handleOnReginsterClick = () => {
    navigate(paths.register);
  };
  return (
    <>Home</>
  );
};

export default HomePage;
