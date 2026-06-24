import { Suspense } from "react";
import { getUserAccounts } from "@backend/actions/dashboard";
import { getUserTransactions } from "@backend/actions/transaction";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "@/app/(main)/account/_components/transaction-table";

export default async function TransactionsPage() {
  const [accounts, transactionsRes] = await Promise.all([
    getUserAccounts(),
    getUserTransactions(),
  ]);

  const transactions = transactionsRes?.data || [];

  // Attach account name to each transaction for display
  const transactionsWithAccount = transactions.map((t) => ({
    ...t,
    account: accounts.find((a) => a.id === t.accountId),
  }));

  return (
    <div className="space-y-8 px-5 container mx-auto max-w-7xl">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title">
            Transactions
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            All transactions across your accounts
          </p>
        </div>
        <div className="text-right pb-2">
          <p className="text-2xl font-bold">{transactions.length}</p>
          <p className="text-base text-muted-foreground">Total Transactions</p>
        </div>
      </div>

      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#22d3ee" />}>
        <TransactionTable transactions={transactionsWithAccount} />
      </Suspense>
    </div>
  );
}
