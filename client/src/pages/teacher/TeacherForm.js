import React, { useState, useEffect } from "react";
import TPersonalDetails from "./TPersonalDetails";
import TProfessionalDetails from "./TProfessionalDetails";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const TeacherForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    TPersonalDetails: {},
    TProfessionalDetails: {},
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const formCompleted = localStorage.getItem("teacherFormCompleted");
    if (formCompleted) {
      navigate("/teacherPortal");
    }
  }, [navigate]);

  useEffect(() => {
    if (formSubmitted) {
      navigate("/teacherPortal");
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/teachers",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submitted successfully", response.data);
      localStorage.setItem("teacherFormCompleted", "true");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (localStorage.getItem("teacherFormCompleted")) {
    return <Navigate to="/teacherPortal" />;
  }

  switch (step) {
    case 1:
      return (
        <TPersonalDetails
          nextStep={handleNextStep}
          handleChange={handleChange}
          formData={formData.TPersonalDetails}
        />
      );
    case 2:
      return (
        <TProfessionalDetails
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
          handleChange={handleChange}
          formData={formData.TProfessionalDetails}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default TeacherForm;
