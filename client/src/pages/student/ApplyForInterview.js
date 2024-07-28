import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";
import "../../styles/ApplyForInterview.css";

const ApplyForInterview = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
    specialization: "",
    skills: "",
    companyName: "",
    details: "",
    reason: "",
    dateTime: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="growwithguru-container">
      <StudentHeader />
      <div className="form-container">
        <h1>Apply for Interview</h1>
        <form onSubmit={handleSubmit} className="form-box">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email ID:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Program:</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Details:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>Reason:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>What do you expect for this interview?</label>
            <input
              type="text"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Resume:</label>
            <input type="file" name="resume" onChange={handleFileChange} />
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="faq-section">
          <h2>FAQ Section:</h2>
          <dl>
            <dt>How do I schedule a mock interview?</dt>
            <dd>
              Sign up or log in to your account, navigate to the scheduling
              section, and select a suitable time and interviewer.
            </dd>
            <dt>What kind of feedback will I receive?</dt>
            <dd>
              You will receive detailed feedback on various aspects of your
              interview performance, including communication skills, body
              language, and content of your answers.
            </dd>
            <dt>Can I review my interview recordings?</dt>
            <dd>
              Yes, all mock interviews are recorded, and you can review the
              recordings to assess your performance.
            </dd>
            <dt>How is my privacy protected?</dt>
            <dd>
              Your privacy is our priority. All data, including video
              recordings, are securely stored and only accessible to you and
              your interviewer.
            </dd>
            <dt>What if I need technical support?</dt>
            <dd>
              You can reach out to our support team via email or use our
              real-time chat feature for immediate assistance.
            </dd>
          </dl>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyForInterview;
