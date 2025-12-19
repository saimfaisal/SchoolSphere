import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_50%)]" />
      </div>

      <div className="relative z-10 lg:flex">
        <Sidebar />
        <div className="flex-1 lg:pl-0">
          <Navbar />
          <main className="m-4 rounded-2xl bg-white p-4 md:p-6 shadow-lg backdrop-blur space-y-6 border border-slate-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
