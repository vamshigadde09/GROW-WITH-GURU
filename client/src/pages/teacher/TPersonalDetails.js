import React from "react";
import "../../styles/StudentForm.css";

const TPersonalDetails = ({ nextStep, handleChange, formData = {} }) => {
  const {
    name = "",
    email = "",
    teacherID = "",
    department = "",
    college = "",
    program = "",
    specialization = "",
    cabinNO = "",
  } = formData;

  const onNext = () => {
    nextStep();
  };

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div className="active"></div>
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
          <label>Teacher ID:</label>
          <input
            type="text"
            placeholder="Teacher ID"
            value={teacherID}
            onChange={(e) =>
              handleChange("personalDetails", "teacherID", e.target.value)
            }
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              handleChange("personalDetails", "department", e.target.value)
            }
          />
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
          <label>Cabin Location:</label>
          <input
            type="text"
            placeholder="Cabin Location"
            value={cabinNO}
            onChange={(e) =>
              handleChange("personalDetails", "cabinNO", e.target.value)
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

export default TPersonalDetails;
