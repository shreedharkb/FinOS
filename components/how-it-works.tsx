"use client";
import { UserPlus, Wallet, Activity, Zap } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Use useMemo to keep the array reference stable, though we can just hardcode length
  const steps = useMemo(() => [
    {
      id: 1,
      title: "Create Your Account",
      description: "Get started in minutes with our simple and secure institutional-grade sign-up.",
      icon: UserPlus,
      time: "Step 1",
    },
    {
      id: 2,
      title: "Connect Ecosystem",
      description: "Securely link your brokerages, wallets, and bank accounts to our unified ledger.",
      icon: Wallet,
      time: "Step 2",
    },
    {
      id: 3,
      title: "Track & Analyze",
      description: "Automatically categorize transactions and run AI-powered backtests in real-time.",
      icon: Activity,
      time: "Step 3",
    },
    {
      id: 4,
      title: "Automate Execution",
      description: "Deploy custom algorithmic trading strategies with sub-ms latency for an unfair edge.",
      icon: Zap,
      time: "Step 4",
    }
  ], []);

  // Robust Auto-progress timer using requestAnimationFrame
  useEffect(() => {
    let startTime = performance.now();
    let frameId: number;
    const totalSteps = 4; // Hardcoded to avoid dependency array size issues

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const duration = 5000; // 5 seconds per phase
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress >= 100) {
        setProgress(0);
        setCurrentStep((prev) => (prev + 1) % totalSteps);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(frameId);
  }, [currentStep, 4]); // Added dummy '4' to keep the dependency array size identical (2) to prevent Next.js HMR crash

  return (
    <section id="how-it-works" className="w-full max-w-7xl px-6 py-24 md:py-32 relative mx-auto">
      <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full" />
      
      <div className="mb-20 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg max-w-2xl font-light">
          Get up and running with our institutional-grade platform in four simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          const Icon = step.icon;
          
          const showConnector = index < steps.length - 1;

          return (
            <div 
              key={step.id} 
              className="relative flex flex-col items-start text-left group cursor-pointer"
              onClick={() => {
                setCurrentStep(index);
                setProgress(0);
              }}
            >
              
              {/* Top row: Icon and horizontal connector line */}
              <div className="flex items-center w-full mb-6 relative">
                <div 
                  className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isActive || isPast 
                      ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110' 
                      : 'bg-[#120F17] border-border text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                {/* Horizontal Connector Line (Desktop) */}
                {showConnector && (
                  <div className="hidden md:block flex-1 h-[2px] bg-border/50 mx-4 relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-cyan-400 transition-none"
                      style={{ 
                        width: isPast ? '100%' : isActive ? `${progress}%` : '0%',
                        boxShadow: '0 0 10px rgba(34,211,238,0.8)'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Mobile Vertical Connector */}
              {showConnector && (
                <div className="md:hidden absolute left-8 top-16 bottom-[-3rem] w-[2px] bg-border/50 z-0">
                  <div 
                    className="absolute top-0 left-0 w-full bg-cyan-400 transition-none"
                    style={{ 
                      height: isPast ? '100%' : isActive ? `${progress}%` : '0%',
                      boxShadow: '0 0 10px rgba(34,211,238,0.8)'
                    }}
                  />
                </div>
              )}

              {/* Title & Description */}
              <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-500 ${isActive || isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.title}
              </h3>
              <p className={`text-base md:text-lg mb-12 md:mb-8 pr-4 transition-colors duration-500 ${isActive || isPast ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
                {step.description}
              </p>



            </div>
          );
        })}
      </div>
    </section>
  );
}
