import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Shield, Zap, Lock, Wallet, LineChart } from "lucide-react";
import Link from "next/link";
import BlurText from "@/components/blur-text";
import Ferrofluid from "@/components/ferrofluid";

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

        <div className="z-10 flex max-w-5xl flex-col items-center text-center">
          <div role="heading" aria-level={1} className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl flex flex-col items-center sm:block">
            <BlurText
              text="Next Generation "
              delay={50}
              animateBy="words"
              direction="bottom"
              className="justify-center sm:inline-flex mb-2 sm:mb-0"
            />
            <br className="hidden sm:block" />
            <BlurText
              text="Financial OS"
              delay={50}
              animateBy="words"
              direction="bottom"
              className="text-cyan-400 justify-center sm:inline-flex pb-2"
            />
          </div>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Manage your portfolio, analyze trends, and stay ahead of the market in one seamless platform.
          </p>

          <div className="mt-10 flex w-full justify-center sm:w-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg font-semibold shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-primary/30 transition-all hover:shadow-primary/50 group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="w-full max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">Unfair Advantages.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Everything you need to analyze, execute, and scale your financial strategy, built on top of a true-black, hyper-fast foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {/* Large Card */}
          <Card className="md:col-span-2 flex flex-col justify-between p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-500" />
            <div className="z-10">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Institutional Analytics</h3>
              <p className="text-muted-foreground text-lg max-w-lg">
                Pro-tier charting and deep data exploration. Overlay multiple indicators,
                backtest strategies, and visualize your entire portfolio across chains and brokerages.
              </p>
            </div>
          </Card>

          {/* Medium Card */}
          <Card className="flex flex-col justify-between p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all duration-500" />
            <div className="z-10">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sub-ms Latency</h3>
              <p className="text-muted-foreground">
                Built on Edge infrastructure. Your ledger updates in real-time, zero refresh required.
              </p>
            </div>
          </Card>

          {/* Small Cards */}
          <Card className="flex flex-col p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
            <p className="text-muted-foreground">End-to-end encryption with biometric locks and hardware key support.</p>
          </Card>

          <Card className="flex flex-col p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Unified Ledger</h3>
            <p className="text-muted-foreground">Connect unlimited accounts. See everything in one unified view.</p>
          </Card>

          <Card className="flex flex-col p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Anomaly Detection</h3>
            <p className="text-muted-foreground">AI-powered alerts notify you of unusual spending or market movements instantly.</p>
          </Card>
        </div>
      </section>

    </div>
  );
}
