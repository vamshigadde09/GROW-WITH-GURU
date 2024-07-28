const Teacher = require("../models/teacherModel");

// Function to create a new teacher record
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Function to get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findById(req.params.id);
    if (!teachers) {
      return res.status(404).send();
    }
    res.status(200).send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};
