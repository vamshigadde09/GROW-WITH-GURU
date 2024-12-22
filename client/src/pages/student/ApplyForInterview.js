<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";
import "../../styles/ApplyForInterview.css";

const ApplyForInterview = () => {
  const navigate = useNavigate();
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";
import "../../styles/ApplyForInterview.css";
import Select from "react-select";
import { TextField } from "@mui/material";

const ApplyForInterview = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
<<<<<<< HEAD
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

=======
    topic: "",
    skills: [],
    interviewType: "",
    experienceLevel: "",
    date: "",
    startTime: "",
    interviewMode: "",
    driveLink: "",
    teacher: [],
    resourcesLink: "",
    notes: "",
  });

  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const skillsOptions = [
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Science", label: "Data Science" },
    { value: "Deep Learning", label: "Deep Learning" },
    { value: "Python", label: "Python", group: "Programming Languages" },
    { value: "Java", label: "Java", group: "Programming Languages" },
    {
      value: "JavaScript",
      label: "JavaScript",
      group: "Programming Languages",
    },
    { value: "React", label: "React", group: "Frontend Frameworks" },
    { value: "Angular", label: "Angular", group: "Frontend Frameworks" },
  ];

  const groupedOptions = [
    {
      label: "Programming Languages",
      options: skillsOptions.filter(
        (opt) => opt.group === "Programming Languages"
      ),
    },
    {
      label: "Frontend Frameworks",
      options: skillsOptions.filter(
        (opt) => opt.group === "Frontend Frameworks"
      ),
    },
  ];

  const fetchTeachers = async (name = "", skill = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/searchTeachers",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { name, skills: skill },
        }
      );
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error.response?.data || error);
      alert("Error fetching teachers.");
    }
  };

  const checkProfileStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userData = response.data.data;
      setIsProfileUpdated(userData.studentProfile?.isProfileUpdated || false);
      setFormData((prevData) => ({
        ...prevData,
        name: userData.user.name || "",
        email: userData.user.email || "",
      }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to load user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfileStatus();
  }, []);

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      fetchTeachers(value, selectedSkill ? selectedSkill.value : "");
    } else {
      setTeachers([]); // Clear suggestions if no input
    }
  };

  const handleTeacherSelect = (teacher) => {
    if (selectedTeachers.length < 2) {
      setSelectedTeachers((prevSelected) => {
        if (!prevSelected.includes(teacher)) {
          return [...prevSelected, teacher];
        } else {
          return prevSelected;
        }
      });
    } else {
      alert("You can select up to 2 teachers only.");
    }
  };

  const handleTeacherDeselect = (teacher) => {
    setSelectedTeachers((prevSelected) =>
      prevSelected.filter((t) => t._id !== teacher._id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "topic",
      "skills",
      "interviewType",
      "experienceLevel",
      "date",
      "startTime",
      "interviewMode",
    ];

    const isAllFieldsFilled = requiredFields.every(
      (field) => formData[field] && formData[field].length > 0
    );

    if (!isAllFieldsFilled) {
      alert("Please fill out all required fields before submitting.");
      return;
    }

    // Determine the value of `noteacher`
    const noteacher = selectedTeachers.length === 0;

    // Show alert if no teacher is selected
    if (noteacher) {
      alert(
        "No teacher selected. Your request will be submitted without assigning a teacher."
      );
    }

    // Log the payload for debugging
    console.log("Payload sent to API:", {
      ...formData,
      teacher: selectedTeachers.map((teacher) => ({
        teacherId: teacher._id, // Ensure the teacher is in the correct format with teacherId
      })),
      noteacher,
      applicationNumber: Date.now(),
    });

    // Then send the correct structure in the POST request
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/interview/create",
        {
          ...formData,
          teacher: selectedTeachers.map((teacher) => ({
            teacherId: teacher._id, // Correct the teacher field structure
          })),
          noteacher, // Pass the noteacher variable
          applicationNumber: Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/StudentPortal");
      } else {
        alert(response.data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error(
        "Error submitting interview request:",
        error.response?.data || error.message
      );
      alert("An error occurred. Please check your inputs or try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;

>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
  return (
    <div className="growwithguru-container">
      <StudentHeader />
      <div className="form-container">
        <h1>Apply for Interview</h1>
<<<<<<< HEAD
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
=======
        {isProfileUpdated ? (
          <form onSubmit={handleSubmit} className="form-box">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                disabled
              />
            </div>
            <div>
              <label>Email ID:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
              />
            </div>
            <div>
              <label>Topic/Skill Area:</label>
              <select
                name="topic"
                value={formData.topic || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Topic</option>
                <option value="Coding">Coding</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Problem-Solving">Problem-Solving</option>
                <option value="Behavioral">Behavioral</option>
              </select>
            </div>

            <div>
              <label htmlFor="teacherSearch">Search Teacher:</label>
              <TextField
                variant="outlined"
                placeholder="Type a teacher's name"
                value={searchTerm}
                onChange={handleSearchTermChange}
                fullWidth
              />
              {teachers.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {teachers.map((teacher) => (
                    <div
                      key={teacher._id}
                      className="teacher-card"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "15px",
                        width: "300px",
                        backgroundColor: "#f9f9f9",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <h3>{teacher.name}</h3>
                      <p>
                        <strong>Designation:</strong> {teacher.designation}
                      </p>
                      <p>
                        <strong>Skills:</strong>{" "}
                        {teacher.skills.map((s) => s.skillName).join(", ")}
                      </p>
                      <button
                        className="select-teacher-btn"
                        style={{
                          backgroundColor: selectedTeachers.includes(teacher)
                            ? "#28a745"
                            : "#007bff",
                          color: "white",
                          border: "none",
                          padding: "10px 15px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (selectedTeachers.includes(teacher)) {
                            handleTeacherDeselect(teacher);
                          } else {
                            handleTeacherSelect(teacher);
                          }
                        }}
                      >
                        {selectedTeachers.includes(teacher)
                          ? "Deselect"
                          : "Select"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {selectedTeachers.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h3>Selected Teachers:</h3>
                  <div
                    style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                  >
                    {selectedTeachers.map((teacher) => (
                      <div
                        key={teacher._id}
                        className="selected-teacher-card"
                        style={{
                          border: "1px solid #007bff",
                          borderRadius: "8px",
                          padding: "10px",
                          backgroundColor: "#e9f5ff",
                          textAlign: "center",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <h4>{teacher.name}</h4>
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleTeacherDeselect(teacher)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label>Skills:</label>
              <Select
                options={groupedOptions}
                isMulti
                name="skills"
                value={skillsOptions.filter((option) =>
                  formData.skills.includes(option.value)
                )}
                onChange={handleMultiSelectChange}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div>
              <label>Mock Interview Type:</label>
              <select
                name="interviewType"
                value={formData.interviewType || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Case Study">Case Study</option>
                <option value="Behavioral">Behavioral</option>
              </select>
            </div>
            <div>
              <label>Experience Level:</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label>Available Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Time Range:</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Preferred Interview Mode:</label>
              <select
                name="interviewMode"
                value={formData.interviewMode || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Video Call">Video Call</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
            <div>
              <label>Drive Link (Optional):</label>
              <input
                type="text"
                name="driveLink"
                value={formData.driveLink || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Resources Link (Optional):</label>
              <input
                type="text"
                name="resourcesLink"
                value={formData.resourcesLink || ""}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="notes"
              placeholder="Add any additional notes"
              value={formData.notes}
              onChange={handleChange}
            />
            <button type="submit">Submit Request</button>
          </form>
        ) : (
          <div className="profile-update-container">
            <h3>
              Your profile is incomplete. Please update your profile to apply
              for an interview.
            </h3>
            <button onClick={() => navigate("/ProfilePage")}>
              Update Profile
            </button>
          </div>
        )}
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
      </div>
      <Footer />
    </div>
  );
};

export default ApplyForInterview;
