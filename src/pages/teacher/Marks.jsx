import React, { useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const TeacherMarks = () => {
  const { user } = useAuth();
  const { teachers, classes, students, marks, addMark } = useData();
  const teacherProfile = teachers.find((t) => t.email === user.email) || teachers[0];
  const assignedClasses = classes.filter((c) => c.teacherId === teacherProfile?.id);
  const studentsInAssigned = students.filter((s) => assignedClasses.some((c) => c.id === s.classId));

  const [form, setForm] = useState({
    studentId: studentsInAssigned[0]?.id || "",
    course: "Course work",
    term: "Mid",
    score: "",
    total: "100"
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
    if (!form.studentId || !form.course || !form.score || !form.total) {
      setError("All fields are required.");
      return;
    }
    addMark({ ...form, score: Number(form.score), total: Number(form.total) });
    setMessage("Marks uploaded successfully.");
    setForm((prev) => ({ ...prev, score: "", course: prev.course }));
  };

  const myMarks = useMemo(
    () =>
      marks.filter((m) => {
        const student = students.find((s) => s.id === m.studentId);
        return assignedClasses.some((c) => c.id === student?.classId);
      }),
    [marks, students, assignedClasses]
  );

  const columns = [
    { key: "course", label: "Course" },
    { key: "term", label: "Term" },
    {
      key: "studentId",
      label: "Student",
      render: (value) => students.find((s) => s.id === value)?.name
    },
    { key: "score", label: "Score" },
    { key: "total", label: "Total" }
  ];

  return (
    <Layout>
      <PageHeader title="Upload Marks" description="Submit marks for students in your assigned classes." />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Marks Entry</h3>
          <div>
            <label className="text-sm font-medium text-slate-700">Student</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {studentsInAssigned.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Course / Activity</label>
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Web Engineering"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Term</label>
              <select
                name="term"
                value={form.term}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="Mid">Mid</option>
                <option value="Final">Final</option>
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
              </select>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Score</label>
              <input
                type="number"
                name="score"
                value={form.score}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Total</label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="100"
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

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Marks Submitted</h3>
          <Table columns={columns} data={myMarks} />
        </div>
      </div>
    </Layout>
  );
};

export default TeacherMarks;
