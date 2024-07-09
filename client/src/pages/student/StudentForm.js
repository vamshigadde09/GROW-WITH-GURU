import React, { useState, useEffect } from "react";
import PersonalDetails from ".//PersonalDetails";
import ProfessionalDetails from ".//ProfessionalDetails";
import UploadDocuments from ".//UploadDocuments";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const StudentForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    personalDetails: {},
    professionalDetails: {},
    documents: {},
  });
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Check if the form has already been submitted by this user
  useEffect(() => {
    const formCompleted = localStorage.getItem("formCompleted");
    if (formCompleted) {
      navigate("/StudentPortal"); // Redirect if the form has already been submitted
    }
  }, [navigate]);

  useEffect(() => {
    if (formSubmitted) {
      navigate("/StudentPortal");
    }
  }, [formSubmitted, navigate]);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleChange = (section, key, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [key]: value },
    });
  };

  const handleFileChange = (name, file) => {
    const newDocuments = { ...formData.documents, [name]: file };
    setFormData({
      ...formData,
      documents: newDocuments,
    });
    setIsReadyToSubmit(
      newDocuments.photo && newDocuments.resume && newDocuments.cv
    );
  };

  const handleSubmit = async () => {
    setError(""); // Clear previous errors

    const { photo, resume, cv } = formData.documents ?? {};
    if (!photo || !resume || !cv) {
      console.error("Required documents are not uploaded");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("photo", photo);
    formDataToSend.append("resume", resume);
    formDataToSend.append("cv", cv);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully", response.data);
      localStorage.setItem("formCompleted", "true"); // Mark the form as completed in local storage
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Check if the user should be allowed to fill the form
  if (localStorage.getItem("formCompleted")) {
    return <Navigate to="/StudentPortal" />; // Use Navigate for a cleaner redirect
  }
  {
    error && <p style={{ color: "red" }}>{error}</p>;
  }

  switch (step) {
    case 1:
      return (
        <PersonalDetails
          nextStep={handleNextStep}
          handleChange={handleChange}
          formData={formData.personalDetails}
        />
      );
    case 2:
      return (
        <ProfessionalDetails
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
          handleChange={handleChange}
          formData={formData.professionalDetails}
        />
      );
    case 3:
      return (
        <UploadDocuments
          formData={formData}
          handleChange={handleFileChange}
          handleSubmit={handleSubmit}
          prevStep={handlePrevStep}
          isReadyToSubmit={isReadyToSubmit}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default StudentForm;
