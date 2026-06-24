"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const CATEGORY_COLORS = {
  "Housing": "#6366f1",
  "Transportation": "#f59e0b",
  "Groceries": "#22c55e",
  "Dining Out": "#f97316",
  "Utilities": "#3b82f6",
  "Entertainment": "#a855f7",
  "Shopping": "#ec4899",
  "Healthcare": "#14b8a6",
  "Education": "#8b5cf6",
  "Personal Care": "#fb7185",
  "Travel": "#0ea5e9",
  "Insurance": "#64748b",
  "Other Income": "#22d3ee",
  "Other Expense": "#94a3b8",
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/50 bg-[#0D0B12] p-3 shadow-xl text-xs">
        <p className="font-semibold mb-2 text-muted-foreground">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: entry.fill || entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-bold">${Number(entry.value).toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = useMemo(() => {
    if (!selectedAccountId) return transactions;
    return transactions.filter((t) => t.accountId === selectedAccountId);
  }, [transactions, selectedAccountId]);

  // Last 30 days chart data
  const chartData = useMemo(() => {
    const last30 = Array.from({ length: 30 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 29 - i));
      return { date, label: format(date, "MMM d"), income: 0, expense: 0 };
    });

    accountTransactions.forEach((t) => {
      const tDate = startOfDay(new Date(t.date));
      const entry = last30.find(
        (d) => d.date.getTime() === tDate.getTime()
      );
      if (entry) {
        if (t.type === "INCOME") entry.income += t.amount;
        else entry.expense += t.amount;
      }
    });

    return last30.map(({ label, income, expense }) => ({ label, income, expense }));
  }, [accountTransactions]);

  const recentTransactions = useMemo(
    () => [...accountTransactions].slice(0, 5),
    [accountTransactions]
  );

  return (
    <div className="space-y-6">
      {/* Account filter tabs */}
      {accounts.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccountId(acc.id)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                selectedAccountId === acc.id
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {acc.name}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      <Card className="border border-border/40 bg-[#0D0B12]/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Income vs Expenses — Last 30 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                formatter={(value) => <span style={{ color: "#9ca3af" }}>{value}</span>}
              />
              <Bar dataKey="income" fill="#22d3ee" radius={[3, 3, 0, 0]} maxBarSize={20} />
              <Bar dataKey="expense" fill="#f43f5e" radius={[3, 3, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border border-border/40 bg-[#0D0B12]/80">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            Recent Transactions
          </CardTitle>
          <Link
            href="/dashboard/transactions"
            className="text-xs text-cyan-400 hover:underline underline-offset-2 transition-colors"
          >
            View all →
          </Link>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No transactions yet. Add your first one!
            </p>
          ) : (
            <div className="space-y-1">
              {recentTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        t.type === "INCOME"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-rose-500/15 text-rose-400"
                      }`}
                    >
                      {t.type === "INCOME" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{t.description}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {format(new Date(t.date), "MMM d, yyyy")} · {t.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {t.type === "INCOME" ? "+" : "-"}$
                    {t.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
