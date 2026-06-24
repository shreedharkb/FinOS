"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, PenBox } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import DecryptedText from "@/components/ui/decrypted-text";

export function SiteHeader() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
              <img src="/favicon.ico" alt="FinOS Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-2xl md:text-3xl tracking-[0.1em] uppercase text-white flex items-center">
              <DecryptedText text="Fin" animateOn="hover" />
              <DecryptedText
                text="OS"
                className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                encryptedClassName="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                animateOn="hover"
              />
            </span>
          </Link>


        </div>

        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-2 md:space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/transaction/create">
                  <Button className="flex items-center gap-2 h-11 px-5 text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all rounded-xl">
                    <PenBox className="h-5 w-5" />
                    <span className="hidden md:inline">Add Transaction</span>
                  </Button>
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      // Avatar in navbar
                      avatarBox: "h-14 w-14 ring-2 ring-cyan-500/30 hover:ring-cyan-400 transition-all",
                      // Small popover (dropdown when you first click avatar)
                      userButtonPopoverCard: "w-[340px] shadow-2xl",
                      userButtonPopoverActionButton: "py-3 px-4 text-base",
                      userButtonPopoverActionButtonText: "text-base font-medium",
                      userButtonPopoverActionButtonIconBox: "w-6 h-6",
                      userPreviewMainIdentifier: "text-lg font-bold",
                      userPreviewSecondaryIdentifier: "text-base",
                      userButtonPopoverFooter: "hidden",
                      // Full UserProfile modal
                      modalContent: "w-[900px] max-w-[95vw]",
                      card: "shadow-2xl",
                      navbar: "w-[240px]",
                      navbarButton: "text-base py-3 px-4",
                      navbarButtonIcon: "w-6 h-6",
                      // Profile page
                      pageScrollBox: "p-8",
                      profileSectionTitle: "text-xl font-bold mb-4",
                      profileSectionTitleText: "text-xl font-bold",
                      profileSectionContent: "text-base",
                      profileSectionPrimaryButton: "text-base px-5 py-2.5 h-11",
                      formFieldLabel: "text-base font-semibold mb-2",
                      formFieldInput: "h-11 text-base px-4",
                      formButtonPrimary: "h-11 text-base font-bold px-6",
                      formButtonReset: "h-11 text-base px-6",
                      headerTitle: "text-3xl font-bold",
                      headerSubtitle: "text-base",
                      identityPreviewText: "text-base",
                      identityPreviewEditButton: "text-base",
                      badge: "text-sm px-3 py-1",
                      tableHead: "text-base font-semibold",
                      tableCell: "text-base py-3",
                    }
                  }}
                />
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



