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
// import GoogleAuthCallback from "../components/Auth/GoogleAuthCallback";
import ProjectPage from "../pages/user/student/ProjectPage";
import ProtectedRoute from "./ProtectRoute";
import { ProjectDetailPage } from "../pages/project/ProjectDetailPage";
import { BookingPage } from "../pages/user/student/BookingPage";
import StudentRequestPage from "../pages/user/student/StudentRequestPage";
import MentorRequestPage from "../pages/mentor-page/MentorRequestPage";
import { LoginGoogle } from "../components/Auth/LoginGoogle";
import GoogleAuthCallback from "../components/Auth/GoogleAuthCallback";
import CreateMeeting from "../pages/meeting/CreateMeetingPage";
import { MentorPage } from "../pages/user/mentor/MentorPage";

import ProfilePage from "../pages/profile/page";
import { MajorPage } from "../pages/major/page";


const AppRoutes: React.FC = () => {
  return (
    <div className="w-full">
      <Routes>
        {/* No auth routes */}
        {/* <Route path="/login-google" element={<LoginGoogle />} /> */}
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<Register />} />
        {/* <Route path="/auth/google/callback" element={<GoogleAuthCallback />} /> */}
        <Route path={paths.callback} element={<GoogleAuthCallback />} />
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
            <ProtectedRoute allowedRoles={['Admin', 'Student']}>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.projectDetail}
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Mentor', 'Student']}>
              <ProjectDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Mentor routes */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Mentor', 'Student']}>
              <CalendarEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.mentors}
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Mentor', 'Student']}>
              <MentorPage />
            </ProtectedRoute>
          }
        />

        {/* Resource routes */}
        <Route
          path={paths.major}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <MajorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.skill}
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <BookingPage />
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
        <Route
          // path="/students/requests/:studentId"
          path="/students/requests"
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentRequestPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/requests"
          element={
            <ProtectedRoute allowedRoles={['Mentor']}>
              <MentorRequestPage />
            </ProtectedRoute>
          }
        />
      <Route
          path="/create-meeting/:id"
          element={
            <ProtectedRoute allowedRoles={['Mentor']}>
              <CreateMeeting />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Mentor', 'Student']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>



    </div>
  );
};

export default AppRoutes;
