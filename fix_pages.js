const fs = require('fs');

// 1. dashboard-client.jsx
const fileDash = 'd:/FinOS/components/dashboard/dashboard-client.jsx';
let contentDash = fs.readFileSync(fileDash, 'utf8');

// Good evening text & icon
contentDash = contentDash.replace(
  '<p className="text-base font-medium text-zinc-500 flex items-center gap-2">',
  '<p className="text-xl sm:text-2xl font-bold text-zinc-400 flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>'
);
contentDash = contentDash.replace(
  '<Sparkles className="h-3.5 w-3.5 text-cyan-400" />',
  '<Sparkles className="h-6 w-6 text-cyan-400" />'
);

// Total Net Worth text & icon
contentDash = contentDash.replace(
  '<CircleDollarSign className="h-4 w-4 text-cyan-400" />',
  '<CircleDollarSign className="h-6 w-6 text-cyan-400" />'
);
contentDash = contentDash.replace(
  '<p className="text-base font-medium text-zinc-400 tracking-wide uppercase">',
  '<p className="text-lg font-bold text-zinc-400 tracking-wider uppercase" style={{ fontFamily: "var(--font-heading)" }}>'
);
fs.writeFileSync(fileDash, contentDash);

// 2. transactions-client.jsx
const fileTx = 'd:/FinOS/components/dashboard/transactions-client.jsx';
let contentTx = fs.readFileSync(fileTx, 'utf8');

contentTx = contentTx.replace(
  '<h1 className="text-2xl font-bold text-white">Transactions</h1>',
  '<h1 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>Transactions</h1>'
);
contentTx = contentTx.replace(
  '<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />',
  '<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />'
);
contentTx = contentTx.replace(
  'className="pl-9 bg-white/[0.04] border-white/[0.1] text-white focus-visible:border-cyan-500/50 rounded-xl"',
  'className="pl-12 h-14 text-lg bg-white/[0.04] border-white/[0.1] text-white focus-visible:border-cyan-500/50 rounded-xl"'
);
contentTx = contentTx.replace(
  /"h-9 px-4 rounded-xl text-sm font-medium transition-colors"/g,
  '"h-12 px-6 rounded-xl text-base font-bold transition-colors"'
);
contentTx = contentTx.replace(
  /"w-10 h-10 rounded-xl flex items-center/g,
  '"w-12 h-12 rounded-xl flex items-center'
);
contentTx = contentTx.replace(
  /<ArrowUpRight className="h-5 w-5" \/>/g,
  '<ArrowUpRight className="h-6 w-6" />'
);
contentTx = contentTx.replace(
  /<ArrowDownRight className="h-5 w-5" \/>/g,
  '<ArrowDownRight className="h-6 w-6" />'
);
contentTx = contentTx.replace(
  /<p className="font-medium text-white">\{txn.description\}<\/p>/g,
  '<p className="text-lg font-bold text-white">{txn.description}</p>'
);
contentTx = contentTx.replace(
  /className=\{cn\(\n                      "font-bold",\n                      txn.type === "INCOME" \? "text-emerald-400" : "text-rose-400"\n                    \)\}/g,
  'className={cn("text-xl font-black", txn.type === "INCOME" ? "text-emerald-400" : "text-rose-400")}'
);
contentTx = contentTx.replace(
  '<Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]">',
  '<Button className="h-12 px-6 text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]">'
);
contentTx = contentTx.replace(
  '<Plus className="h-4 w-4" /> Add Transaction',
  '<Plus className="h-5 w-5" /> Add Transaction'
);
fs.writeFileSync(fileTx, contentTx);

// 3. budgets-client.jsx
const fileBud = 'd:/FinOS/components/dashboard/budgets-client.jsx';
let contentBud = fs.readFileSync(fileBud, 'utf8');

contentBud = contentBud.replace(
  '<h1 className="text-2xl font-bold text-white">Budgets</h1>',
  '<h1 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>Budgets</h1>'
);
contentBud = contentBud.replace(
  '<CardHeader className="px-6 py-5 border-b border-white/[0.04]">',
  '<CardHeader className="px-8 py-6 border-b border-white/[0.04]">'
);
contentBud = contentBud.replace(
  '<CardTitle className="text-base font-semibold text-white flex items-center gap-2">',
  '<CardTitle className="text-xl font-bold text-white flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>'
);
contentBud = contentBud.replace(
  '<TrendingDown className="h-4 w-4 text-cyan-400" />',
  '<TrendingDown className="h-6 w-6 text-cyan-400" />'
);
contentBud = contentBud.replace(
  '<CardContent className="p-6">',
  '<CardContent className="p-8">'
);
contentBud = contentBud.replace(
  '<PiggyBank className="h-10 w-10 text-zinc-600 mx-auto mb-3" />',
  '<PiggyBank className="h-16 w-16 text-zinc-600 mx-auto mb-4" />'
);
fs.writeFileSync(fileBud, contentBud);

console.log('Fixed additional pages');
