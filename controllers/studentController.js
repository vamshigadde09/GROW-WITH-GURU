const Student = require("../models/studentModel");

exports.saveStudent = async (req, res) => {
  try {
    const { personalDetails, professionalDetails, documents } = req.body;

    // Validate personal details
    const requiredPersonalFields = [
      "name",
      "email",
      "registerNumber",
      "department",
      "college",
      "program",
      "specialization",
      "education",
      "section",
    ];
    for (let field of requiredPersonalFields) {
      if (!personalDetails[field]) {
        return res
          .status(400)
          .send({ error: `Missing personal detail: ${field}` });
      }
    }

    // Validate professional details
    const requiredProfessionalFields = [
      "skills",
      "areaOfInterest",
      "languages",
    ];
    for (let field of requiredProfessionalFields) {
      if (
        !professionalDetails[field] ||
        (Array.isArray(professionalDetails[field]) &&
          professionalDetails[field].length === 0)
      ) {
        return res
          .status(400)
          .send({ error: `Missing professional detail: ${field}` });
      }
    }

    // Validate documents
    if (!documents.photo || !documents.resume || !documents.cv) {
      return res.status(400).send({ error: "Missing required documents" });
    }

    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (error) {
    res.status(500).send();
  }
};
