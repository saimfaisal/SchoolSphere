import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { fetchAttendanceReport } from "../../services/apiClient";

const AdminAttendance = () => {
  const { token } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const data = await fetchAttendanceReport(token);
        setRecords(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const columns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "student", label: "Student", render: (_v, row) => row.student?.user?.name || "N/A" },
    { key: "studentEmail", label: "Email", render: (_v, row) => row.student?.user?.email || "—" }
  ];

  return (
    <Layout>
      <PageHeader title="Attendance Reports" description="Review attendance submitted by teachers (live from MongoDB)." />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Table columns={columns} data={records} />
      {loading ? <p className="text-sm text-slate-500">Loading attendance...</p> : null}
    </Layout>
  );
};

export default AdminAttendance;
