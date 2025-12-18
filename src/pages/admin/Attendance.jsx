import React from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useData } from "../../context/DataContext";

const AdminAttendance = () => {
  const { attendance, classes } = useData();
  const columns = [
    { key: "date", label: "Date" },
    { key: "classId", label: "Class", render: (value) => classes.find((c) => c.id === value)?.name },
    { key: "present", label: "Present" },
    { key: "absent", label: "Absent" },
    { key: "remarks", label: "Remarks" }
  ];

  return (
    <Layout>
      <PageHeader title="Attendance Reports" description="Review attendance submitted by teachers." />
      <Table columns={columns} data={attendance} />
    </Layout>
  );
};

export default AdminAttendance;
