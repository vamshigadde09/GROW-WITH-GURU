import React from "react";
import "../../styles/StudentForm.css";

const PersonalDetails = ({ nextStep, handleChange, formData = {} }) => {
  const {
    name = "",
    email = "",
    registerNumber = "",
    department = "",
    college = "",
    program = "",
    specialization = "",
    education = "",
    section = "",
  } = formData;

  const onNext = () => {
    nextStep();
  };

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div className="active"></div>
        <div></div>
        <div></div>
      </div>
      <h2>Personal Details</h2>
      <div className="form-box">
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              handleChange("personalDetails", "name", e.target.value)
            }
          />
        </div>
        <div>
          <label>Email ID:</label>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) =>
              handleChange("personalDetails", "email", e.target.value)
            }
          />
        </div>
        <div>
          <label>Register No.:</label>
          <input
            type="text"
            placeholder="Register No."
            value={registerNumber}
            onChange={(e) =>
              handleChange("personalDetails", "registerNumber", e.target.value)
            }
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) =>
              handleChange("personalDetails", "department", e.target.value)
            }
            className="form-control" // Add a class for consistent styling
          >
            <option value="">select department</option>
            <option value="DSBS">DSBS</option>
            <option value="CINTAL">CINTAL</option>
          </select>
        </div>

        <div>
          <label>College:</label>
          <input
            type="text"
            placeholder="College"
            value={college}
            onChange={(e) =>
              handleChange("personalDetails", "college", e.target.value)
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
              handleChange("personalDetails", "program", e.target.value)
            }
          />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) =>
              handleChange("personalDetails", "specialization", e.target.value)
            }
          />
        </div>
        <div>
          <label>Education:</label>
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) =>
              handleChange("personalDetails", "education", e.target.value)
            }
          />
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            placeholder="Section"
            value={section}
            onChange={(e) =>
              handleChange("personalDetails", "section", e.target.value)
            }
          />
        </div>
      </div>
      <div className="button-group">
        <button className="button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
