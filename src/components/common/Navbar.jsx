import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-3 shadow-sm backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Welcome back, {user?.name || "Guest"}</h1>
        <p className="text-sm text-slate-500">Role: {user?.role}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200">
          {user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
