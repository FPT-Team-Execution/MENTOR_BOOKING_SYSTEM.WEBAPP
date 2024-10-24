import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import paths from "./path";

// Import your components/pages here
import HomePage from "../pages/home/HomePage";
import LoginPage from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { FeedbackPage } from "../pages/meeting/FeedbackPage";
import { StudentPage } from "../pages/user/student/StudentPage";
import Dashboard from "../pages/admin/DashBoard";
import CalendarEventPage from "../pages/calendar/CalendarEventPage";
import GoogleAuthCallback from "../components/Auth/GoogleAuthCallback";
import ProjectPage from "../pages/user/student/ProjectPage";
import ProtectedRoute from "./ProtectRoute";
import { ProjectDetailPage } from "../pages/project/ProjectDetailPage";
import { BookingPage } from "../pages/user/student/BookingPage";

const AppRoutes: React.FC = () => {
  return (
    <div className="w-full">
      <Routes>
        {/* No auth routes */}
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        
        {/* General routes */}
        <Route path="/" element={<Navigate to={paths.home} replace />} />
        <Route path={paths.home} element={<HomePage />} />

        {/* Admin routes */}
        <Route
          path={paths.feedback}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.dashboard}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.student}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.project}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.projectDetail}
          element={
            <ProtectedRoute allowedRoles={['Admin','Mentor','Student']}>
              <ProjectDetailPage />
            </ProtectedRoute>
          }
        />
        
        {/* Mentor routes */}
        <Route
          path="/mentor/calendar/:mentorId"
          element={
            <ProtectedRoute allowedRoles={['Admin','Mentor']}>
              <CalendarEventPage />
            </ProtectedRoute>
          }
        />
        {/* Student routes */}
        <Route
          path={paths.booking}
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <BookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
