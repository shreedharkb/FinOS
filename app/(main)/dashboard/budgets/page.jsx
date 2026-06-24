import { Suspense } from "react";
import { getUserAccounts } from "@backend/actions/dashboard";
import { getCurrentBudget } from "@backend/actions/budget";
import { BarLoader } from "react-spinners";
import { BudgetProgress } from "@/app/(main)/dashboard/_components/budget-progress";

export default async function BudgetsPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts.find((a) => a.isDefault);

  let budgetData = { budget: null, currentExpenses: 0 };
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8 px-5 container mx-auto max-w-7xl">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title">
            Budgets
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Manage your monthly spending budget
          </p>
        </div>
      </div>

      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#22d3ee" />}>
        <BudgetProgress
          initialBudget={budgetData.budget}
          currentExpenses={budgetData.currentExpenses}
        />
      </Suspense>

      {/* Account Summary */}
      {accounts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Accounts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <a
                key={account.id}
                href={`/account/${account.id}`}
                className="block rounded-xl border bg-card text-card-foreground shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg capitalize">{account.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {account.type.toLowerCase()} account
                    </p>
                  </div>
                  {account.isDefault && (
                    <span className="text-xs bg-cyan-500/15 text-cyan-400 px-2 py-1 rounded-full font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold mt-4">
                  ₹{account.balance.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {account._count.transactions} transactions
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
