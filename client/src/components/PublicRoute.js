import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (token) {
    if (userRole === "Teacher") {
      return <Navigate to="/TeacherPortal" replace />;
    } else if (userRole === "Student") {
      return <Navigate to="/StudentPortal" replace />;
    }
  }

  return children;
};

export default PublicRoute;
