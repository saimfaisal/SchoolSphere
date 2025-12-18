import React, { createContext, useContext, useMemo, useState } from "react";
import { students as seedStudents } from "../data/students";
import { teachers as seedTeachers } from "../data/teachers";
import { classes as seedClasses } from "../data/classes";
import { attendanceRecords as seedAttendance, studentAttendance as seedStudentAttendance } from "../data/attendance";
import { marks as seedMarks } from "../data/marks";

const DataContext = createContext(null);

const generateId = (prefix) =>
  `${prefix}-${
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 8)
  }`;

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(seedStudents);
  const [teachers, setTeachers] = useState(seedTeachers);
  const [classes, setClasses] = useState(seedClasses);
  const [attendance, setAttendance] = useState(seedAttendance);
  const [studentAttendance, setStudentAttendance] = useState(seedStudentAttendance);
  const [marks, setMarks] = useState(seedMarks);

  const addStudent = (payload) => {
    const newStudent = { id: generateId("s"), ...payload };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id, updates) => {
    setStudents((prev) => prev.map((st) => (st.id === id ? { ...st, ...updates } : st)));
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((st) => st.id !== id));
  };

  const addTeacher = (payload) => {
    const newTeacher = { id: generateId("t"), ...payload };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const updateTeacher = (id, updates) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const addClassroom = (payload) => {
    const newClass = { id: generateId("c"), ...payload };
    setClasses((prev) => [...prev, newClass]);
  };

  const updateClassroom = (id, updates) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteClassroom = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const recordAttendance = ({ classId, date, present, absent, remarks }) => {
    const entry = { id: generateId("a"), classId, date, present, absent, remarks };
    setAttendance((prev) => [...prev, entry]);
  };

  const markStudentAttendance = ({ studentId, date, status }) => {
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), { date, status }]
    }));
  };

  const addMark = ({ studentId, course, score, total, term }) => {
    const entry = { id: generateId("m"), studentId, course, score: Number(score), total: Number(total), term };
    setMarks((prev) => [...prev, entry]);
  };

  const metrics = useMemo(
    () => ({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalClasses: classes.length
    }),
    [students.length, teachers.length, classes.length]
  );

  const getStudentsByClass = (classId) => students.filter((s) => s.classId === classId);
  const getTeacherById = (teacherId) => teachers.find((t) => t.id === teacherId);
  const getClassById = (classId) => classes.find((c) => c.id === classId);

  const value = {
    students,
    teachers,
    classes,
    attendance,
    studentAttendance,
    marks,
    metrics,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addClassroom,
    updateClassroom,
    deleteClassroom,
    recordAttendance,
    markStudentAttendance,
    addMark,
    getStudentsByClass,
    getTeacherById,
    getClassById
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
};
