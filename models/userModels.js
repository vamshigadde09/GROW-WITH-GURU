const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  role: {
    type: String,
    enum: ["Teacher", "Student"],
    required: [true, "Role is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
