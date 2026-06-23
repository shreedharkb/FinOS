"use server";

import { db } from "@backend/database/prisma";
import { checkUser } from "@backend/security/checkUser";
import { revalidatePath } from "next/cache";

export async function getAccountWithTransactions(accountId) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const account = await db.account.findUnique({
      where: { id: accountId, userId: user.id },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) return null;

    return {
      ...account,
      balance: account.balance.toNumber(),
      transactions: account.transactions.map((t) => ({
        ...t,
        amount: t.amount.toNumber(),
      })),
    };
  } catch (error) {
    console.error("Error getting account:", error);
    throw new Error(error.message);
  }
}

export async function getDashboardData() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    return transactions.map((t) => ({
      ...t,
      amount: t.amount.toNumber(),
    }));
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    throw new Error(error.message);
  }
}


import { revalidatePath } from "next/cache";

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
      throw new Error("No transactions selected for deletion");
    }

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    if (transactions.length === 0) {
      throw new Error("No valid transactions found for deletion");
    }

    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const amount = Number(transaction.amount);

      if (isNaN(amount)) {
        throw new Error(`Invalid transaction amount: ${transaction.amount}`);
      }

      const change = transaction.type === "EXPENSE" ? amount : -amount;
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      for (const [accountId, balanceChange] of Object.entries(accountBalanceChanges)) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    console.error("Bulk Delete Error:", error.message);
    return { success: false, error: error.message };
  }
}
