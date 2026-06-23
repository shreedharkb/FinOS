const fs = require('fs');

const file = 'd:/FinOS/Backend/actions/account.js';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('bulkDeleteTransactions')) {
  const code = `
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
          throw new Error(\`Invalid transaction amount: \${transaction.amount}\`);
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
`;
  // Append missing imports if any
  if (!content.includes('revalidatePath')) {
    content = content.replace('import { checkUser } from "@backend/security/checkUser";', 'import { checkUser } from "@backend/security/checkUser";\nimport { revalidatePath } from "next/cache";');
    content = content.replace('import { revalidatePath } from "next/cache";\n\nexport async function bulkDeleteTransactions', 'export async function bulkDeleteTransactions'); // because we already added it in the replace above
  }
  
  content += '\n' + code;
  fs.writeFileSync(file, content);
}

// Now fix imports in transaction-table.jsx
const tableFile = 'd:/FinOS/components/account/transaction-table.jsx';
let tableContent = fs.readFileSync(tableFile, 'utf8');

tableContent = tableContent.replace('import { BarLoader } from "react-spinners";', 'import { BarLoader } from "react-spinners";\nimport { bulkDeleteTransactions } from "@backend/actions/account";');

fs.writeFileSync(tableFile, tableContent);
console.log('Fixed backend account actions and imports');
