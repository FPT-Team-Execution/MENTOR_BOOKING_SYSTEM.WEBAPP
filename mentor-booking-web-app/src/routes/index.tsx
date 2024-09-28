import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import paths from "./path";

// Import your components/pages here
import HomePage from "../pages/home/HomePage";

import LoginPage from "../components/Auth/Login";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* default root path */}
        <Route path="/" element={<Navigate to={paths.home} replace />} />
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.login} element={<LoginPage />} />

        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
