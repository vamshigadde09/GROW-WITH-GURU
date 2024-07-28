import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHeader.css"; // Make sure this path is correct.

const TeacherHeader = () => {
  const navigate = useNavigate(); // Correct use of useNavigate

  const handleLogout = () => {
    // Clear user token and other local data
    localStorage.removeItem("token");
    localStorage.removeItem("formCompleted"); // Optional: Clear this if you want to reset form status on logout
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="growwithguru-container">
      <header className="header">
        <nav className="navbar">
          <a href="/StudentPortal" className="nav-link">
            Home
          </a>
          <a href="/#" className="nav-link">
            Schedule Interview
          </a>

          <a href="/#" className="nav-link">
            Feedback
          </a>
          <a href="/#" className="nav-link">
            Updates
          </a>
          <a href="/#" className="nav-link">
            Profile
          </a>
          <button onClick={handleLogout} className="nav-link btn">
            Log Out
          </button>
        </nav>
      </header>
    </div>
  );
};

export default TeacherHeader;
