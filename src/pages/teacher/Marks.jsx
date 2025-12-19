import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { submitMarks } from "../../services/apiClient";

const TeacherMarks = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    marks: ""
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
    if (!form.studentId || !form.subject || form.marks === "") {
      setError("Student ID, subject, and marks are required.");
      return;
    }
    try {
      await submitMarks(token, { ...form, marks: Number(form.marks) });
      setMessage("Marks uploaded to backend.");
      setForm((prev) => ({ ...prev, subject: prev.subject, marks: "", studentId: "" }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <PageHeader title="Upload Marks" description="Submit marks directly to MongoDB for any student ID." />

      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Marks Entry</h3>
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
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Web Engineering"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Marks</label>
              <input
                type="number"
                name="marks"
                value={form.marks}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            Save Marks
          </button>
        </form>
        <p className="text-xs text-slate-500">
          Copy the student ID from Admin &gt; Students. Students will see these entries in their Marks page.
        </p>
      </div>
    </Layout>
  );
};

export default TeacherMarks;
