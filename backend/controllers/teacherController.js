import Attendance from "../models/Attendance.js";
import Marks from "../models/Marks.js";
import Student from "../models/Student.js";

export const recordAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  if (!studentId || !date || !status) return res.status(400).json({ message: "studentId, date, status are required" });
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    const attendance = await Attendance.create({ student: studentId, date, status });
    res.status(201).json({ message: "Attendance recorded", attendance });
  } catch (err) {
    res.status(500).json({ message: "Failed to record attendance", error: err.message });
  }
};

export const addMarks = async (req, res) => {
  const { studentId, subject, marks } = req.body;
  if (!studentId || !subject || marks === undefined) {
    return res.status(400).json({ message: "studentId, subject, marks are required" });
  }
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    const record = await Marks.create({ student: studentId, subject, marks });
    res.status(201).json({ message: "Marks added", marks: record });
  } catch (err) {
    res.status(500).json({ message: "Failed to add marks", error: err.message });
  }
};
