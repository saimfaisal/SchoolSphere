import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { fetchStudents } from "../../services/apiClient";

const ClassesPage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const data = await fetchStudents(token);
        setStudents(data || []);
      } catch (err) {
        setError(err.message);
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
      if (!map.has(key)) map.set(key, { id: key, className: st.className, section: st.section, total: 0 });
      map.get(key).total += 1;
    });
    return Array.from(map.values());
  }, [students]);

  const columns = [
    { key: "className", label: "Class" },
    { key: "section", label: "Section" },
    { key: "total", label: "Students" }
  ];

  return (
    <Layout>
      <PageHeader
        title="Classes & Sections"
        description="Classes are derived from live student records. Update a student's class/section on the Students page."
      />
      <div className="space-y-4">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Table columns={columns} data={classGroups} />
        {loading ? <p className="text-sm text-slate-500">Loading classes...</p> : null}
        <p className="text-xs text-slate-500">
          Tip: add students with the correct class and section to grow this table—no dummy data required.
        </p>
      </div>
    </Layout>
  );
};

export default ClassesPage;
