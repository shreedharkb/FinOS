import Link from "next/link";
import { BarChart3 } from "lucide-react";
import DecryptedText from "@/components/ui/decrypted-text";

export default function Footer() {
  return (
    <footer className="relative w-full mt-12">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative w-full flex flex-col items-center justify-center px-6 py-16 gap-8">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-[0_0_24px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all">
            <img src="/favicon.ico" alt="FinOS Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-3xl tracking-[0.1em] uppercase text-white flex items-center">
            <DecryptedText text="Fin" animateOn="hover" />
            <DecryptedText
              text="OS"
              className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              encryptedClassName="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              animateOn="hover"
            />
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm tracking-[0.18em] text-zinc-400 font-light uppercase text-center">
          Manage Smarter &nbsp;·&nbsp; Invest Better &nbsp;·&nbsp; Stay Ahead
        </p>



        {/* Divider with center diamond */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <div className="w-1.5 h-1.5 rotate-45 bg-cyan-400/50 rounded-[2px]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-500 tracking-wide">
          © {new Date().getFullYear()} FinOS &nbsp;·&nbsp; All Rights Reserved
        </p>

        {/* Creator credit */}
        <p className="text-sm tracking-[0.15em] uppercase text-zinc-500">
          Crafted with ♥ by{" "}
          <span className="text-zinc-300 font-semibold">Shreedhar K B</span>
        </p>

      </div>
    </footer>
  );
}
