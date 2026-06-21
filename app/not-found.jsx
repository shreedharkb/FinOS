import Link from "next/link";
import { Button } from "@frontend/components/ui/button";
import { Terminal } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center space-y-6 p-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Terminal className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Process not found. The page you&apos;re looking for doesn&apos;t exist
          in this system.
        </p>

        <Link href="/">
          <Button className="gradient-btn rounded-lg px-6 py-3 mt-4">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
