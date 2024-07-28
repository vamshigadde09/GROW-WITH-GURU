import React from "react";
import "../../styles/StudentForm.css";

const TProfessionalDetails = ({
  prevStep,
  handleChange,
  formData,
  handleSubmit,
}) => {
  const {
    skills = "",
    program = "",
    areaOfInterest = "",
    languages = [],
  } = formData;

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div></div>
        <div className="active"></div>
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
        <div>
          <label>Languages:</label>
          <input
            type="text"
            placeholder="Languages"
            value={languages.join(", ")}
            onChange={(e) =>
              handleChange(
                "professionalDetails",
                "languages",
                e.target.value.split(", ")
              )
            }
          />
        </div>
      </div>
      <div className="button-group">
        <button className="button" onClick={prevStep}>
          Back
        </button>
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TProfessionalDetails;
