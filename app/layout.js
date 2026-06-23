import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
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
        <body className={`${inter.variable} ${outfit.variable} ${inter.className} min-h-screen antialiased bg-background text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>

            </div>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
