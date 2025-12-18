import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useData } from "../../context/DataContext";

const TeachersPage = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialization: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }

    if (editingId) {
      updateTeacher(editingId, form);
    } else {
      addTeacher(form);
    }
    setForm({ name: "", email: "", phone: "", specialization: "" });
    setEditingId(null);
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({ name: row.name, email: row.email, phone: row.phone, specialization: row.specialization });
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "specialization", label: "Specialization" }
  ];

  return (
    <Layout>
      <PageHeader title="Manage Teachers" description="Onboard or update teacher records." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Teacher" : "Add Teacher"}</h3>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", email: "", phone: "", specialization: "" });
                }}
                className="text-sm text-primary"
              >
                Cancel
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
                placeholder="Teacher name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="teacher@school.com"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="03xx-xxxxxxx"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Specialization</label>
              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Data Science"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>
        </form>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Teacher Directory</h3>
          <Table
            columns={columns}
            data={teachers}
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
                  onClick={() => deleteTeacher(row.id)}
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

export default TeachersPage;
