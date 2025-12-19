import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import BarChart from "../../components/common/BarChart";
import { useAuth } from "../../context/AuthContext";
import { fetchMarksReport, fetchStudents } from "../../services/apiClient";

const AdminMarks = () => {
  const { token } = useAuth();
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const [marksRes, studentsRes] = await Promise.all([fetchMarksReport(token), fetchStudents(token)]);
        setMarks(marksRes || []);
        setStudents(studentsRes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const columns = [
    { key: "subject", label: "Subject" },
    { key: "marks", label: "Marks" },
    { key: "student", label: "Student", render: (_v, row) => row.student?.user?.name || "Unknown" },
    { key: "email", label: "Email", render: (_v, row) => row.student?.user?.email || "—" }
  ];

  const averages = useMemo(() => {
    if (!marks.length) return [];
    const grouped = {};
    marks.forEach((m) => {
      const student = m.student;
      const key = `${student?.className || "Class"}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(m.marks);
    });
    return Object.entries(grouped).map(([label, values]) => ({
      label,
      value: Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    }));
  }, [marks]);

  return (
    <Layout>
      <PageHeader title="Marks Reports" description="Track marks uploaded by teachers across classes." />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-6 lg:grid-cols-2">
        <Table columns={columns} data={marks} />
        <BarChart data={averages} title="Average scores by class" />
      </div>
      {loading ? <p className="text-sm text-slate-500">Loading marks...</p> : null}
    </Layout>
  );
};

export default AdminMarks;
