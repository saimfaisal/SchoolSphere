import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const TeacherClasses = () => {
  const { user } = useAuth();
  const { teachers, classes, getStudentsByClass } = useData();
  const teacherProfile = teachers.find((t) => t.email === user.email) || teachers[0];
  const assignedClasses = classes.filter((c) => c.teacherId === teacherProfile?.id);
  const [selectedClassId, setSelectedClassId] = useState(assignedClasses[0]?.id || "");

  const students = selectedClassId ? getStudentsByClass(selectedClassId) : [];
  const classColumns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    { key: "room", label: "Room" },
    { key: "schedule", label: "Schedule" }
  ];

  const studentColumns = [
    { key: "name", label: "Student" },
    { key: "rollNo", label: "Roll No" },
    { key: "email", label: "Email" }
  ];

  return (
    <Layout>
      <PageHeader title="My Classes" description="View assigned classes and their enrolled students." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Assigned Classes</h3>
          <Table columns={classColumns} data={assignedClasses} />
        </div>

        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Students in Class</p>
              <p className="text-xs text-slate-500">Select a class to load the roster.</p>
            </div>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {assignedClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
          </div>
          <Table columns={studentColumns} data={students} />
        </div>
      </div>
    </Layout>
  );
};

export default TeacherClasses;
