import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import ProgressBar from "../../components/common/ProgressBar";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const StudentAttendancePage = () => {
  const { user } = useAuth();
  const { students, studentAttendance } = useData();
  const profile = students.find((s) => s.email === user.email) || students[0];
  const records = studentAttendance[profile?.id] || [];

  const stats = useMemo(() => {
    const presentCount = records.filter((r) => r.status === "Present").length;
    const absentCount = records.filter((r) => r.status === "Absent").length;
    const percent = records.length ? Math.round((presentCount / records.length) * 100) : 0;
    return { present: presentCount, absent: absentCount, percent };
  }, [records]);

  const columns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" }
  ];

  return (
    <Layout>
      <PageHeader title="Attendance" description="Track your attendance percentage and daily presence." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Daily Log</h3>
          <Table columns={columns} data={records} />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Attendance Chart</h3>
          <ProgressBar label="Attendance" value={stats.percent} />
          <div className="flex gap-3 text-sm text-slate-600">
            <div className="flex-1 rounded-lg bg-slate-50 p-3">
              <p className="text-xs uppercase text-slate-500">Present</p>
              <p className="text-xl font-bold text-emerald-600">{stats.present}</p>
            </div>
            <div className="flex-1 rounded-lg bg-slate-50 p-3">
              <p className="text-xs uppercase text-slate-500">Absent</p>
              <p className="text-xl font-bold text-red-500">{stats.absent}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentAttendancePage;
