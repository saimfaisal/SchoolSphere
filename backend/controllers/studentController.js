import Attendance from "../models/Attendance.js";
import Marks from "../models/Marks.js";
import Student from "../models/Student.js";

export const getProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user._id }).populate("user", "name email role");
    if (!student) {
      // Auto-create a minimal profile if missing to avoid 404s after a bare student registration
      student = await Student.create({
        user: req.user._id,
        className: "Not Assigned",
        section: "N/A",
        rollNo: `AUTO-${req.user._id.toString().slice(-5)}`
      });
      student = await student.populate("user", "name email role");
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    const records = await Attendance.find({ student: student._id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance", error: err.message });
  }
};

export const getMarks = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    const records = await Marks.find({ student: student._id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch marks", error: err.message });
  }
};
