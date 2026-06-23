const fs = require('fs');
const path = require('path');

// --- 1. Fix backend actions ---
const backendFile = 'd:/FinOS/Backend/actions/transaction.js';
let backendContent = fs.readFileSync(backendFile, 'utf8');

if (!backendContent.includes('export async function getTransaction')) {
  const additionalActions = `

export async function getTransaction(id) {
  const user = await checkUser();
  if (!user) throw new Error("Unauthorized");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) throw new Error("Transaction not found");

  return { ...transaction, amount: transaction.amount.toNumber() };
}

export async function updateTransaction(id, data) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -originalTransaction.amount.toNumber()
        : originalTransaction.amount.toNumber();

    const newBalanceChange =
      data.type === "EXPENSE" ? -data.amount : data.amount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;

    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          ...data,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: {
          balance: {
            increment: netBalanceChange,
          },
        },
      });

      return updated;
    });

    revalidatePath("/dashboard");
    revalidatePath(\`/account/\${data.accountId}\`);

    return { success: true, data: { ...transaction, amount: transaction.amount.toNumber() } };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserTransactions(query = {}) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        ...query,
      },
      include: {
        account: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return { success: true, data: transactions.map(t => ({ ...t, amount: t.amount.toNumber() })) };
  } catch (error) {
    throw new Error(error.message);
  }
}
`;
  backendContent += additionalActions;
  fs.writeFileSync(backendFile, backendContent);
}

// --- 2. Port Components ---
const srcCompDir = 'd:/FinOS_temp_reference/app/(main)/transaction/_components';
const destCompDir = 'd:/FinOS/components/transaction';

if (!fs.existsSync(destCompDir)) {
  fs.mkdirSync(destCompDir, { recursive: true });
}

function copyAndStyle(filename) {
  if (!fs.existsSync(path.join(srcCompDir, filename))) return;
  let content = fs.readFileSync(path.join(srcCompDir, filename), 'utf8');
  
  // Theme replacements
  content = content.replace(/@\/actions\/transaction/g, '@backend/actions/transaction');
  
  // Input replacements
  content = content.replace(/<Input type="number" /g, '<Input type="number" className="h-14 text-lg bg-white/[0.04]" ');
  content = content.replace(/<Input placeholder=".*" /g, (match) => match + 'className="h-14 text-lg bg-white/[0.04]" ');
  content = content.replace(/SelectTrigger/g, 'SelectTrigger className="h-14 text-lg bg-white/[0.04]"');
  content = content.replace(/<Button type="button" variant="outline"/g, '<Button type="button" variant="outline" className="h-14 text-lg font-bold"');
  
  // Submit button
  content = content.replace(/<Button type="submit"/g, '<Button type="submit" className="w-full h-16 text-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl"');
  
  // Typography
  content = content.replace(/text-muted-foreground/g, 'text-zinc-400');
  
  // Fix imports
  content = content.replace(/@\/components\/ui\/.*"/g, (m) => m); // UI imports are standard
  content = content.replace(/from ".\/recipt-scanner"/g, 'from "@/components/transaction/recipt-scanner"');
  
  fs.writeFileSync(path.join(destCompDir, filename), content);
}

copyAndStyle('transaction-form.jsx');
copyAndStyle('recipt-scanner.jsx');

// --- 3. Port Page ---
const destPageDir = 'd:/FinOS/app/transaction/create';
if (!fs.existsSync(destPageDir)) {
  fs.mkdirSync(destPageDir, { recursive: true });
}

const srcPage = 'd:/FinOS_temp_reference/app/(main)/transaction/create/page.jsx';
let pageContent = fs.readFileSync(srcPage, 'utf8');
pageContent = pageContent.replace(/@\/actions\/dashboard/g, '@backend/actions/dashboard');
pageContent = pageContent.replace(/@\/actions\/transaction/g, '@backend/actions/transaction');
pageContent = pageContent.replace(/\.\.\/_components\/transaction-form/g, '@/components/transaction/transaction-form');

pageContent = pageContent.replace(/text-5xl gradient-title/g, 'text-5xl sm:text-6xl font-black tracking-tight text-white capitalize" style={{ fontFamily: "var(--font-heading)" }}');

fs.writeFileSync(path.join(destPageDir, 'page.jsx'), pageContent);

console.log('Ported transaction page and components');
