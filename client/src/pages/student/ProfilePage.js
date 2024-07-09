import React, { useState, useEffect } from "react";
import "../../styles/ProfilePage.css";
import axios from "axios";
import Spinner from "../../components/Spinner"; // Ensure correct import
import { useQuery } from "react-query"; // Correct import path
import { useParams } from "react-router-dom";
import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/students/${userId}`); // Use userId for personalized data
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Re-fetch data when `userId` changes
  const { userId } = useParams();

  const {
    data: fetchUserData,
    isLoading,
    error,
  } = useQuery(
    ````[("profile", userId)], // Unique query key
    async () => {
      const response = await axios.get(`/api/v1/students/${userId}`);
      return response.data;
    },
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

  return (
    <div className="growwithguru-container">
      <StudentHeader />
      <main className="body-box">
        <section className="intro-section">
          <h1>Welcome to GROW WITH GURU - Your Path to Interview Success</h1>
        </section>
        <section className="profile-details-section">
          <div className="profile-details">
            <div className="profile-photo">
              <img
                src={userData.documents.photo}
                alt="Profile Photo"
                className="photo"
              />
            </div>
            <div className="details-container">
              <div className="personal-details">
                {Object.entries(userData.personalDetails).map(
                  ([label, value], index) => (
                    <div className="profile-row" key={index}>
                      <div className="label">{label}:</div>
                      <div className="value">{value}</div>
                    </div>
                  )
                )}
              </div>
              <div className="professional-details">
                {Object.entries(userData.professionalDetails).map(
                  ([label, value], index) => (
                    <div className="profile-row" key={index}>
                      <div className="label">{label}:</div>
                      <div className="value">{value}</div>
                    </div>
                  )
                )}
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
