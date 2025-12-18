import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
import { useData } from "../../context/DataContext";

const AdminDashboard = () => {
  const { metrics, classes, teachers, attendance, students, marks, getTeacherById } = useData();

  const topStudents = useMemo(() => {
    const grouped = students.map((st) => {
      const stMarks = marks.filter((m) => m.studentId === st.id);
      const avg = stMarks.reduce((acc, m) => acc + m.score, 0) / (stMarks.length || 1);
      return { ...st, average: Math.round(avg) };
    });
    return grouped.sort((a, b) => b.average - a.average).slice(0, 5);
  }, [students, marks]);

  const classTableColumns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    {
      key: "teacherId",
      label: "Teacher",
      render: (value) => getTeacherById(value)?.name || "TBD"
    },
    { key: "schedule", label: "Schedule" }
  ];

  const attendanceColumns = [
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

  const topColumns = [
    { key: "name", label: "Student" },
    { key: "rollNo", label: "Roll No" },
    { key: "average", label: "Average" }
  ];

  return (
    <Layout>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of students, teachers, classes, attendance, and performance."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Students" value={metrics.totalStudents} helper="+4 this semester" />
        <StatCard title="Total Teachers" value={metrics.totalTeachers} helper="Active" accent="bg-emerald-500" />
        <StatCard title="Classes / Sections" value={metrics.totalClasses} helper="Running" accent="bg-accent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Classes & Sections</h3>
            <span className="text-xs text-slate-500">Live schedule</span>
          </div>
          <Table columns={classTableColumns} data={classes} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Top Students</h3>
            <span className="text-xs text-slate-500">Based on averages</span>
          </div>
          <Table columns={topColumns} data={topStudents} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Snapshot</h3>
          <span className="text-xs text-slate-500">Recent entries</span>
        </div>
        <Table columns={attendanceColumns} data={attendance} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
