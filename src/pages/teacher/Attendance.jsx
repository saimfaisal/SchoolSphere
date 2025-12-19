import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { submitAttendance } from "../../services/apiClient";

const TeacherAttendance = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    studentId: "",
    date: new Date().toISOString().slice(0, 10),
    status: "Present"
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.studentId || !form.date || !form.status) {
      setError("Student ID, date, and status are required.");
      return;
    }
    try {
      await submitAttendance(token, form);
      setMessage("Attendance saved to backend.");
      setForm((prev) => ({ ...prev, studentId: "" }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <PageHeader title="Mark Attendance" description="Submit attendance directly to MongoDB. Use student IDs from Admin > Students." />

      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Attendance Form</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Student ID</label>
              <input
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Paste student _id"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            Save Attendance
          </button>
        </form>
        <p className="text-xs text-slate-500">
          Tip: Open Admin &gt; Students, click a row, and copy the MongoDB ID to record attendance here.
        </p>
      </div>
    </Layout>
  );
};

export default TeacherAttendance;
