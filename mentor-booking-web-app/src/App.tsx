import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { useAuth } from "./auth/AuthContext";
import SideBar from "./components/layout/SideBar";
import NavBar from "./components/layout/NavBar";
import { LoadingPage } from "./components/layout/LoadingPage";

function App() {
  const { isLoading } = useAuth()
  return (
    <>
      {isLoading ?
        (<LoadingPage />)
        : (<div className="max-h-screen">
          <div>
            <NavBar />
          </div>
          <div className="flex">
            <SideBar />
            <AppRoutes />
          </div>
        </div>)}
    </>
  );
}

export default App;
