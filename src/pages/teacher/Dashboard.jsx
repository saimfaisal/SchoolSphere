import React, { useMemo } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { teachers, classes, students, marks } = useData();

  const teacherProfile = teachers.find((t) => t.email === user.email) || teachers[0];
  const assignedClasses = classes.filter((c) => c.teacherId === teacherProfile?.id);
  const studentsInAssigned = students.filter((st) => assignedClasses.some((c) => c.id === st.classId));

  const pendingEvaluations = useMemo(() => {
    const assignedStudentIds = studentsInAssigned.map((s) => s.id);
    return assignedStudentIds.filter((id) => !marks.some((m) => m.studentId === id)).length;
  }, [studentsInAssigned, marks]);

  const classColumns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    { key: "room", label: "Room" },
    { key: "schedule", label: "Schedule" }
  ];

  return (
    <Layout>
      <PageHeader
        title="Teacher Dashboard"
        description="Quick snapshot of your assigned classes, students, and grading progress."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Assigned Classes" value={assignedClasses.length} helper="Active" />
        <StatCard title="Students" value={studentsInAssigned.length} helper="Across classes" accent="bg-emerald-500" />
        <StatCard title="Pending Marks" value={pendingEvaluations} helper="Need grading" accent="bg-accent" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">My Classes</h3>
          <span className="text-xs text-slate-500">Auto filtered by your profile</span>
        </div>
        <Table columns={classColumns} data={assignedClasses} />
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
