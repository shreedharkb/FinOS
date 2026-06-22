import { Loader2 } from "lucide-react";

export default function MainLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 w-full h-full bg-cyan-500/20 blur-xl rounded-full" />
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin relative z-10" />
      </div>
      <p className="text-muted-foreground font-medium animate-pulse">
        Loading FinOS Dashboard...
      </p>
    </div>
  );
}
