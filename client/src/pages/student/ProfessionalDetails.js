import React from "react";
import "../../styles/StudentForm.css";

const ProfessionalDetails = ({
  nextStep,
  prevStep,
  handleChange,
  formData = {},
  error,
}) => {
  const {
    skills = "",
    program = "",
    areaOfInterest = "",
    languages = [],
  } = formData;

  const onNext = () => {
    nextStep();
  };

  const onBack = () => {
    prevStep();
  };

  const handleCheckboxChange = (language) => {
    const updatedLanguages = languages.includes(language)
      ? languages.filter((lang) => lang !== language)
      : [...languages, language];
    handleChange("professionalDetails", "languages", updatedLanguages);
  };

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div></div>
        <div className="active"></div>
        <div></div>
      </div>
      <h2>Professional Details</h2>
      <div className="form-box">
        <div>
          <label>Skills:</label>
          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={(e) =>
              handleChange("professionalDetails", "skills", e.target.value)
            }
          />
        </div>
        <div>
          <label>Program:</label>
          <input
            type="text"
            placeholder="Program"
            value={program}
            onChange={(e) =>
              handleChange("professionalDetails", "program", e.target.value)
            }
          />
        </div>
        <div>
          <label>Area of Interest:</label>
          <input
            type="text"
            placeholder="Area of Interest"
            value={areaOfInterest}
            onChange={(e) =>
              handleChange(
                "professionalDetails",
                "areaOfInterest",
                e.target.value
              )
            }
          />
        </div>
        <div className="checkbox-group">
          <label>Languages:</label>
          <div>
            <input
              type="checkbox"
              checked={languages.includes("Python")}
              onChange={() => handleCheckboxChange("Python")}
            />
            <label>Python</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={languages.includes("Java")}
              onChange={() => handleCheckboxChange("Java")}
            />
            <label>Java</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={languages.includes("C")}
              onChange={() => handleCheckboxChange("C")}
            />
            <label>C</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={languages.includes("C++")}
              onChange={() => handleCheckboxChange("C++")}
            />
            <label>C++</label>
          </div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
