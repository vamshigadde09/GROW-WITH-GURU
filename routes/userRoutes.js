const express = require("express");
const {
  loginController,
  registerController,
  authController,
<<<<<<< HEAD
  updateFormfilledController, // Add this line
=======
  updateProfile,
  updateTeacherProfile,
  searchTeachers,
  getTeacherDetails,
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
<<<<<<< HEAD
router.patch("/formfilled", authMiddleware, updateFormfilledController); // Add this line
=======
router.put("/updateProfile", authMiddleware, updateProfile);
router.put("/updateTeacherProfile", authMiddleware, updateTeacherProfile);
router.get("/searchTeachers", authMiddleware, searchTeachers);
router.get("/teacher/:id", authMiddleware, getTeacherDetails);
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)

module.exports = router;
