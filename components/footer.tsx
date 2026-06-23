import Link from "next/link";
import { BarChart3 } from "lucide-react";



export default function Footer() {
  return (
    <footer className="relative w-full mt-12">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative w-full flex flex-col items-center justify-center px-6 py-16 gap-8">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/15 to-violet-500/10 border border-cyan-500/25 shadow-[0_0_24px_rgba(34,211,238,0.1)]">
            <BarChart3 className="h-6 w-6 text-cyan-400" strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">
            Fin<span className="text-cyan-400">OS</span>
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
