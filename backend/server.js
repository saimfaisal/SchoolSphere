import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Student from "./models/Student.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "SchoolSphere backend up and running" });
});

// Global error handler (basic)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;

// Create a default admin if none exists. Useful for first-time login to avoid 401.
const seedDefaultAdmin = async () => {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@school.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@123";
  const name = process.env.SEED_ADMIN_NAME || "Default Admin";

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ name, email, password, role: "admin" });
    console.log(`Seeded default admin -> ${email}`);
  }
};

const seedDefaultTeacher = async () => {
  const email = process.env.SEED_TEACHER_EMAIL || "teacher@school.com";
  const password = process.env.SEED_TEACHER_PASSWORD || "Teacher@123";
  const name = process.env.SEED_TEACHER_NAME || "Default Teacher";

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ name, email, password, role: "teacher" });
    console.log(`Seeded default teacher -> ${email}`);
  }
};

const seedDefaultStudent = async () => {
  const email = process.env.SEED_STUDENT_EMAIL || "student@school.com";
  const password = process.env.SEED_STUDENT_PASSWORD || "Student@123";
  const name = process.env.SEED_STUDENT_NAME || "Default Student";
  const className = process.env.SEED_STUDENT_CLASS || "BSCS 8A";
  const section = process.env.SEED_STUDENT_SECTION || "A";
  const rollNo = process.env.SEED_STUDENT_ROLLNO || "BSCS-1801";

  const existing = await User.findOne({ email });
  if (!existing) {
    const user = await User.create({ name, email, password, role: "student" });
    await Student.create({ user: user._id, className, section, rollNo });
    console.log(`Seeded default student -> ${email}`);
  }
};

const startServer = async () => {
  await connectDB();
  await seedDefaultAdmin();
  await seedDefaultTeacher();
  await seedDefaultStudent();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
