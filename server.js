const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // This will enable all CORS requests

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/students", require("./routes/studentRoutes"));
app.use("/api/v1/teachers", require("./routes/TeacherRoutes"));

app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    console.error("Failed to save student", error);
    res.status(500).send({ message: "Failed to save student data" });
  }
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3001", // allow only requests from this origin
  })
);

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
