import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import BarChart from "../../components/common/BarChart";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const StudentMarksPage = () => {
  const { user } = useAuth();
  const { students, marks } = useData();
  const profile = students.find((s) => s.email === user.email) || students[0];
  const myMarks = marks.filter((m) => m.studentId === profile?.id);

  const chartData = useMemo(
    () =>
      myMarks.map((m) => ({
        label: `${m.course} (${m.term})`,
        value: m.score
      })),
    [myMarks]
  );

  const columns = [
    { key: "course", label: "Course" },
    { key: "term", label: "Term" },
    { key: "score", label: "Score" },
    { key: "total", label: "Total" }
  ];

  return (
    <Layout>
      <PageHeader title="Marks" description="Check your marks and visualize performance quickly." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Table columns={columns} data={myMarks} />
        <BarChart data={chartData} title="Marks chart" />
      </div>
    </Layout>
  );
};

export default StudentMarksPage;
