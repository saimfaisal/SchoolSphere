import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useData } from "../../context/DataContext";

const ClassesPage = () => {
  const { classes, teachers, addClassroom, updateClassroom, deleteClassroom, getTeacherById } = useData();
  const [form, setForm] = useState({
    name: "",
    section: "",
    teacherId: "",
    room: "",
    schedule: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!form.teacherId && teachers.length) {
      setForm((prev) => ({ ...prev, teacherId: teachers[0].id }));
    }
  }, [teachers, form.teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.section || !form.teacherId) {
      setError("Name, section, and teacher are required.");
      return;
    }

    if (editingId) {
      updateClassroom(editingId, form);
    } else {
      addClassroom(form);
    }
    setForm({ name: "", section: "", teacherId: teachers[0]?.id || "", room: "", schedule: "" });
    setEditingId(null);
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({ name: row.name, section: row.section, teacherId: row.teacherId, room: row.room, schedule: row.schedule });
  };

  const columns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    {
      key: "teacherId",
      label: "Teacher",
      render: (value) => getTeacherById(value)?.name || "Unassigned"
    },
    { key: "room", label: "Room" },
    { key: "schedule", label: "Schedule" }
  ];

  return (
    <Layout>
      <PageHeader title="Manage Classes / Sections" description="Assign teachers and timetables to each class." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Class" : "Add Class"}</h3>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", section: "", teacherId: teachers[0]?.id || "", room: "", schedule: "" });
                }}
                className="text-sm text-primary"
              >
                Cancel
              </button>
            ) : null}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Class Name</label>
              <input
                name="name"
                value={form.name}
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
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Teacher</label>
              <select
                name="teacherId"
                value={form.teacherId}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Room</label>
              <input
                name="room"
                value={form.room}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Lab 3"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Schedule</label>
            <input
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="Mon/Wed 9-11"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            {editingId ? "Update Class" : "Add Class"}
          </button>
        </form>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Classes</h3>
          <Table
            columns={columns}
            data={classes}
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
                  onClick={() => deleteClassroom(row.id)}
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

export default ClassesPage;
