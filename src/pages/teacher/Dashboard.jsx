import React from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <PageHeader
        title="Teacher Dashboard"
        description="Use the forms on Attendance and Marks pages to submit data directly to the backend."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Logged in as" value={user?.name || "Teacher"} helper={user?.email} />
        <StatCard title="Attendance entries" value="—" helper="Add via Mark Attendance" accent="bg-emerald-500" />
        <StatCard title="Marks uploaded" value="—" helper="Add via Upload Marks" accent="bg-accent" />
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">How to use</h3>
        <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
          <li>Copy the student ID from the Admin &gt; Students page.</li>
          <li>Open Mark Attendance or Upload Marks and submit records with date/subject.</li>
          <li>Admins and students will see the data reflected in their dashboards.</li>
        </ol>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
