import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHeader.css";

const StudentHeader = ({ userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("formCompleted");
    navigate("/");
  };

  return (
    <div className="growwithguru-container">
      <header className="header">
        <nav className="navbar">
          <a href="/StudentPortal" className="nav-link">
            Home
          </a>
          <a href="/ApplyForInterview" className="nav-link">
            Schedule Interview
          </a>
          <a href="/feedback" className="nav-link">
            Feedback
          </a>
          <a href="/updates" className="nav-link">
            Updates
          </a>
          <a href={`/profile/${userId}`} className="nav-link">
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

export default StudentHeader;
