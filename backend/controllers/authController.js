import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

// Admin can register any role user
export const registerUser = async (req, res) => {
  const { name, email, password, role, className, section, rollNo } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password, role });

    // If registering a student via this endpoint, also create the student profile
    if (role === "student") {
      if (!className || !section || !rollNo) {
        return res
          .status(400)
          .json({ message: "className, section, and rollNo are required when registering a student." });
      }
      await Student.create({ user: user._id, className, section, rollNo });
    }

    return res
      .status(201)
      .json({ message: "User created", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user._id, user.role);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};
