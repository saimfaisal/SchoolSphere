import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import BarChart from "../../components/common/BarChart";
import { useAuth } from "../../context/AuthContext";
import { fetchMyMarks } from "../../services/apiClient";

const StudentMarksPage = () => {
  const { token } = useAuth();
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const data = await fetchMyMarks(token);
        setMarks(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const chartData = useMemo(
    () =>
      marks.map((m) => ({
        label: m.subject,
        value: m.marks
      })),
    [marks]
  );

  const columns = [
    { key: "subject", label: "Subject" },
    { key: "marks", label: "Score" }
  ];

  return (
    <Layout>
      <PageHeader title="Marks" description="Check your marks and visualize performance quickly." />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-6 lg:grid-cols-2">
        <Table columns={columns} data={marks} />
        <BarChart data={chartData} title="Marks chart" />
      </div>
      {loading ? <p className="text-sm text-slate-500">Loading marks...</p> : null}
    </Layout>
  );
};

export default StudentMarksPage;
