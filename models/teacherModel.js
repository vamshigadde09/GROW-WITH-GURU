const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the User model

  TpersonalDetails: {
    name: String,
    email: String,
    teacherID: String,
    department: String,
    college: String,
    program: String,
    specialization: String,
    cabinNO: String,
  },
  TprofessionalDetails: {
    skills: String,
    areaOfInterest: String,
    program: String,
    languages: [String],
  },
});

const teacher = mongoose.model("teachers", teacherSchema);

module.exports = teacher;
