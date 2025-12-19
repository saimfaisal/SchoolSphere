import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { createStudent, deleteStudentApi, fetchStudents, updateStudentApi } from "../../services/apiClient";

const StudentsPage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    className: "",
    section: "",
    rollNo: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents(token);
      setStudents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.className || !form.section || !form.rollNo) {
      setError("All fields are required.");
      return;
    }
    try {
      if (editingId) {
        await updateStudentApi(token, editingId, form);
        setEditingId(null);
      } else {
        await createStudent(token, form);
      }
      setForm({ name: "", email: "", password: "", className: "", section: "", rollNo: "" });
      loadStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.user?.name || "",
      email: student.user?.email || "",
      password: "",
      className: student.className || "",
      section: student.section || "",
      rollNo: student.rollNo || ""
    });
    setError("");
  };

  const columns = useMemo(
    () => [
      { key: "name", label: "Name", render: (_val, row) => row.user?.name },
      { key: "rollNo", label: "Roll No" },
      { key: "email", label: "Email", render: (_val, row) => row.user?.email },
      { key: "className", label: "Class" },
      { key: "section", label: "Section" }
    ],
    []
  );

  return (
    <Layout>
      <PageHeader
        title="Manage Students"
        description="Add, edit, and remove students. Validation prevents missing required fields."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Student" : "Add Student"}</h3>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", email: "", password: "", className: "", section: "", rollNo: "" });
                }}
                className="text-sm text-primary"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Student name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Roll No</label>
              <input
                name="rollNo"
                value={form.rollNo}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="BSCS-1800"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="student@school.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Temporary password"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Class</label>
              <input
                name="className"
                value={form.className}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="BSCS 8A"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Section</label>
              <input
                name="section"
                value={form.section}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="A"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </form>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Student Records</h3>
          <Table
            columns={columns}
            data={students}
            actions={(row) => (
              <div className="flex gap-2">
                <button
                  className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                  onClick={() => startEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white"
                  onClick={async () => {
                    try {
                      await deleteStudentApi(token, row._id);
                      loadStudents();
                    } catch (err) {
                      setError(err.message);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          />
          {loading ? <p className="text-sm text-slate-500">Loading students...</p> : null}
        </div>
      </div>
    </Layout>
  );
};

export default StudentsPage;
