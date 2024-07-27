import React from "react";
import "../../styles/StudentForm.css";

const UploadDocuments = ({
  handleSubmit,
  prevStep,
  handleChange,
  formData,
  error,
}) => {
  const isReadyToSubmit = formData.photo && formData.resume && formData.cv;

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div></div>
        <div></div>
        <div className="active"></div>
      </div>
      <h2>Upload Documents</h2>
      <div className="form-box">
        <div>
          <label>Photo:</label>
          <input
            type="file"
            onChange={(e) => handleChange("photo", e.target.files[0])}
          />
        </div>
        <div>
          <label>Resume:</label>
          <input
            type="file"
            onChange={(e) => handleChange("resume", e.target.files[0])}
          />
        </div>
        <div>
          <label>CV:</label>
          <input
            type="file"
            onChange={(e) => handleChange("cv", e.target.files[0])}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="button-group">
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit} disabled={!isReadyToSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
