const fs = require('fs');

const fileDash = 'd:/FinOS/components/dashboard/dashboard-client.jsx';
let contentDash = fs.readFileSync(fileDash, 'utf8');

// Remove refresh button
contentDash = contentDash.replace(/<Button[\s\S]*?RefreshCcw[\s\S]*?<\/Button>/, '');

// Make Financial Overview Title larger
contentDash = contentDash.replace('text-2xl sm:text-3xl', 'text-4xl sm:text-5xl');

// Make Total Net Worth larger
contentDash = contentDash.replace('text-4xl sm:text-5xl', 'text-6xl sm:text-7xl');

fs.writeFileSync(fileDash, contentDash);

const fileBudgets = 'd:/FinOS/components/dashboard/budgets-client.jsx';
let contentBudgets = fs.readFileSync(fileBudgets, 'utf8');

// Remove static budget insights card
const startInsights = contentBudgets.indexOf('<Card className="bg-[#0a0a10]/80 border-white/[0.06] rounded-2xl">');
const endInsights = contentBudgets.indexOf('</Card>', startInsights) + 7;
if (startInsights !== -1) {
  contentBudgets = contentBudgets.slice(0, startInsights) + contentBudgets.slice(endInsights);
}

fs.writeFileSync(fileBudgets, contentBudgets);
