import React from "react";
import {
<<<<<<< HEAD
  BrowserRouter as Router, // Correct import
  Routes,
  Route,
  Navigate,
=======
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
<<<<<<< HEAD
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import StudentPortal from "./pages/student/StudentPortal";
import PersonalDetails from "./pages/student/PersonalDetails";
import StudentForm from "./pages/student/StudentForm";
import ProfessionalDetails from "./pages/student/ProfessionalDetails";
import UploadDocuments from "./pages/student/UploadDocuments";
import TeacherForm from "./pages/teacher/TeacherForm";
import TPersonalDetails from "./pages/teacher/TPersonalDetails";
import TProfessionalDetails from "./pages/teacher/TProfessionalDetails";
import ApplyForInterview from "./pages/student/ApplyForInterview";
import TeacherPortal from "./pages/teacher/TeacherPortal";
import ProfilePage from "./pages/student/ProfilePage";
=======
import PublicRoute from "./components/PublicRoute";
import ApplyForInterview from "./pages/student/ApplyForInterview";
import ProfilePage from "./pages/student/ProfilePage";
import TProfilePage from "./pages/teacher/TProfilePage";
import TeacherNotifications from "./pages/teacher/TeacherNotifications";
import TeacherPortal from "./pages/teacher/TeacherPortal";
import StudentPortal from "./pages/student/StudentPortal";
import TeacherDetails from "./pages/teacher/TeacherDetails";
import MyApplications from "./pages/student/MyApplications";
import TeacherAvailability from "./pages/teacher/TeacherAvailability";
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
<<<<<<< HEAD
    <>
      <Router>
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
            />{" "}
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
      </Router>
    </>
=======
    <Router>
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
            path="/TeacherNotifications"
            element={
              <PublicRoute>
                <TeacherNotifications />
              </PublicRoute>
            }
          />

          <Route path="/StudentPortal" element={<StudentPortal />} />

          <Route path="/ApplyForInterview" element={<ApplyForInterview />} />

          <Route path="/ProfilePage" element={<ProfilePage />} />

          <Route path="/my-applications" element={<MyApplications />} />

          <Route path="/TeacherPortal/*" element={<TeacherPortal />} />

          <Route path="/TProfilePage/*" element={<TProfilePage />} />

          <Route path="/teacher/:id" element={<TeacherDetails />} />

          <Route
            path="/TeacherAvailability"
            element={<TeacherAvailability />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
  );
}

export default App;
