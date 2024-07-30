const express = require("express");
const {
  loginController,
  registerController,
  authController,
  updateFormfilledController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
router.patch("/formfilled", authMiddleware, updateFormfilledController);

module.exports = router;
