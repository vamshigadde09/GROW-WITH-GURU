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

// Fetch student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch student", error: error.message });
  }
});

// Route to update student details
router.patch(
  "/:id",
  upload.fields([{ name: "photo" }, { name: "resume" }, { name: "cv" }]),
  async (req, res) => {
    try {
      const updatedData = {
        personalDetails: req.body.personalDetails,
        professionalDetails: req.body.professionalDetails,
        documents: {
          photo: req.files.photo ? req.files.photo[0].path : "",
          resume: req.files.resume ? req.files.resume[0].path : "",
          cv: req.files.cv ? req.files.cv[0].path : "",
        },
      };

      const student = await Student.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
      res.json(student);
    } catch (error) {
      handleErrors(error, res);
    }
  }
);

module.exports = router;
