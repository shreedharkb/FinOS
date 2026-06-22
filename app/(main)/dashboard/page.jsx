import { getUserAccounts } from "@backend/actions/dashboard";
import { getDashboardData } from "@backend/actions/account";
import { DashboardOverview } from "@frontend/components/dashboard/DashboardOverview";
import { CreateAccountDrawer } from "@frontend/components/dashboard/CreateAccountDrawer";
import { Card, CardContent } from "@frontend/components/ui/card";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text tracking-tight mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your financial operating system.
          </p>
        </div>
      </div>

      {accounts.length === 0 ? (
        <CreateAccountDrawer>
          <Card className="glass border-white/10 hover:bg-white/5 cursor-pointer transition-colors shadow-none border-dashed flex flex-col items-center justify-center min-h-[300px] animate-fade-in mt-8">
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-cyan-500/10 transition-colors">
                <Plus className="h-8 w-8 text-cyan-500" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">No accounts found</h2>
              <p>Create your first account to start tracking your finances, analyzing expenses, and generating AI insights.</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      ) : (
        <Suspense fallback={<div>Loading overview...</div>}>
          <DashboardOverview
            accounts={accounts}
            transactions={transactions || []}
          />
        </Suspense>
      )}
    </div>
  );
}
