import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice"; // Import setUser action
const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

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
  }, [getUser]);

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
