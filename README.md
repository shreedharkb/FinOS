# FinOS — Your Financial Operating System

An intelligent, AI-powered personal finance tracker built with Next.js 15, Prisma, and Tailwind CSS. FinOS features a stunning dark glassmorphism UI and leverages machine learning to automatically scan receipts and generate financial insights.

## Features

- 🌓 **Premium Dark Glassmorphism UI**: Beautiful, responsive design with smooth animations.
- 🤖 **AI Receipt Scanning**: Upload receipts and let Gemini AI automatically extract the amount, date, and categorize the transaction.
- 🏦 **Multi-Account Tracking**: Manage multiple checking and savings accounts from one dashboard.
- 📊 **Dynamic Budgeting**: Track your monthly expenses against customizable budgets with visual progress indicators.
- 🔄 **Recurring Transactions**: Automatically handle subscriptions and recurring income.
- 🛡️ **Rate-Limiting & Security**: Protected by Arcjet to prevent abuse and brute-force attacks.
- 📧 **Automated Reports**: Uses Inngest and Resend to deliver personalized monthly financial summaries and budget alerts to your inbox.
- 🔐 **Authentication**: Secure, seamless user management powered by Clerk.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Clerk
- **AI**: Google Generative AI (Gemini 1.5 Flash)
- **Background Jobs**: Inngest
- **Security**: Arcjet
- **Emails**: React Email + Resend
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Components**: shadcn/ui

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your API keys (Clerk, Database URL, Gemini API, Inngest, Resend, Arcjet)
4. Push the database schema: `npx prisma db push`
5. Generate Prisma client: `npx prisma generate`
6. Run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Architecture

This project is built using a strict, domain-driven modular architecture:
- `/Frontend`: Client-side UI components, React hooks, and Zod schemas.
- `/Backend`: Server actions, database schema, background jobs, and security layers.
- `/Shared`: Shared utilities and constants.
- `/app`: Next.js App Router mapping.

## License

MIT
