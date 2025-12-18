import React from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const StudentProfile = () => {
  const { user } = useAuth();
  const { students, classes, getTeacherById, getClassById } = useData();
  const profile = students.find((s) => s.email === user.email) || students[0];
  const classInfo = getClassById(profile?.classId);
  const teacher = classInfo ? getTeacherById(classInfo.teacherId) : null;

  return (
    <Layout>
      <PageHeader title="My Profile" description="Review your student information. Ask admin to update if needed." />
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input value={profile?.name || ""} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Roll No</label>
            <input value={profile?.rollNo || ""} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input value={profile?.email || ""} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Contact</label>
            <input value={profile?.contact || "Not provided"} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Guardian</label>
            <input value={profile?.guardian || ""} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Class</label>
            <input
              value={`${classInfo?.name || "-"} (${classInfo?.section || ""})`}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Room</label>
            <input value={classInfo?.room || ""} readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Teacher</label>
            <input
              value={teacher ? `${teacher.name} (${teacher.specialization})` : ""}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
