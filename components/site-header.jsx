"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, LayoutDashboard } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center rounded-full border border-cyan-500/30 p-1.5 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
              <Activity className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-[0.1em] uppercase">FinOS</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-2 md:space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="hidden sm:inline-flex text-base font-medium px-4 h-10 hover:bg-transparent hover:text-cyan-400 transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="h-10 md:h-11 px-6 md:px-8 text-sm md:text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all rounded-full group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
