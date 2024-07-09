import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import StudentPortal from "./pages/student/StudentPortal";
import PersonalDetails from "./pages/student/PersonalDetails";
import StudentForm from "./pages/student/StudentForm";
import ProfessionalDetails from "./pages/student/ProfessionalDetails";
import UploadDocuments from "./pages/student/UploadDocuments";
import ProfilePage from "./pages/student/ProfilePage";
import TeacherForm from "./pages/teacher/TeacherForm";
import TPersonalDetails from "./pages/teacher/TPersonalDetails";
import TProfessionalDetails from "./pages/teacher/TProfessionalDetails";
import ApplyForInterview from "./pages/student/ApplyForInterview";
import TeacherPortal from "./pages/teacher/TeacherPortal";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/StudentPortal"
              element={
                <ProtectedRoutes>
                  <StudentPortal />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/StudentForm/*"
              element={
                <ProtectedRoutes>
                  <StudentForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/PersonalDetails/*"
              element={
                <ProtectedRoutes>
                  <PersonalDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/ProfessionalDetails/*"
              element={
                <ProtectedRoutes>
                  <ProfessionalDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/UploadDocuments/*"
              element={
                <ProtectedRoutes>
                  <UploadDocuments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/ProfilePage/*"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/ApplyForInterview/*"
              element={
                <ProtectedRoutes>
                  <ApplyForInterview />
                </ProtectedRoutes>
              }
            />
            <Route path="/TeacherForm/*" element={<TeacherForm />} />
            <Route path="/TeacherPortal/*" element={<TeacherPortal />} />
            <Route path="/TPersonalDetails/*" element={<TPersonalDetails />} />
            <Route
              path="/TProfessionalDetails/*"
              element={<TProfessionalDetails />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
