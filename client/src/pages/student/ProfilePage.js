// ProfilePage.js
import React from "react";
import "../../styles/ProfilePage.css";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";
import Spinner from "../../components/Spinner";

const fetchUserData = async (userId) => {
  console.log(`Fetching user data for ${userId}`); // Debug log
  const response = await axios.get(`/api/v1/students/${userId}`);
  console.log("Fetched user data: ", response.data); // Debug log
  return response.data;
};

const ProfilePage = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  console.log("ProfilePage rendered with userId: ", userId); // Debug log
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery(
    ["profile", userId], // Unique query key
    () => fetchUserData(userId),
    {
      enabled: !!userId, // Only fetch data when userId is available
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      onError: (error) => console.error("Error fetching user data:", error),
    }
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  if (!userData) {
    return (
      <div>
        <Spinner />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Unable to load user data. Please check your network connection and try
          again.
        </div>
      </div>
    );
  }

  console.log("User data available: ", userData); // Debug log

  return (
    <div className="growwithguru-container">
      <StudentHeader />
      <main className="body-box">
        <section className="intro-section">
          <h1>Welcome to GROW WITH GURU - Your Path to Interview Success</h1>
        </section>
        <section className="profile-details-section">
          <div className="profile-details">
            <div className="details-container">
              <div className="personal-details">
                <div className="profile-row">
                  <div className="label">Name:</div>
                  <div className="value">{userData.personalDetails.name}</div>
                </div>
                <div className="profile-row">
                  <div className="label">Email:</div>
                  <div className="value">{userData.personalDetails.email}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
