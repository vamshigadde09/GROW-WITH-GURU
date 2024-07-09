import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());

      console.log("API Response: ", res.data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");

        const teacherFormCompleted = localStorage.getItem(
          "teacherFormCompleted"
        );
        const studentFormCompleted = localStorage.getItem(
          "studentFormCompleted"
        );

        console.log("Role: ", res.data.role);
        console.log("Teacher Form Completed: ", teacherFormCompleted);
        console.log("Student Form Completed: ", studentFormCompleted);

        if (res.data.role === "Teacher") {
          console.log("Teacher role identified");
          if (!teacherFormCompleted) {
            console.log("Redirecting to /teacherForm");
            navigate("/teacherForm");
          } else {
            console.log("Redirecting to /teacherPortal");
            navigate("/teacherPortal");
          }
        } else if (res.data.role === "Student") {
          if (!studentFormCompleted) {
            navigate("/StudentForm");
          } else {
            navigate("/StudentPortal");
          }
        } else {
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong", error);
      message.error(
        "Login failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
