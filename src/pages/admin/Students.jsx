import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useData } from "../../context/DataContext";

const StudentsPage = () => {
  const { students, classes, addStudent, updateStudent, deleteStudent } = useData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    classId: "",
    guardian: "",
    contact: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!form.classId && classes.length) {
      setForm((prev) => ({ ...prev, classId: classes[0].id }));
    }
  }, [classes, form.classId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.rollNo || !form.classId) {
      setError("Name, email, roll no, and class are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    if (editingId) {
      updateStudent(editingId, form);
    } else {
      addStudent(form);
    }
    setForm({ name: "", email: "", rollNo: "", classId: classes[0]?.id || "", guardian: "", contact: "" });
    setEditingId(null);
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      classId: student.classId,
      guardian: student.guardian,
      contact: student.contact
    });
    setError("");
  };

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "rollNo", label: "Roll No" },
      { key: "email", label: "Email" },
      {
        key: "classId",
        label: "Class",
        render: (value) => classes.find((c) => c.id === value)?.name
      },
      { key: "guardian", label: "Guardian" },
      { key: "contact", label: "Contact" }
    ],
    [classes]
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
                  setForm({ name: "", email: "", rollNo: "", classId: classes[0]?.id || "", guardian: "", contact: "" });
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
              <label className="text-sm font-medium text-slate-700">Class / Section</label>
              <select
                name="classId"
                value={form.classId}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - {cls.section}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Guardian</label>
              <input
                name="guardian"
                value={form.guardian}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Parent name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Contact</label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="03xx-xxxxxxx"
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
                  onClick={() => deleteStudent(row.id)}
                >
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default StudentsPage;
