import React from "react";
import { Link } from "react-router-dom";
import heroIllustration from "../assets/hero-illustration.svg";
import studentShot from "../assets/student.png";
import teacherShot from "../assets/teacher.png";
import adminShot from "../assets/admin.png";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const ctaHref = user ? `/${user.role}` : "/login";

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur border-b border-slate-100 text-slate-900 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">🎓</span>
            <div>
              <p className="text-lg font-bold">SchoolSphere</p>
              <p className="text-xs text-slate-500">Modern school management</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
            <Link to={ctaHref} className="rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/90">
              {user ? "Go to dashboard" : "Get started"}
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4 flex-1 text-slate-900">
             
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">SchoolSphere Management</h1>
              <p className="text-base text-slate-700 max-w-2xl">
                A minimal, role-based School Management System built with React, Context API, and Tailwind CSS. Explore Admin,
                Teacher, and Student experiences with protected routes.
              </p>
              <div className="flex gap-3">
                <Link
                  to={ctaHref}
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
                >
                  {user ? "Continue to dashboard" : "Login to explore"}
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/50 shadow-lg bg-white/70 backdrop-blur flex-1">
              <img src={heroIllustration} alt="SchoolSphere hero illustration" className="w-full" />
            </div>
          </div>
          <div className="space-y-8 rounded-2xl border border-white/50 bg-white/80 backdrop-blur p-6 md:p-8 shadow-lg text-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Our commitment to clarity</p>
                <h3 className="text-2xl font-bold">Why choose SchoolSphere?</h3>
              </div>
              <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                Explore dashboards
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-sm text-slate-700 md:flex-row md:gap-6">
              <div className="space-y-3 flex-1">
                <p>
                  <span className="font-semibold text-primary">Reliable Dashboards:</span> Role-based navigation and protected
                  routes keep Admin, Teacher, and Student views focused.
                </p>
                <p>
                  <span className="font-semibold text-primary">Consistent UI:</span> Clean cards, tables, and forms for a
                  test-friendly, minimal experience.
                </p>
              </div>
              <div className="space-y-3 flex-1">
                <p>
                  <span className="font-semibold text-primary">Fast Setup:</span> Context-driven auth and API calls for a
                  demo-ready flow.
                </p>
                <p>
                  <span className="font-semibold text-primary">Continuous Support:</span> Simple Tailwind styling and modular
                  components for quick tweaks.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="space-y-3 bg-white/80 rounded-2xl border border-white/50 p-6 shadow-lg backdrop-blur flex-1 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Student dashboard</p>
              <h3 className="text-2xl md:text-3xl font-bold">Attendance and marks at a glance</h3>
              <p className="text-sm text-slate-700">
                Mirrors the provided student screenshot: sidebar navigation, attendance/marks cards, presence progress, and class &
                teacher details in a clean, minimal layout.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold text-primary">Snapshot:</span> Attendance %, average marks, and class info up top.
                </li>
                <li>
                  <span className="font-semibold text-primary">Logs:</span> Daily attendance table plus marks overview beneath.
                </li>
              </ul>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
              >
                View student experience
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/50 shadow-xl bg-white/70 backdrop-blur flex justify-center items-center w-full h-auto md:w-[700px] md:h-[350px]">
              <img src={studentShot} alt="Student dashboard preview" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-white/50 shadow-xl bg-white/70 backdrop-blur flex justify-center items-center w-full h-auto md:w-[700px] md:h-[350px]">
              <img src={teacherShot} alt="Teacher dashboard preview" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-3 bg-white/80 rounded-2xl border border-white/50 p-6 shadow-lg backdrop-blur flex-1 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Teacher dashboard</p>
              <h3 className="text-2xl md:text-3xl font-bold">Classes, attendance, and marks uploads</h3>
              <p className="text-sm text-slate-700">
                Matches the teacher dashboard screenshot: sidebar navigation, quick stats for assigned classes/students, and a roster
                table filtered by the teacher profile.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold text-primary">Snapshot:</span> Assigned classes, student counts, and pending marks.
                </li>
                <li>
                  <span className="font-semibold text-primary">Rosters:</span> Class list with sections, rooms, and schedules.
                </li>
              </ul>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
              >
                View teacher experience
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="space-y-3 bg-white/80 rounded-2xl border border-white/50 p-6 shadow-lg backdrop-blur flex-1 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Admin dashboard</p>
              <h3 className="text-2xl md:text-3xl font-bold">Overview of students, teachers, and classes</h3>
              <p className="text-sm text-slate-700">
                Matches the admin dashboard screenshot: summary cards for counts, classes & sections table, top students, and
                attendance snapshot in a minimal layout.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold text-primary">Snapshot:</span> Total students, teachers, and classes at a glance.
                </li>
                <li>
                  <span className="font-semibold text-primary">Reports:</span> Classes/sections, top students, and attendance tables
                  below.
                </li>
              </ul>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
              >
                View admin experience
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/50 shadow-xl bg-white/70 backdrop-blur flex justify-center items-center w-full h-auto md:w-[700px] md:h-[350px]">
              <img src={adminShot} alt="Admin dashboard preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
