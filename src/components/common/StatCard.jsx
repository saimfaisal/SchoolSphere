import React from "react";

const StatCard = ({ title, value, helper, accent = "bg-primary" }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <span className={`rounded-full ${accent} px-3 py-1 text-xs font-semibold text-white`}>{helper}</span>
      </div>
    </div>
  );
};

export default StatCard;
