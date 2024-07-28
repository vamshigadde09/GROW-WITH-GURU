import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setAuthorized(true);
          setFormCompleted(res.data.data.formfilled);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  if (!formCompleted) {
    const userRole = localStorage.getItem("role");
    if (userRole === "Student" && location.pathname !== "/StudentForm") {
      return <Navigate to="/StudentForm" replace />;
    } else if (userRole === "Teacher" && location.pathname !== "/TeacherForm") {
      return <Navigate to="/TeacherForm" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
