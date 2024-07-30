import React, { useEffect, useState } from "react";
import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";
import "../../styles/ApplyForInterview.css";

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch("/api/v1/students/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  const { personalDetails, professionalDetails, documents } = studentData;

  return (
    <div className="growwithguru-container">
      <StudentHeader />
      <div className="form-container">
        <h1>Welcome to GROW WITH GURU - Your Path to Interview Success</h1>
        <div className="form-box profile-section">
          <div className="profile-photo-placeholder">
            {documents?.photo ? (
              <img src={documents.photo} alt="Student" />
            ) : (
              <div>No Photo Available</div>
            )}
          </div>
          <div className="profile-info-section">
            {/* Personal Details */}
            <div className="profile-info-group">
              <label className="profile-label">Name:</label>
              <div className="profile-value">
                {personalDetails?.name || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Email ID:</label>
              <div className="profile-value">
                {personalDetails?.email || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Register No:</label>
              <div className="profile-value">
                {personalDetails?.registerNumber || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Department:</label>
              <div className="profile-value">
                {personalDetails?.department || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">College:</label>
              <div className="profile-value">
                {personalDetails?.college || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Program:</label>
              <div className="profile-value">
                {personalDetails?.program || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Specialization:</label>
              <div className="profile-value">
                {personalDetails?.specialization || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Education:</label>
              <div className="profile-value">
                {personalDetails?.education || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Section:</label>
              <div className="profile-value">
                {personalDetails?.section || "N/A"}
              </div>
            </div>
            {/* Professional Details */}
            <div className="profile-info-group">
              <label className="profile-label">Skills:</label>
              <div className="profile-value">
                {professionalDetails?.skills || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Area of Interest:</label>
              <div className="profile-value">
                {professionalDetails?.areaOfInterest || "N/A"}
              </div>
            </div>
            <div className="profile-info-group">
              <label className="profile-label">Languages:</label>
              <div className="profile-value">
                {professionalDetails?.languages?.join(", ") || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
