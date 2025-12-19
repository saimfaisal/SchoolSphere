import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Attendance from "../models/Attendance.js";
import Marks from "../models/Marks.js";

export const getStudents = async (_req, res) => {
  try {
    const students = await Student.find().populate("user", "name email role");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", error: err.message });
  }
};

export const getTeachers = async (_req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teachers", error: err.message });
  }
};

export const createStudent = async (req, res) => {
  const { name, email, password, className, section, rollNo } = req.body;
  if (!name || !email || !password || !className || !section || !rollNo) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.create({ name, email, password, role: "student" });
    const student = await Student.create({ user: user._id, className, section, rollNo });
    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(500).json({ message: "Failed to create student", error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, className, section, rollNo } = req.body;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const user = await User.findById(student.user);
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();

    if (className) student.className = className;
    if (section) student.section = section;
    if (rollNo) student.rollNo = rollNo;
    await student.save();

    res.json({ message: "Student updated", student });
  } catch (err) {
    res.status(500).json({ message: "Failed to update student", error: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    await User.findByIdAndDelete(student.user);
    await student.deleteOne();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student", error: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await User.findById(id);
    if (!teacher || teacher.role !== "teacher") return res.status(404).json({ message: "Teacher not found" });
    await Teacher.deleteMany({ user: teacher._id });
    await teacher.deleteOne();
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete teacher", error: err.message });
  }
};

export const getAttendanceReport = async (_req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 }).populate({
      path: "student",
      populate: { path: "user", select: "name email" }
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance", error: err.message });
  }
};

export const getMarksReport = async (_req, res) => {
  try {
    const records = await Marks.find().sort({ createdAt: -1 }).populate({
      path: "student",
      populate: { path: "user", select: "name email" }
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch marks", error: err.message });
  }
};
