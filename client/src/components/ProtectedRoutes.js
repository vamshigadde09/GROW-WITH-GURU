import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const formCompleted = localStorage.getItem("formCompleted");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!formCompleted && location.pathname !== "/StudentForm") {
    return <Navigate to="/StudentForm" replace />;
  }

  return children;
};

export default ProtectedRoutes;
