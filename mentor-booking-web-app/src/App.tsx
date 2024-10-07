import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import SideBar from "./components/layout/SideBar";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="max-h-screen">
          <div>
            <NavBar/>
          </div>
          <div className="flex">
            <SideBar/>
            <AppRoutes/>
          </div>
        </div>
        
      </AuthProvider>
    </>
  );
}

export default App;
