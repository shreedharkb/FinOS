import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Shield, Zap, Lock, Wallet, LineChart } from "lucide-react";
import Link from "next/link";
import ShinyText from "@/components/shiny-text";
import Ferrofluid from "@/components/ferrofluid";
import MagicBento from "@/components/magic-bento";
import HowItWorks from "@/components/how-it-works";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 pt-32 pb-24 md:pt-48 md:pb-32 min-h-[90vh]">
        <div className="absolute inset-0 -z-20 opacity-50">
          <Ferrofluid
            colors={['#5227FF', '#06b6d4', '#FF9FFC']}
            speed={0.5}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={2.5}
            shimmer={1.5}
            glow={2}
            flowDirection="down"
            opacity={1}
            mouseInteraction={true}
            mouseStrength={1}
            mouseRadius={0.35}
            mouseDampening={0.15}
          />
        </div>
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

        <div className="z-10 flex max-w-6xl flex-col items-center text-center">
          <div role="heading" aria-level={1} className="text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl flex flex-col items-center sm:block drop-shadow-lg">
            <ShinyText
              text="Next Generation "
              color="#ffffff"
              shineColor="#22d3ee"
              speed={3}
              className="justify-center sm:inline-flex mb-2 sm:mb-0"
            />
            <br className="hidden sm:block" />
            <ShinyText
              text="Financial OS"
              color="#22d3ee"
              shineColor="#ffffff"
              speed={3}
              delay={1.5}
              className="text-cyan-400 justify-center sm:inline-flex pb-2 lg:pb-4"
            />
          </div>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-zinc-400 font-light tracking-wide leading-relaxed">
            Manage your portfolio, analyze trends, and stay ahead of the market in one seamless platform.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center w-full max-w-2xl px-6 sm:px-0">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all hover:scale-105 active:scale-95 group rounded-full border-none">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1.5" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-medium text-white border-border/50 bg-[#120F17] hover:bg-white/5 transition-all hover:border-cyan-500/50 hover:text-cyan-400 rounded-full group">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="w-full max-w-[1500px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">Everything you need to execute your strategy</h2>
        </div>

        <div className="w-full mt-10">
          <MagicBento 
            enableTilt={true} 
            enableMagnetism={true} 
            glowColor="34, 211, 238" 
          />
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

    </div>
  );
}
