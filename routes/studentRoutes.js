const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel"); // Ensure the path is correct
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Middleware for JSON body parsing
router.use(express.json());

const handleErrors = (error, res) => {
  console.error("Error: ", error);
  res.status(500).send({ message: "Server error", error: error.message });
};

router.post(
  "/",
  upload.fields([{ name: "photo" }, { name: "resume" }, { name: "cv" }]),
  async (req, res) => {
    try {
      console.log("Received body: ", req.body);
      console.log("Received files: ", req.files);

      const newStudent = new Student({
        personalDetails: req.body.personalDetails,
        professionalDetails: req.body.professionalDetails,
        documents: {
          photo: req.files.photo ? req.files.photo[0].path : "",
          resume: req.files.resume ? req.files.resume[0].path : "",
          cv: req.files.cv ? req.files.cv[0].path : "",
        },
      });

      await newStudent.save();
      res.status(201).send(newStudent);
    } catch (error) {
      console.error("Error saving student: ", error);
      res.status(500).send({ message: "Server error", error: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    // Simulate fetching data from a database
    const studentsData = await Student.find();
    res.json(studentsData);
  } catch (error) {
    console.error("Failed to fetch students", error);
    res.status(500).send("Failed to fetch students");
  }
});
module.exports = router;
