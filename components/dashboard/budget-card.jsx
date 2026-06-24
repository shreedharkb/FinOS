"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#22d3ee", "#6366f1", "#f59e0b", "#22c55e", "#f97316",
  "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#8b5cf6",
  "#fb7185", "#0ea5e9", "#64748b", "#94a3b8",
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/50 bg-[#0D0B12] p-3 shadow-xl text-xs">
        <p className="font-semibold text-foreground">{payload[0].name}</p>
        <p className="text-muted-foreground mt-1">
          ${Number(payload[0].value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="ml-1 text-cyan-400">({payload[0].payload.percent}%)</span>
        </p>
      </div>
    );
  }
  return null;
}

export function BudgetCard({ category, spent, budget, color, index }) {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const isOverBudget = budget > 0 && spent > budget;

  return (
    <div className="rounded-xl border border-border/40 bg-[#0D0B12]/80 p-4 space-y-3 hover:border-border/60 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-sm font-medium">{category}</span>
        </div>
        {isOverBudget && (
          <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
            Over budget
          </span>
        )}
      </div>

      <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            background: isOverBudget ? "#f43f5e" : color,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Spent:{" "}
          <span className={isOverBudget ? "text-rose-400 font-medium" : "text-foreground font-medium"}>
            ${spent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </span>
        <span>{percentage.toFixed(0)}% used</span>
      </div>
    </div>
  );
}

export function BudgetPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ color: "#9ca3af", fontSize: "11px" }}>{value}</span>}
          iconSize={8}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
