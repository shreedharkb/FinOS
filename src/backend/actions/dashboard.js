"use server";

import { db } from "@backend/database/prisma";
import { checkUser } from "@backend/security/checkUser";
import { revalidatePath } from "next/cache";

export async function createAccount(data) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    // Create an initial transaction for the starting balance
    const initialTransaction = await db.transaction.create({
      data: {
        type: "INCOME",
        amount: balanceFloat,
        description: "Initial Balance",
        date: new Date(),
        category: "Other Income",
        accountId: account.id,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: { ...account, initialTransaction } };
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error(error.message || "Failed to create account");
  }
}

export async function getUserAccounts() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    return accounts;
  } catch (error) {
    console.error("Error getting accounts:", error);
    throw new Error(error.message);
  }
}

export async function updateDefaultAccount(accountId) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: account };
  } catch (error) {
    console.error("Error updating default account:", error);
    throw new Error(error.message);
  }
}
