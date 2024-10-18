import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract tokens from query params
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      // If no tokens found, redirect to login
      navigate("/login");
    }
  }, [location.search, navigate]);
  return <>Welcome to the Home Page! Tho!</>;
};

export default HomePage;
