"use server";

import { db } from "@backend/database/prisma";
import { checkUser } from "@backend/security/checkUser";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@backend/security/arcjet";
import { request } from "@arcjet/next";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function createTransaction(data) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    // Rate Limiting check
    const req = await request();
    const decision = await aj.protect(req, {
      userId: user.id,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const reset = decision.reason.resetTime;
        throw new Error(
          `Rate limit exceeded. Please try again after ${reset?.toLocaleTimeString()}`
        );
      }
      throw new Error("Request blocked");
    }

    const account = await db.account.findUnique({
      where: { id: data.accountId, userId: user.id },
    });

    if (!account) throw new Error("Account not found");

    const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
    const newBalance = account.balance.toNumber() + balanceChange;

    const transaction = await db.$transaction(async (tx) => {
      const newTx = await tx.transaction.create({
        data: {
          ...data,
          userId: user.id,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTx;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return {
      success: true,
      data: {
        ...transaction,
        amount: transaction.amount.toNumber(),
      },
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error(error.message || "Failed to create transaction");
  }
}

export async function scanReceipt(file) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - amount: The total amount (number only)
      - date: The date of the transaction (YYYY-MM-DD)
      - description: A brief description of the vendor or items
      - category: The most appropriate category from this list: [Housing, Transportation, Groceries, Dining Out, Utilities, Entertainment, Shopping, Healthcare, Education, Personal Care, Travel, Insurance, Gifts & Donations, Bills & Fees, Other Expense]

      Respond ONLY with the JSON object, no markdown formatting or other text.
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      },
      prompt,
    ]);

    const responseText = result.response.text();
    const cleanText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(cleanText);

    return parsedData;
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw new Error("Failed to scan receipt");
  }
}

// Helper to calculate the next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);
  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  return date;
}
