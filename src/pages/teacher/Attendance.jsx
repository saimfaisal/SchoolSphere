import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const TeacherAttendance = () => {
  const { user } = useAuth();
  const { teachers, classes, attendance, recordAttendance } = useData();
  const teacherProfile = teachers.find((t) => t.email === user.email) || teachers[0];
  const assignedClasses = classes.filter((c) => c.teacherId === teacherProfile?.id);
  const [form, setForm] = useState({
    classId: assignedClasses[0]?.id || "",
    date: new Date().toISOString().slice(0, 10),
    present: "",
    absent: "",
    remarks: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.classId || !form.date || form.present === "" || form.absent === "") {
      setError("Class, date, present, and absent fields are required.");
      return;
    }
    recordAttendance({
      classId: form.classId,
      date: form.date,
      present: Number(form.present),
      absent: Number(form.absent),
      remarks: form.remarks || "Submitted by teacher"
    });
    setMessage("Attendance saved for the selected date.");
    setForm((prev) => ({ ...prev, present: "", absent: "", remarks: "" }));
  };

  const columns = [
    { key: "date", label: "Date" },
    {
      key: "classId",
      label: "Class",
      render: (value) => classes.find((c) => c.id === value)?.name
    },
    { key: "present", label: "Present" },
    { key: "absent", label: "Absent" },
    { key: "remarks", label: "Remarks" }
  ];

  const myAttendance = attendance.filter((a) => assignedClasses.some((c) => c.id === a.classId));

  return (
    <Layout>
      <PageHeader title="Mark Attendance" description="Submit attendance for your assigned classes." />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Form</h3>
          <div>
            <label className="text-sm font-medium text-slate-700">Class</label>
            <select
              name="classId"
              value={form.classId}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {assignedClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
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
            <div>
              <label className="text-sm font-medium text-slate-700">Present</label>
              <input
                type="number"
                name="present"
                value={form.present}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Absent</label>
              <input
                type="number"
                name="absent"
                value={form.absent}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Remarks</label>
              <input
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Lecture summary or notes"
              />
            </div>
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

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Recent Attendance</h3>
          <Table columns={columns} data={myAttendance} />
        </div>
      </div>
    </Layout>
  );
};

export default TeacherAttendance;
