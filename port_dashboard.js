const fs = require('fs');
const path = require('path');

const srcDir = 'd:/FinOS_temp_reference/app/(main)/dashboard/_components';
const destDir = 'd:/FinOS/components/dashboard';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function copyAndStyle(filename) {
  let content = fs.readFileSync(path.join(srcDir, filename), 'utf8');
  
  // Basic FinOS theme replacements
  content = content.replace(/import \{.*\} from "@\/actions\/.*";/g, ''); // We will handle actions in the parent page or manually
  content = content.replace(/Card className=".*"/g, 'Card className="bg-[#0a0a10]/80 border-white/[0.06] rounded-2xl hover:border-cyan-500/20 transition-all"');
  content = content.replace(/Card className=\{cn\(/g, 'Card className={cn("bg-[#0a0a10]/80 border-white/[0.06] rounded-2xl hover:border-cyan-500/20 transition-all", ');
  content = content.replace(/CardTitle className="text-base font-normal"/g, 'CardTitle className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}');
  content = content.replace(/CardTitle className="text-sm font-medium capitalize"/g, 'CardTitle className="text-2xl font-bold text-white capitalize" style={{ fontFamily: "var(--font-heading)" }}');
  content = content.replace(/text-muted-foreground/g, 'text-zinc-400');
  
  fs.writeFileSync(path.join(destDir, filename), content);
}

copyAndStyle('account-card.jsx');
copyAndStyle('transaction-overview.jsx');
copyAndStyle('budget-progress.jsx');

// Now page.jsx
const srcPage = 'd:/FinOS_temp_reference/app/(main)/dashboard/page.jsx';
let pageContent = fs.readFileSync(srcPage, 'utf8');
pageContent = pageContent.replace(/@\/actions\/dashboard/g, '@backend/actions/dashboard');
pageContent = pageContent.replace(/@\/actions\/budget/g, '@backend/actions/budget');
pageContent = pageContent.replace(/@\/components\/create-account-drawer/g, '@/components/dashboard/create-account-dialog');
pageContent = pageContent.replace(/CreateAccountDrawer/g, 'CreateAccountDialog');

fs.writeFileSync('d:/FinOS/app/dashboard/page.jsx', pageContent);

console.log('Ported dashboard components and page');
