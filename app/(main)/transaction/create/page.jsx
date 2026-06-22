import { getUserAccounts } from "@backend/actions/dashboard";
import { TransactionForm } from "@frontend/components/transactions/TransactionForm";

export default async function TransactionCreatePage() {
  const accounts = await getUserAccounts();

  // If no accounts, users should be redirected or shown a prompt, 
  // but for now we'll let the form handle it or they can create one from dashboard.
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text tracking-tight mb-2">
          New Transaction
        </h1>
        <p className="text-muted-foreground">
          Log an expense or income, or use FinOS AI to scan a receipt.
        </p>
      </div>

      <TransactionForm accounts={accounts} />
    </div>
  );
}
