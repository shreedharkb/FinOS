const fs = require('fs');

// 1. Fix create-transaction-dialog.jsx
const fileTx = 'd:/FinOS/components/dashboard/create-transaction-dialog.jsx';
let contentTx = fs.readFileSync(fileTx, 'utf8');

// Inputs: Amount, Description, Date
contentTx = contentTx.replace(
  'className="pl-7 bg-white/[0.04]',
  'className="pl-7 h-14 text-lg bg-white/[0.04]'
);
contentTx = contentTx.replace(
  'className="bg-white/[0.04]',
  'className="h-14 px-4 text-lg bg-white/[0.04]'
);
contentTx = contentTx.replace(
  'className="bg-white/[0.04]',
  'className="h-14 px-4 text-lg bg-white/[0.04]'
);

// Expense/Income buttons
contentTx = contentTx.replace(/text-base font-medium/g, 'text-lg font-bold');

// Add Transaction button
contentTx = contentTx.replace(
  'className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl',
  'className="w-full h-16 text-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl'
);
fs.writeFileSync(fileTx, contentTx);

// 2. Fix budget-widget.jsx
const fileBudget = 'd:/FinOS/components/dashboard/budget-widget.jsx';
let contentBudget = fs.readFileSync(fileBudget, 'utf8');

contentBudget = contentBudget.replace(
  'text-base font-semibold text-white',
  'text-xl font-bold text-white'
);

contentBudget = contentBudget.replace(
  '<p className="text-sm text-zinc-500">No budget set</p>',
  '<p className="text-base font-medium text-zinc-400 mt-2">No budget set</p>'
);

contentBudget = contentBudget.replace(
  'className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 h-7 px-3"',
  'className="mt-4 text-base font-bold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 h-11 px-6 rounded-xl"'
);

// Budget input
contentBudget = contentBudget.replace(
  'className="pl-7 h-9 bg-white/[0.04]',
  'className="pl-8 h-12 bg-white/[0.04]'
);

// Budget amount
contentBudget = contentBudget.replace(
  '<p className="text-2xl font-bold text-white">{fmt(currentExpenses)}</p>',
  '<p className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>{fmt(currentExpenses)}</p>'
);

fs.writeFileSync(fileBudget, contentBudget);

// 3. Fix dashboard-client.jsx (Account names font)
const fileDash = 'd:/FinOS/components/dashboard/dashboard-client.jsx';
let contentDash = fs.readFileSync(fileDash, 'utf8');

// Apply font heading to account names
contentDash = contentDash.replace(
  '<p className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">',
  '<p className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>'
);
contentDash = contentDash.replace(
  '<p className="text-xl font-bold text-white">',
  '<p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>'
);

// Also apply to View all button
contentDash = contentDash.replace(
  'className="text-sm text-zinc-500 hover:text-cyan-400 h-7 px-2 rounded-lg"',
  'className="text-sm font-semibold bg-white/[0.03] text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 h-9 px-4 rounded-xl border border-white/[0.05]"'
);

fs.writeFileSync(fileDash, contentDash);

console.log('Fixed dialogs and fonts');
