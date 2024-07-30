const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/TeacherController");

router.post("/teachers", teacherController.createTeacher);
router.get("/teachers", teacherController.getAllTeachers);

module.exports = router;
