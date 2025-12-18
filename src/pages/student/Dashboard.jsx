import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import ProgressBar from "../../components/common/ProgressBar";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { students, classes, marks, studentAttendance, getTeacherById, getClassById } = useData();
  const profile = students.find((s) => s.email === user.email) || students[0];
  const classInfo = getClassById(profile?.classId);
  const teacher = classInfo ? getTeacherById(classInfo.teacherId) : null;

  const attendanceEntries = studentAttendance[profile?.id] || [];
  const attendancePercent = useMemo(() => {
    if (!attendanceEntries.length) return 0;
    const present = attendanceEntries.filter((a) => a.status === "Present").length;
    return Math.round((present / attendanceEntries.length) * 100);
  }, [attendanceEntries]);

  const myMarks = marks.filter((m) => m.studentId === profile?.id);
  const averageMarks = useMemo(() => {
    if (!myMarks.length) return 0;
    return Math.round(myMarks.reduce((acc, m) => acc + m.score, 0) / myMarks.length);
  }, [myMarks]);

  const attendanceColumns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" }
  ];

  const marksColumns = [
    { key: "course", label: "Course" },
    { key: "term", label: "Term" },
    { key: "score", label: "Score" },
    { key: "total", label: "Total" }
  ];

  return (
    <Layout>
      <PageHeader title="Student Dashboard" description="Personalized snapshot of your performance and attendance." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Attendance" value={`${attendancePercent}%`} helper="This month" />
        <StatCard title="Average Marks" value={averageMarks} helper="Across courses" accent="bg-emerald-500" />
        <StatCard title="My Class" value={classInfo?.name || "-"} helper={classInfo?.section || ""} accent="bg-accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Trend</h3>
          <ProgressBar label="Presence" value={attendancePercent} />
          <Table columns={attendanceColumns} data={attendanceEntries} />
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Class & Teacher Info</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Class:</span> {classInfo?.name} ({classInfo?.section})
            </p>
            <p>
              <span className="font-semibold">Room:</span> {classInfo?.room}
            </p>
            <p>
              <span className="font-semibold">Schedule:</span> {classInfo?.schedule}
            </p>
            <p>
              <span className="font-semibold">Teacher:</span> {teacher?.name} ({teacher?.specialization})
            </p>
            <p className="text-xs text-slate-500">Reach out via email for coursework help.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Marks Overview</h3>
          <span className="text-xs text-slate-500">Average: {averageMarks}</span>
        </div>
        <Table columns={marksColumns} data={myMarks} />
      </div>
    </Layout>
  );
};

export default StudentDashboard;
