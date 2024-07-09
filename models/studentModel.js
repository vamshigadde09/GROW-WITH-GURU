const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the User model

  personalDetails: {
    name: String,
    email: String,
    registerNumber: String,
    department: String,
    college: String,
    program: String,
    specialization: String,
    education: String,
    section: String,
  },
  professionalDetails: {
    skills: String,
    areaOfInterest: String,
    languages: [String],
  },
  documents: {
    photo: String, // Storing file paths or URLs
    resume: String,
    cv: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
