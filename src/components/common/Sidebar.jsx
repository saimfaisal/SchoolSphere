import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navConfig = {
  admin: [
    { label: "Dashboard", to: "/admin" },
    { label: "Manage Students", to: "/admin/students" },
    { label: "Manage Teachers", to: "/admin/teachers" },
    { label: "Classes & Sections", to: "/admin/classes" },
    { label: "Attendance Reports", to: "/admin/attendance" },
    { label: "Marks Reports", to: "/admin/marks" }
  ],
  teacher: [
    { label: "Dashboard", to: "/teacher" },
    { label: "My Classes", to: "/teacher/classes" },
    { label: "Mark Attendance", to: "/teacher/attendance" },
    { label: "Upload Marks", to: "/teacher/marks" }
  ],
  student: [
    { label: "Dashboard", to: "/student" },
    { label: "My Profile", to: "/student/profile" },
    { label: "Attendance", to: "/student/attendance" },
    { label: "Marks", to: "/student/marks" }
  ]
};

const Sidebar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const items = user ? navConfig[user.role] : [];

  return (
    <>
      <button
        className="m-3 rounded-md bg-primary px-3 py-2 text-white shadow lg:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <aside
        className={`bg-white shadow-lg lg:shadow-none lg:border-r border-slate-100 lg:static fixed top-0 left-0 h-full z-30 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-64`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <p className="text-lg font-bold text-primary">SchoolSphere</p>
            <p className="text-xs text-slate-500">Unified campus control</p>
          </div>
          <button className="lg:hidden text-slate-500" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {items?.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 text-sm font-medium ${
                  isActive ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
