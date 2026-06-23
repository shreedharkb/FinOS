const fs = require('fs');
const path = require('path');

const srcComponentsDir = 'd:/FinOS_temp_reference/app/(main)/account/_components';
const destComponentsDir = 'd:/FinOS/components/account';

if (!fs.existsSync(destComponentsDir)) {
  fs.mkdirSync(destComponentsDir, { recursive: true });
}

function copyAndStyle(filename) {
  let content = fs.readFileSync(path.join(srcComponentsDir, filename), 'utf8');
  
  // Theme replacements
  content = content.replace(/import \{.*\} from "@\/actions\/.*";/g, ''); // Fix actions later manually if needed
  content = content.replace(/Card className=".*"/g, 'Card className="bg-[#0a0a10]/80 border-white/[0.06] rounded-2xl hover:border-cyan-500/20 transition-all"');
  content = content.replace(/Card className=\{cn\(/g, 'Card className={cn("bg-[#0a0a10]/80 border-white/[0.06] rounded-2xl hover:border-cyan-500/20 transition-all", ');
  content = content.replace(/CardTitle className=".*"/g, 'CardTitle className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}');
  content = content.replace(/text-muted-foreground/g, 'text-zinc-400');
  
  fs.writeFileSync(path.join(destComponentsDir, filename), content);
}

copyAndStyle('transaction-table.jsx');
copyAndStyle('account-chart.jsx');

// Port account page
const destPageDir = 'd:/FinOS/app/account/[id]';
if (!fs.existsSync(destPageDir)) {
  fs.mkdirSync(destPageDir, { recursive: true });
}

const srcPage = 'd:/FinOS_temp_reference/app/(main)/account/[id]/page.jsx';
let pageContent = fs.readFileSync(srcPage, 'utf8');
pageContent = pageContent.replace(/@\/actions\/account/g, '@backend/actions/account');
pageContent = pageContent.replace(/\.\.\/_components\/transaction-table/g, '@/components/account/transaction-table');
pageContent = pageContent.replace(/\.\.\/_components\/account-chart/g, '@/components/account/account-chart');

// Apply some FinOS typography to the page
pageContent = pageContent.replace(/text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize/g, 'text-5xl sm:text-6xl font-black tracking-tight text-white capitalize" style={{ fontFamily: "var(--font-heading)" }}');

fs.writeFileSync(path.join(destPageDir, 'page.jsx'), pageContent);

console.log('Ported account components and page');
