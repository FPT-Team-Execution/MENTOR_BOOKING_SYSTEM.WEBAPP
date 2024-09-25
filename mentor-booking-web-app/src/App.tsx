import React from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <div>
          <Login />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
