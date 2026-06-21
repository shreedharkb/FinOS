"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

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
