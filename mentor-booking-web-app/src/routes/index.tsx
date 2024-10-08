import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import paths from "./path";

// Import your components/pages here
import HomePage from "../pages/home/HomePage";

import LoginPage from "../components/Auth/Login";
import Register from "../components/Auth/Register"
import { FeedbackPage } from "../pages/meeting/FeedbackPage";
import { StudentPage } from "../pages/user/student/StudentPage";

const AppRoutes: React.FC = () => {
  return (
    <div className="w-full">
      <Routes>
        {/* default root path */}
        <Route path="/" element={<Navigate to={paths.home} replace />} />
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<Register />} />
        <Route path={paths.feedback} element={<FeedbackPage />} />
        <Route path={paths.stduent} element={<StudentPage />} />

        {/* Add more routes here */}
      </Routes>
    </div>
      
  );
};

export default AppRoutes;
