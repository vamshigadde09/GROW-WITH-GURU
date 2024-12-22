const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
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
  formfilled: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Teacher"], required: true },
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
