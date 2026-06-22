import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "FinOS — Your Financial Operating System",
  description:
    "AI-powered finance platform for smart money management, expense tracking, and financial insights.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen antialiased`}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
