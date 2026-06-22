import Hero from "@frontend/components/layout/Hero";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@frontend/shared/constants/landing";
import { Card, CardContent } from "@frontend/components/ui/card";
import Header from "@frontend/components/layout/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Intelligent Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to manage your finances, powered by advanced artificial intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <Card key={index} className="glass border-white/5 hover:border-white/10 transition-colors bg-white/[0.02]">
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-lg bg-white/5 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">How FinOS Works</h2>
            <p className="text-muted-foreground text-lg">
              Get started in minutes and let our algorithms do the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-cyan-500/0 via-violet-500/50 to-cyan-500/0" />
            
            {howItWorksData.map((step, index) => (
              <div key={index} className="relative text-center space-y-6">
                <div className="mx-auto w-24 h-24 rounded-2xl glass flex items-center justify-center border border-white/10 bg-background relative z-10 shadow-lg">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-cyan-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">Ready to master your money?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their financial future with FinOS.
          </p>
          <button className="gradient-btn px-8 py-4 rounded-xl text-lg font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} FinOS. Built by Shreedhar K B.</p>
        </div>
      </footer>
    </div>
  );
}
