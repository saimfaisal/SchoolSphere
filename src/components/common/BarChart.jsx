import React from "react";

const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <span className="text-xs text-slate-400">Scaled to {maxValue}</span>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {data.length === 0 ? <p className="text-sm text-slate-400">No data yet</p> : null}
      </div>
    </div>
  );
};

export default BarChart;
