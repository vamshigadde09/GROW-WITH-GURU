const Teacher = require("../models/teacherModel");

// Function to create a new teacher record
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    console.error("Error saving student: ", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

// Function to get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};
