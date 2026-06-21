import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

export async function seedTransactions() {
  try {
    // Generate 90 days of transactions
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Income (Salary every 30 days)
      if (i % 30 === 0) {
        transactions.push({
          type: "INCOME",
          amount: 5000,
          description: "Salary",
          date,
          category: "Salary",
          isRecurring: true,
          recurringInterval: "MONTHLY",
        });
        totalBalance += 5000;
      }

      // Random daily expenses (Groceries, Dining, etc.)
      if (Math.random() > 0.5) {
        const amount = Math.floor(Math.random() * 50) + 10;
        transactions.push({
          type: "EXPENSE",
          amount,
          description: "Daily Expense",
          date,
          category: "Dining Out",
          isRecurring: false,
        });
        totalBalance -= amount;
      }
    }

    return { success: true, transactions, totalBalance };
  } catch (error) {
    console.error("Error generating seed data:", error);
    return { success: false, error: error.message };
  }
}
