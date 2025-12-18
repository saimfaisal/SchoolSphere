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
    <header className="flex items-center justify-between border-b border-white/10 bg-slate-900/70 px-6 py-3 shadow-lg backdrop-blur text-white">
      <div>
        <h1 className="text-lg font-semibold">Welcome back, {user?.name || "Guest"}</h1>
        <p className="text-sm text-white/70">Role: {user?.role}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-white/90">{user?.email}</span>
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
