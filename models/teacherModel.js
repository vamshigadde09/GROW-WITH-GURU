const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the User model

  personalDetails: {
    name: String,
    email: String,
    teacherID: String,
    department: String,
    college: String,
    program: String,
    specialization: String,
    cabinNO: String,
  },
  professionalDetails: {
    skills: String,
    areaOfInterest: String,
    program: String,
    languages: [String],
  },
});

const teacher = mongoose.model("teachers", studentSchema);

module.exports = teacher;
