import React, { useState, useEffect } from "react";
import TPersonalDetails from "./TPersonalDetails";
import TProfessionalDetails from "./TProfessionalDetails";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const TeacherForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      teacherID: "",
      department: "",
      college: "",
      program: "",
      specialization: "",
      cabinNO: "",
    },
    professionalDetails: {
      skills: "",
      program: "",
      areaOfInterest: "",
      languages: [],
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const formCompleted = localStorage.getItem("teacherFormCompleted");
    if (formCompleted) {
      navigate("/TeacherPortal");
    }
  }, [navigate]);

  useEffect(() => {
    if (formSubmitted) {
      navigate("/TeacherPortal");
    }
  }, [formSubmitted, navigate]);

  const handleChange = (section, key, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [key]: value },
    });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/teachers",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.patch(
        "http://localhost:8080/api/v1/user/formfilled",
        { formfilled: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/TeacherPortal");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return (
        <TPersonalDetails
          nextStep={handleNextStep}
          handleChange={handleChange}
          formData={formData.personalDetails}
          error={error}
        />
      );
    case 2:
      return (
        <TProfessionalDetails
          prevStep={handlePrevStep}
          handleChange={handleChange}
          formData={formData.professionalDetails}
          handleSubmit={handleSubmit}
          error={error}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default TeacherForm;
