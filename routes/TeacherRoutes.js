const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/TeacherController"); // Make sure the path matches your project structure

// Route to handle creating a new teacher
router.post("/teachers", teacherController.createTeacher);

// Route to handle retrieving all teachers
router.get("/teachers", teacherController.getAllTeachers);

module.exports = router;
