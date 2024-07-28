import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import UploadDocuments from "./UploadDocuments";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      registerNumber: "",
      department: "",
      college: "",
      program: "",
      specialization: "",
      education: "",
      section: "",
    },
    professionalDetails: {
      skills: "",
      areaOfInterest: "",
      languages: [],
    },
    documents: {
      photo: null,
      resume: null,
      cv: null,
    },
  });

  const navigate = useNavigate();

  const handleChange = (section, key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setError("");

    const { photo, resume, cv } = formData.documents;
    if (!photo || !resume || !cv) {
      setError("Required documents are not uploaded");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("photo", photo);
    formDataToSend.append("resume", resume);
    formDataToSend.append("cv", cv);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

      navigate("/StudentPortal");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  const validatePersonalDetails = () => {
    const {
      name,
      email,
      registerNumber,
      department,
      college,
      program,
      specialization,
      education,
      section,
    } = formData.personalDetails;
    return (
      name &&
      email &&
      registerNumber &&
      department &&
      college &&
      program &&
      specialization &&
      education &&
      section
    );
  };

  const validateProfessionalDetails = () => {
    const { skills, areaOfInterest, languages } = formData.professionalDetails;
    return skills && areaOfInterest && languages.length > 0;
  };

  const nextStep = () => {
    if (step === 1 && !validatePersonalDetails()) {
      setError("All personal details fields are mandatory.");
      return;
    }
    if (step === 2 && !validateProfessionalDetails()) {
      setError("All professional details fields are mandatory.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <PersonalDetails
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData.personalDetails}
          error={error}
        />
      );
    case 2:
      return (
        <ProfessionalDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData.professionalDetails}
          error={error}
        />
      );
    case 3:
      return (
        <UploadDocuments
          formData={formData.documents}
          handleChange={(key, value) => handleChange("documents", key, value)}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
          error={error}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default StudentForm;
