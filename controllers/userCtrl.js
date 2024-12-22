const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD

//register callback
=======
const studentProfileModel = require("../models/studentprofile");
const teacherProfileModel = require("../models/teacherporfile");

>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
<<<<<<< HEAD
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
=======
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
<<<<<<< HEAD
    console.error("Register Controller Error:", error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
=======
    res
      .status(500)
      .send({ message: `Register Error: ${error.message}`, success: false });
  }
};

>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
<<<<<<< HEAD
        .status(200)
=======
        .status(404)
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
<<<<<<< HEAD
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
=======
        .status(401)
        .send({ message: "Invalid Credentials", success: false });
    }

>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
<<<<<<< HEAD

=======
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
    res.status(200).send({
      message: "Login Successful",
      success: true,
      token,
      role: user.role,
<<<<<<< HEAD
      formfilled: user.formfilled, // Add this line
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Controller ${error.message}` });
=======
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Login Error: ${error.message}`, success: false });
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
  }
};

const authController = async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
    // Validate if req.user.id exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized: User ID is missing.",
        success: false,
      });
    }

    // Fetch user details
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    // Fetch profiles
    const [studentProfile, teacherProfile] = await Promise.all([
      studentProfileModel.findOne({ userId: req.user.id }),
      teacherProfileModel.findOne({ userId: req.user.id }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        user: user.toObject(),
        studentProfile: studentProfile ? studentProfile.toObject() : null,
        teacherProfile: teacherProfile ? teacherProfile.toObject() : null,
      },
    });
  } catch (error) {
    console.error("Auth Controller Error:", error.message);
    res.status(500).json({
      message: `Internal server error: ${error.message}`,
      success: false,
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
    });
  }
};

<<<<<<< HEAD
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
=======
const updateProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User ID:", req.user?.id);

    const {
      name,
      phone,
      department,
      batch,
      program,
      specialization,
      branch,
      linkedIn,
      careerGoals,
      gpa,
      additionalNotes,
      projects,
      profilePicture,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !phone ||
      !department ||
      !batch ||
      !program ||
      !specialization ||
      !branch
    ) {
      return res.status(400).json({
        message: "All required fields must be filled.",
        success: false,
      });
    }

    // Update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    // Update or create the student profile
    let updatedProfile = await studentProfileModel.findOneAndUpdate(
      { userId: req.user.id },
      {
        name,
        phone,
        department,
        batch,
        program,
        specialization,
        branch,
        linkedIn,
        careerGoals,
        gpa,
        additionalNotes,
        projects,
        profilePicture,
        isProfileUpdated: true,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      updatedProfile = new studentProfileModel({
        userId: req.user.id,
        name,
        phone,
        department,
        batch,
        program,
        specialization,
        branch,
        linkedIn,
        careerGoals,
        gpa,
        additionalNotes,
        projects,
        profilePicture,
        isProfileUpdated: true,
      });
      await updatedProfile.save();
    }

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: {
        user: updatedUser,
        studentProfile: updatedProfile,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error: " + error.message,
      success: false,
    });
  }
};

const updateTeacherProfile = async (req, res) => {
  try {
    const {
      name,
      department,
      profilePicture,
      contactDetails,
      designation,
      preferredNotificationMethod,
      publications,
      skills,
      availability, // Update availability field
      availabilityNotes, // Update availabilityNotes field
      linkedIn, // Update LinkedIn field
      otherProfessionalLinks, // Update otherProfessionalLinks field
    } = req.body;

    console.log("Updating profile for user:", req.user.id);

    // Update the User model
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    // Update or create the Teacher Profile
    let updatedProfile = await teacherProfileModel.findOneAndUpdate(
      { userId: req.user.id },
      {
        name,
        contactDetails,
        designation,
        department,
        preferredNotificationMethod,
        publications,
        profilePicture,
        skills,
        availability,
        availabilityNotes,
        linkedIn,
        otherProfessionalLinks,
        isteacherProfileUpdated: true,
        userId: req.user.id,
      },
      { new: true, runValidators: true }
    );

    // Create a new profile if it does not exist
    if (!updatedProfile) {
      console.log("Profile not found, creating a new one");
      updatedProfile = new teacherProfileModel({
        userId: req.user.id,
        name,
        contactDetails,
        designation,
        department,
        areasOfExpertise,
        preferredNotificationMethod,
        publications,
        profilePicture,
        skills,
        availability, // Include new field
        availabilityNotes, // Include new field
        linkedIn, // Include new field
        otherProfessionalLinks, // Include new field
        isteacherProfileUpdated: true,
      });
      await updatedProfile.save();
    }

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({
      message: "Internal server error: " + error.message,
      success: false,
    });
  }
};

const searchTeachers = async (req, res) => {
  const { name = "", skills = "" } = req.query;
  try {
    const query = {
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(skills && { "skills.skillName": { $regex: skills, $options: "i" } }),
    };

    const teachers = await teacherProfileModel
      .find(query)
      .select("_id name designation skills");
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error("Error in searchTeachers:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeacherDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await teacherProfileModel.findById(id);
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.error("Error fetching teacher details:", error.message);
    res.status(500).json({ success: false, message: error.message });
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
  }
};

module.exports = {
<<<<<<< HEAD
  loginController,
  registerController,
  authController,
  updateFormfilledController,
=======
  registerController,
  loginController,
  authController,
  updateProfile,
  updateTeacherProfile,
  searchTeachers,
  getTeacherDetails,
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
};
