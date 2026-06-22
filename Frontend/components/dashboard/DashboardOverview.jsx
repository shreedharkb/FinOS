"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AccountCard } from "./AccountCard";
import { CreateAccountDrawer } from "./CreateAccountDrawer";
import { Card, CardContent } from "@frontend/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";

const COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#64748b"];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for current month
  const currentMonthExpenses = transactions.filter((t) => {
    const tDate = new Date(t.date);
    const now = new Date();
    return (
      t.type === "EXPENSE" &&
      tDate.getMonth() === now.getMonth() &&
      tDate.getFullYear() === now.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
    const category = t.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += t.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Account Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Your Accounts</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}

          <CreateAccountDrawer>
            <Card className="glass border-white/10 hover:bg-white/5 cursor-pointer transition-colors shadow-none border-dashed flex flex-col items-center justify-center min-h-[160px]">
              <CardContent className="flex flex-col items-center justify-center pt-6 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-cyan-500/10 transition-colors">
                  <Plus className="h-5 w-5 group-hover:text-cyan-500" />
                </div>
                <p className="font-medium text-sm">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass border-white/5 bg-white/[0.02]">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Monthly Expenses Breakdown</h3>
            {pieChartData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-xl bg-white/5">
                No expenses this month
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="rgba(255,255,255,0.1)"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "rgba(10, 10, 10, 0.8)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Transactions Preview */}
        <Card className="glass border-white/5 bg-white/[0.02]">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  No recent transactions found
                </p>
              ) : (
                transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Untitled"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(transaction.date), "PP")} • {transaction.category}
                      </p>
                    </div>
                    <div
                      className={`text-sm font-bold font-mono ${
                        transaction.type === "EXPENSE"
                          ? "text-rose-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
