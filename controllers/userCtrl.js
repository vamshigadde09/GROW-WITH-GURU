const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error("Register Controller Error:", error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      message: "Login Successful",
      success: true,
      token,
      role: user.role,
      formfilled: user.formfilled, // Add this line
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Controller ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        formfilled: user.formfilled, // Ensure this is returned
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user id is stored in req.user by the authMiddleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateFormfilledController = async (req, res) => {
  try {
    const userId = req.user.id;
    await userModel.findByIdAndUpdate(userId, { formfilled: true });
    res.status(200).send({
      success: true,
      message: "Formfilled status updated successfully",
    });
  } catch (error) {
    console.error("Error updating formfilled status:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  updateFormfilledController,
};
