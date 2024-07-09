const express = require("express");
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is attached to req.user by authMiddleware
    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error("Failed to fetch user data", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});
module.exports = router;
