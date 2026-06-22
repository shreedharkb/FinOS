"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">FinOS</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/sign-in">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="shadow-[0_0_15px_rgba(0,0,0,0.5)] shadow-primary/20 hover:shadow-primary/40 transition-all">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
