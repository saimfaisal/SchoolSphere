import React from "react";
import Layout from "../../components/common/Layout";
import PageHeader from "../../components/common/PageHeader";

const TeacherClasses = () => {
  return (
    <Layout>
      <PageHeader
        title="My Classes"
        description="Class rosters are managed by Admin. Use the Students page to copy IDs when recording attendance or marks."
      />

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Heads up</h3>
        <p className="text-sm text-slate-700">
          The current backend stores students with their className and section. Admins can add or update students to
          reflect real rosters. Teachers can then reference student IDs while posting attendance or marks.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
          <li>Ask the admin to enroll students with the correct class/section.</li>
          <li>Open Admin &gt; Students to copy the student ID you need.</li>
          <li>Submit attendance/marks with that ID from the teacher pages.</li>
        </ul>
      </div>
    </Layout>
  );
};

export default TeacherClasses;
