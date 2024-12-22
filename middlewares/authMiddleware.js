const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

const authMiddleware = async (req, res, next) => {
<<<<<<< HEAD
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
=======
  try {
    console.log("Authenticating request...");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found or unauthorized" });
    }
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
  }
};

module.exports = authMiddleware;
