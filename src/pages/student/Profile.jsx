import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { fetchMyProfile } from "../../services/apiClient";

const StudentProfile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const data = await fetchMyProfile(token);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [token]);

  return (
    <Layout>
      <PageHeader title="My Profile" description="Review your student information. Ask admin to update if needed." />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              value={profile?.user?.name || ""}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Roll No</label>
            <input
              value={profile?.rollNo || ""}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              value={profile?.user?.email || ""}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Class</label>
            <input
              value={`${profile?.className || "-"} ${profile?.section || ""}`}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Notes</label>
          <textarea
            readOnly
            value="Profile is synced from backend. Ask admin to edit via Manage Students."
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
