import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { fetchAttendanceReport, fetchMarksReport, fetchStudents, fetchTeachersAdmin } from "../../services/apiClient";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [stRes, tRes, attRes, markRes] = await Promise.all([
          fetchStudents(token).catch(() => []),
          fetchTeachersAdmin(token).catch(() => []),
          fetchAttendanceReport(token).catch(() => []),
          fetchMarksReport(token).catch(() => [])
        ]);
        setStudents(stRes || []);
        setTeachers(tRes || []);
        setAttendance(attRes || []);
        setMarks(markRes || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const classGroups = useMemo(() => {
    const map = new Map();
    students.forEach((st) => {
      const key = `${st.className}-${st.section}`;
      if (!map.has(key)) map.set(key, { id: key, name: st.className, section: st.section, count: 0 });
      map.get(key).count += 1;
    });
    return Array.from(map.values());
  }, [students]);

  const topStudents = useMemo(() => {
    if (!marks.length) return [];
    const totals = {};
    marks.forEach((m) => {
      const sid = m.student?._id || m.student;
      if (!totals[sid]) totals[sid] = { scores: [], student: m.student };
      totals[sid].scores.push(m.marks);
    });
    return Object.values(totals)
      .map((entry) => {
        const avg = Math.round(entry.scores.reduce((a, b) => a + b, 0) / entry.scores.length);
        const student = entry.student;
        return { id: student?._id || student, name: student?.user?.name || "Unknown", average: avg, rollNo: student?.rollNo };
      })
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);
  }, [marks]);

  const attendanceColumns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "student", label: "Student", render: (_v, row) => row.student?.user?.name || "N/A" }
  ];

  const classTableColumns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    { key: "count", label: "Students" }
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
        description="Overview of students, teachers, classes, attendance, and performance pulled from your live backend."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Students" value={students.length} helper="From database" />
        <StatCard title="Total Teachers" value={teachers.length} helper="Registered via admin" accent="bg-emerald-500" />
        <StatCard title="Classes / Sections" value={classGroups.length} helper="Derived from students" accent="bg-accent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Classes & Sections</h3>
            <span className="text-xs text-slate-500">Auto-computed</span>
          </div>
          <Table columns={classTableColumns} data={classGroups} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Top Students</h3>
            <span className="text-xs text-slate-500">Based on marks records</span>
          </div>
          <Table columns={topColumns} data={topStudents} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Snapshot</h3>
          <span className="text-xs text-slate-500">Latest submissions</span>
        </div>
        <Table columns={attendanceColumns} data={attendance} />
      </div>
      {loading ? <p className="text-sm text-slate-500">Loading fresh data...</p> : null}
    </Layout>
  );
};

export default AdminDashboard;
