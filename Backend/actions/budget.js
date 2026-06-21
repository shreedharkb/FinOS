"use server";

import { db } from "@backend/database/prisma";
import { checkUser } from "@backend/security/checkUser";

export async function getCurrentBudget(accountId) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount ? expenses._sum.amount.toNumber() : 0,
    };
  } catch (error) {
    console.error("Error getting budget:", error);
    throw new Error(error.message);
  }
}

export async function updateBudget(amount) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const budget = await db.budget.upsert({
      where: {
        userId: user.id, // Using the implicit relationship to find if a user has a budget
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    return { success: true, data: { ...budget, amount: budget.amount.toNumber() } };
  } catch (error) {
    console.error("Error updating budget:", error);
    throw new Error(error.message);
  }
}
