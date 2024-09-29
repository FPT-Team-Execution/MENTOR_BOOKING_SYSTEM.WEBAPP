import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <div>
          <AppRoutes />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
