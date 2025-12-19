import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { deleteTeacherApi, fetchTeachersAdmin, registerUser } from "../../services/apiClient";

const TeachersPage = () => {
  const { token } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" }
    ],
    []
  );

  const loadTeachers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchTeachersAdmin(token);
      setTeachers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }
    try {
      await registerUser(token, { ...form, role: "teacher" });
      setForm({ name: "", email: "", password: "" });
      loadTeachers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <PageHeader title="Manage Teachers" description="Register teachers against the live backend." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Add Teacher</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Teacher name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="teacher@school.com"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Temporary password"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            Add Teacher
          </button>
        </form>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Teacher Directory</h3>
            {loading ? <span className="text-xs text-slate-500">Loading…</span> : null}
          </div>
          <Table
            columns={columns}
            data={teachers}
            actions={(row) => (
              <div className="flex gap-2">
                <button
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white"
                  onClick={async () => {
                    try {
                      await deleteTeacherApi(token, row._id);
                      loadTeachers();
                    } catch (err) {
                      setError(err.message);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TeachersPage;
