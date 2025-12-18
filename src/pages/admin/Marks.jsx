import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import BarChart from "../../components/common/BarChart";
import { useData } from "../../context/DataContext";

const AdminMarks = () => {
  const { marks, students, classes } = useData();

  const columns = [
    { key: "course", label: "Course" },
    { key: "term", label: "Term" },
    {
      key: "studentId",
      label: "Student",
      render: (value) => students.find((s) => s.id === value)?.name
    },
    {
      key: "studentId",
      label: "Class",
      render: (value) => {
        const student = students.find((s) => s.id === value);
        return classes.find((c) => c.id === student?.classId)?.name || "-";
      }
    },
    { key: "score", label: "Score" },
    { key: "total", label: "Total" }
  ];

  const averages = useMemo(() => {
    const grouped = {};
    marks.forEach((m) => {
      const student = students.find((s) => s.id === m.studentId);
      const cls = student ? classes.find((c) => c.id === student.classId) : null;
      const key = cls?.name || "Unknown";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(m.score);
    });
    return Object.entries(grouped).map(([label, scores]) => ({
      label,
      value: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    }));
  }, [marks, students, classes]);

  return (
    <Layout>
      <PageHeader title="Marks Reports" description="Track marks uploaded by teachers across classes." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Table columns={columns} data={marks} />
        <BarChart data={averages} title="Average scores by class" />
      </div>
    </Layout>
  );
};

export default AdminMarks;
