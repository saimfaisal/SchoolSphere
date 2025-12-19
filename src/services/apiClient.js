const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

const request = async (path, { method = "GET", body, token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  return handleResponse(res);
};

export const loginApi = (email, password) => request("/api/auth/login", { method: "POST", body: { email, password } });
export const registerUser = (token, payload) => request("/api/auth/register", { method: "POST", body: payload, token });

// Admin
export const fetchStudents = (token) => request("/api/admin/students", { token });
export const createStudent = (token, payload) => request("/api/admin/student", { method: "POST", body: payload, token });
export const updateStudentApi = (token, id, payload) =>
  request(`/api/admin/student/${id}`, { method: "PUT", body: payload, token });
export const deleteStudentApi = (token, id) => request(`/api/admin/student/${id}`, { method: "DELETE", token });
export const fetchTeachersAdmin = (token) => request("/api/admin/teachers", { token });
export const deleteTeacherApi = (token, id) => request(`/api/admin/teacher/${id}`, { method: "DELETE", token });
export const fetchAttendanceReport = (token) => request("/api/admin/attendance", { token });
export const fetchMarksReport = (token) => request("/api/admin/marks", { token });

// Teacher
export const submitAttendance = (token, payload) => request("/api/teacher/attendance", { method: "POST", body: payload, token });
export const submitMarks = (token, payload) => request("/api/teacher/marks", { method: "POST", body: payload, token });

// Student
export const fetchMyAttendance = (token) => request("/api/student/attendance", { token });
export const fetchMyMarks = (token) => request("/api/student/marks", { token });
export const fetchMyProfile = (token) => request("/api/student/profile", { token });
