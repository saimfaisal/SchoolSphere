import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/Dashboard";
import StudentsPage from "./pages/admin/Students";
import TeachersPage from "./pages/admin/Teachers";
import ClassesPage from "./pages/admin/Classes";
import AdminAttendance from "./pages/admin/Attendance";
import AdminMarks from "./pages/admin/Marks";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherMarks from "./pages/teacher/Marks";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentAttendancePage from "./pages/student/Attendance";
import StudentMarksPage from "./pages/student/Marks";

const AppRoutes = () => {
  const { user } = useAuth();
  const redirectTo = user ? `/${user.role}` : "/login";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentsPage />} />
        <Route path="/admin/teachers" element={<TeachersPage />} />
        <Route path="/admin/classes" element={<ClassesPage />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/marks" element={<AdminMarks />} />
      </Route>

      <Route element={<ProtectedRoute roles={["teacher"]} />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/marks" element={<TeacherMarks />} />
      </Route>

      <Route element={<ProtectedRoute roles={["student"]} />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/attendance" element={<StudentAttendancePage />} />
        <Route path="/student/marks" element={<StudentMarksPage />} />
      </Route>

      <Route path="*" element={<Navigate to={redirectTo} replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
