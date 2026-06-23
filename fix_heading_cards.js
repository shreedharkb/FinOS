const fs = require('fs');

const fileDash = 'd:/FinOS/components/dashboard/dashboard-client.jsx';
let contentDash = fs.readFileSync(fileDash, 'utf8');

// Use Outfit font for main headings
contentDash = contentDash.replace(
  'className="text-6xl sm:text-7xl font-bold tracking-tight text-white mt-1"',
  'className="text-6xl sm:text-7xl font-bold tracking-tight text-white mt-1" style={{ fontFamily: "var(--font-heading)" }}'
);
contentDash = contentDash.replace(
  'className="text-4xl sm:text-5xl font-black tracking-tight text-white"',
  'className="text-5xl sm:text-6xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-heading)" }}'
);

// Stat cards map replacement
contentDash = contentDash.replace(
  /<CardContent className="p-5">/g,
  '<CardContent className="p-8">'
);

contentDash = contentDash.replace(
  /<p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">/g,
  '<p className="text-base text-zinc-400 font-bold uppercase tracking-wider mb-3">'
);

contentDash = contentDash.replace(
  /<p className="text-2xl font-bold text-white">\{stat\.value\}<\/p>/g,
  '<p className="text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>'
);

contentDash = contentDash.replace(
  /<div className=\{cn\("p-2\.5 rounded-xl border", stat\.bg, stat\.border\)\}>/g,
  '<div className={cn("p-4 rounded-2xl border", stat.bg, stat.border)}>'
);

contentDash = contentDash.replace(
  /<stat\.icon className=\{cn\("h-4 w-4", stat\.color\)\} \/>/g,
  '<stat.icon className={cn("h-8 w-8", stat.color)} />'
);

// Make the layout slightly taller to accommodate the bigger cards
// Actually the grid is fine, but let's make sure the icon is h-8 w-8

fs.writeFileSync(fileDash, contentDash);
console.log('Fixed heading and cards');
