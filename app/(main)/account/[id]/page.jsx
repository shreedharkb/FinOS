import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";

import { getAccountWithTransactions } from "@backend/actions/account";
import { getCurrentBudget } from "@backend/actions/budget";
import { BudgetProgress } from "@frontend/components/dashboard/BudgetProgress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/components/ui/table";
import { Card, CardContent } from "@frontend/components/ui/card";
import { Badge } from "@frontend/components/ui/badge";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);
  
  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
  const { budget, currentExpenses } = await getCurrentBudget(account.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
        <div>
          <h1 className="text-4xl font-bold gradient-text tracking-tight mb-2 capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            {account.type.toLowerCase()} Account
            {account.isDefault && (
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-500 bg-cyan-500/10">
                Default
              </Badge>
            )}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
          <p className="text-5xl font-bold font-mono tracking-tighter">
            ${parseFloat(account.balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Budget Column */}
        <div className="md:col-span-1 space-y-6">
          <BudgetProgress 
            initialBudget={budget} 
            currentExpenses={currentExpenses} 
          />
          
          <Card className="glass border-white/5 bg-white/[0.02]">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <div className="md:col-span-2">
          <Card className="glass border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-bold">Transaction History</h2>
            </div>
            
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No transactions found for this account.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.02] border-b border-white/5">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-medium text-muted-foreground whitespace-nowrap">
                          {format(new Date(t.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{t.description || "Untitled"}</span>
                            {t.isRecurring && (
                              <span className="text-[10px] text-cyan-500 uppercase tracking-wider mt-1">
                                {t.recurringInterval} RECURRING
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white/5 border-white/10 font-normal">
                            {t.category}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-bold font-mono ${
                          t.type === "EXPENSE" ? "text-rose-500" : "text-emerald-500"
                        }`}>
                          <div className="flex items-center justify-end gap-1">
                            {t.type === "EXPENSE" ? (
                              <ArrowDownRight className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                            ${parseFloat(t.amount).toFixed(2)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
