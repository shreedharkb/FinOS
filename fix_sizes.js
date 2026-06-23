const fs = require('fs');

const fileDash = 'd:/FinOS/components/dashboard/dashboard-client.jsx';
let contentDash = fs.readFileSync(fileDash, 'utf8');

// 1. Add Account button
contentDash = contentDash.replace(
  'h-9 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl gap-2',
  'h-12 px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-base rounded-2xl gap-2'
);
contentDash = contentDash.replace('<Plus className="h-4 w-4" />', '<Plus className="h-5 w-5" />');

// 2. Mini Stat Pills (Total Net Worth card)
contentDash = contentDash.replace(/px-4 py-2 rounded-xl/g, 'px-5 py-3 rounded-2xl');
contentDash = contentDash.replace(/h-4 w-4 text-emerald-400/g, 'h-6 w-6 text-emerald-400');
contentDash = contentDash.replace(/h-4 w-4 text-rose-400/g, 'h-6 w-6 text-rose-400');
contentDash = contentDash.replace(/h-4 w-4 text-cyan-400/g, 'h-6 w-6 text-cyan-400');

contentDash = contentDash.replace(/text-xs text-emerald-400\/70/g, 'text-sm font-semibold text-emerald-400/70');
contentDash = contentDash.replace(/text-xs text-rose-400\/70/g, 'text-sm font-semibold text-rose-400/70');
contentDash = contentDash.replace(/text-xs text-cyan-400\/70/g, 'text-sm font-semibold text-cyan-400/70');

contentDash = contentDash.replace(/<p className="text-base font-bold text-emerald-400">/g, '<p className="text-xl sm:text-2xl font-black text-emerald-400">');
contentDash = contentDash.replace(/<p className="text-base font-bold text-rose-400">/g, '<p className="text-xl sm:text-2xl font-black text-rose-400">');
contentDash = contentDash.replace(/<p className=\{cn\("text-base font-bold",/g, '<p className={cn("text-xl sm:text-2xl font-black",');


// 3. Accounts List
contentDash = contentDash.replace(/p-4 rounded-xl border/g, 'p-5 rounded-2xl border');
contentDash = contentDash.replace(/w-10 h-10 rounded-xl/g, 'w-12 h-12 rounded-xl text-lg');
contentDash = contentDash.replace(/<p className="text-base font-medium text-white group-hover:text-cyan-400 transition-colors">/g, '<p className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">');
contentDash = contentDash.replace(/<p className="text-base font-bold text-white">/g, '<p className="text-xl font-bold text-white">');
// Accounts header
contentDash = contentDash.replace('<CardTitle className="text-base font-semibold text-white flex items-center gap-2">', '<CardTitle className="text-xl font-bold text-white flex items-center gap-2">');

// 4. Recent Transactions
contentDash = contentDash.replace(/py-2.5 border-b/g, 'py-4 border-b');
contentDash = contentDash.replace(/w-7 h-7 rounded-lg/g, 'w-11 h-11 rounded-xl');
contentDash = contentDash.replace(/<ArrowUpRight className="h-3.5 w-3.5/g, '<ArrowUpRight className="h-5 w-5');
contentDash = contentDash.replace(/<ArrowDownRight className="h-3.5 w-3.5/g, '<ArrowDownRight className="h-5 w-5');
contentDash = contentDash.replace(/<p className="text-sm font-medium text-white truncate max-w-\[110px\]">/g, '<p className="text-base font-semibold text-white truncate max-w-[150px]">');
contentDash = contentDash.replace(/<p className="text-xs text-zinc-600">/g, '<p className="text-sm text-zinc-500">');
contentDash = contentDash.replace(/<p[\s]+className=\{cn\([\s]+"text-sm font-bold",/g, '<p\n                        className={cn(\n                          "text-lg font-bold",');
// Recent Activity header
contentDash = contentDash.replace('<CardTitle className="text-base font-semibold text-white flex items-center gap-2">\n                  Recent Activity', '<CardTitle className="text-xl font-bold text-white flex items-center gap-2">\n                  Recent Activity');


fs.writeFileSync(fileDash, contentDash);

console.log('Fixed sizes');
