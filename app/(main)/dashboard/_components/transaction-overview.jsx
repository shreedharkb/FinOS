"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];



export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({ name: category, value: amount })
  );

  // Fallback 1: show all-time expense breakdown
  const allExpensesByCategory = accountTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += transaction.amount;
      return acc;
    }, {});

  const allTimePieData = Object.entries(allExpensesByCategory).map(
    ([category, amount]) => ({ name: category, value: amount })
  );

  // Fallback 2: show ALL transactions by category
  const allTxByCategory = accountTransactions.reduce((acc, transaction) => {
    const key = `${transaction.category} (${transaction.type === "INCOME" ? "Income" : "Expense"})`;
    if (!acc[key]) acc[key] = 0;
    acc[key] += transaction.amount;
    return acc;
  }, {});

  const allTxPieData = Object.entries(allTxByCategory).map(
    ([category, amount]) => ({ name: category, value: amount })
  );

  // Pick the best available data source
  let chartData, chartLabel;
  if (pieChartData.length > 0) {
    chartData = pieChartData;
    chartLabel = "Monthly Expense Breakdown";
  } else if (allTimePieData.length > 0) {
    chartData = allTimePieData;
    chartLabel = "All-Time Expense Breakdown";
  } else if (allTxPieData.length > 0) {
    chartData = allTxPieData;
    chartLabel = "Transaction Breakdown";
  } else {
    chartData = [];
    chartLabel = "Transaction Breakdown";
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {/* Recent Transactions Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[180px] h-10 text-base">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-base">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-1"
                >
                  <div className="space-y-1">
                    <p className="text-base font-medium leading-none">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-base font-semibold",
                      transaction.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? (
                      <ArrowDownRight className="mr-1 h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="mr-1 h-5 w-5" />
                    )}
                    ₹{transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {chartLabel}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          {chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground gap-2">
              <p className="text-lg">No expense transactions yet</p>
              <p className="text-base">Add an expense to see your breakdown</p>
            </div>
          ) : (
            /* overflow-visible lets recharts labels render outside the box */
            <div style={{ height: 450, overflow: "visible" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 30, right: 100, bottom: 30, left: 100 }}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `₹${Number(value).toFixed(2)}`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "15px",
                      padding: "10px 14px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: "15px",
                      paddingTop: "16px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
