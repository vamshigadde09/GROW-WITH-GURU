import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHeader.css"; // Make sure this path is correct.

const StudentHeader = () => {
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
          <a href="/ApplyForInterview" className="nav-link">
            Schedule Interview
          </a>
<<<<<<< HEAD

          <a href="/feedback" className="nav-link">
            Feedback
          </a>
          <a href="/updates" className="nav-link">
            Updates
          </a>
=======
          <a href="/my-applications" className="nav-link">
            My Applications{" "}
          </a>
          <a href="/feedback" className="nav-link">
            Feedback
          </a>

>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
          <a href="/ProfilePage" className="nav-link">
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
