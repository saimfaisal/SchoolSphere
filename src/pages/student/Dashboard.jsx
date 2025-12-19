import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
import ProgressBar from "../../components/common/ProgressBar";
import { useAuth } from "../../context/AuthContext";
import { fetchMyAttendance, fetchMyMarks, fetchMyProfile } from "../../services/apiClient";

const StudentDashboard = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const [p, att, mk] = await Promise.all([fetchMyProfile(token), fetchMyAttendance(token), fetchMyMarks(token)]);
        setProfile(p);
        setAttendance(att || []);
        setMarks(mk || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const attendancePercent = useMemo(() => {
    if (!attendance.length) return 0;
    const present = attendance.filter((a) => a.status === "Present").length;
    return Math.round((present / attendance.length) * 100);
  }, [attendance]);

  const averageMarks = useMemo(() => {
    if (!marks.length) return 0;
    return Math.round(marks.reduce((acc, m) => acc + m.marks, 0) / marks.length);
  }, [marks]);

  const attendanceColumns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" }
  ];

  const marksColumns = [
    { key: "subject", label: "Subject" },
    { key: "marks", label: "Score" }
  ];

  return (
    <Layout>
      <PageHeader title="Student Dashboard" description="Live snapshot of your attendance and marks from the backend." />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Attendance" value={`${attendancePercent}%`} helper="Recorded presence" />
        <StatCard title="Average Marks" value={averageMarks || "—"} helper="Across subjects" accent="bg-emerald-500" />
        <StatCard
          title="My Class"
          value={profile?.className || "-"}
          helper={profile?.section ? `Section ${profile.section}` : ""}
          accent="bg-accent"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Trend</h3>
          <ProgressBar label="Presence" value={attendancePercent} />
          <Table columns={attendanceColumns} data={attendance} />
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Name:</span> {profile?.user?.name || "—"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profile?.user?.email || "—"}
            </p>
            <p>
              <span className="font-semibold">Roll No:</span> {profile?.rollNo || "—"}
            </p>
            <p>
              <span className="font-semibold">Class:</span> {profile?.className || "—"} {profile?.section || ""}
            </p>
            <p className="text-xs text-slate-500">Ask your teacher for feedback if something looks off.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Marks Overview</h3>
          <span className="text-xs text-slate-500">Average: {averageMarks}</span>
        </div>
        <Table columns={marksColumns} data={marks} />
      </div>
      {loading ? <p className="text-sm text-slate-500">Loading your records...</p> : null}
    </Layout>
  );
};

export default StudentDashboard;
