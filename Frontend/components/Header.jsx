"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@frontend/components/ui/button";
import {
  LayoutDashboard,
  PenBox,
  Terminal,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Fin</span>
              <span className="text-foreground">OS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className={`gap-2 text-sm ${
                    pathname === "/dashboard"
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/transaction/create">
                <Button className="gradient-btn gap-2 text-sm rounded-lg px-4 py-2">
                  <PenBox className="w-4 h-4" />
                  Add Transaction
                </Button>
              </Link>
            </SignedIn>

            {/* Auth */}
            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 text-sm"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 rounded-lg ring-2 ring-white/10",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-lg ring-2 ring-white/10",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass rounded-xl mt-2 mb-4 p-4 space-y-2 border border-white/5 animate-fade-in">
            <SignedIn>
              <Link href="/dashboard" className="block">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${
                    pathname === "/dashboard"
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/transaction/create" className="block">
                <Button className="w-full gradient-btn gap-2 rounded-lg">
                  <PenBox className="w-4 h-4" />
                  Add Transaction
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-white/10 hover:bg-white/5"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
