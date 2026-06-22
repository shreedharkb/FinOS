import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-cyan-500" />,
    title: "Advanced Analytics",
    description:
      "Get deep insights into your spending patterns with our AI-powered analytical dashboards.",
  },
  {
    icon: <Receipt className="h-8 w-8 text-violet-500" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data instantly from your receipts using cutting-edge computer vision technology.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-cyan-500" />,
    title: "Dynamic Budgeting",
    description:
      "Create budgets that automatically adjust based on your historical spending habits.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-violet-500" />,
    title: "Multi-Account Sync",
    description:
      "Manage all your bank accounts and credit cards seamlessly from one unified dashboard.",
  },
  {
    icon: <Globe className="h-8 w-8 text-cyan-500" />,
    title: "Multi-Currency Support",
    description:
      "Travel globally without losing track. Automatic real-time currency conversions.",
  },
  {
    icon: <Zap className="h-8 w-8 text-violet-500" />,
    title: "Automated Insights",
    description:
      "Receive automated monthly reports and actionable financial advice right in your inbox.",
  },
];

export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-cyan-500" />,
    title: "1. Connect Accounts",
    description:
      "Securely link your bank accounts and credit cards. We use bank-level encryption to keep your data safe.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-violet-500" />,
    title: "2. Track Spending",
    description:
      "Watch as your transactions are automatically categorized and visualized in real-time.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-cyan-500" />,
    title: "3. Gain Insights",
    description:
      "Let our AI analyze your habits and provide tailored recommendations to grow your wealth.",
  },
];

export const testimonialsData = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "FinOS completely transformed how I manage my freelance income. The automated receipt scanning alone saves me hours every month.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The dark glassmorphism UI is absolutely stunning. But beyond the aesthetics, the AI insights are genuinely useful. Highly recommended.",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I used to juggle three different apps for budgeting. Now I just use FinOS. It's powerful, intuitive, and beautifully designed.",
  },
];
