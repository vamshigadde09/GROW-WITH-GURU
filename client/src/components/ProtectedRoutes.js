import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
=======
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const ProtectedRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
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
<<<<<<< HEAD
          setFormCompleted(res.data.data.formfilled);
=======
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
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

<<<<<<< HEAD
  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  if (!formCompleted && location.pathname !== "/StudentForm") {
    return <Navigate to="/StudentForm" replace />;
  }

  return children;
=======
  return <Outlet />;
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
};

export default ProtectedRoutes;
