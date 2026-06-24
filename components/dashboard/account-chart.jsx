"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/50 bg-[#0D0B12] p-3 shadow-xl text-xs">
        <p className="font-semibold mb-1 text-muted-foreground">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">${Number(entry.value).toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AccountChart({ transactions }) {
  const chartData = useMemo(() => {
    const last30 = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date(),
    }).map((date) => ({
      date: startOfDay(date),
      label: format(date, "MMM d"),
      balance: 0,
    }));

    // Calculate net balance change per day
    const dailyChanges = {};
    transactions.forEach((t) => {
      const dayKey = format(startOfDay(new Date(t.date)), "yyyy-MM-dd");
      if (!dailyChanges[dayKey]) dailyChanges[dayKey] = 0;
      dailyChanges[dayKey] += t.type === "INCOME" ? t.amount : -t.amount;
    });

    // Cumulative balance from the starting balance + past 30 days
    let running = 0;
    return last30.map(({ label, date }) => {
      const key = format(date, "yyyy-MM-dd");
      running += dailyChanges[key] || 0;
      return { label, balance: running };
    });
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#22d3ee"
          strokeWidth={2}
          fill="url(#balanceGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#22d3ee", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
