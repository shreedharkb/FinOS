import { getDashboardData } from "@backend/actions/account";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/components/ui/table";
import { Card } from "@frontend/components/ui/card";
import { Badge } from "@frontend/components/ui/badge";
import { Input } from "@frontend/components/ui/input";

export default async function TransactionsPage() {
  const transactions = await getDashboardData(); // Fetches all user transactions

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text tracking-tight mb-2">
            All Transactions
          </h1>
          <p className="text-muted-foreground">
            A comprehensive view of your entire financial history.
          </p>
        </div>
      </div>

      <Card className="glass border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search transactions (Feature coming soon...)" 
              className="pl-9 glass border-white/10 w-full"
              disabled
            />
          </div>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
            {transactions?.length || 0} Total Records
          </Badge>
        </div>

        {(!transactions || transactions.length === 0) ? (
          <div className="p-12 text-center text-muted-foreground">
            No transactions found across any accounts.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/[0.02] border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account ID</TableHead>
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
                          <span className="text-[10px] text-violet-500 uppercase tracking-wider mt-1 font-semibold">
                            {t.recurringInterval} RECURRING
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white/5 border-white/10 font-normal text-muted-foreground">
                        {t.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">
                       {/* Ideally we'd fetch the account name here, but we'll show the ID snippet for now */}
                       {t.accountId.substring(0,8)}...
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
  );
}
