const express = require("express");
const {
  loginController,
  registerController,
  authController,
  updateFormfilledController, // Add this line
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
router.patch("/formfilled", authMiddleware, updateFormfilledController); // Add this line

module.exports = router;
