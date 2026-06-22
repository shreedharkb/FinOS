import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import { Switch } from "@frontend/components/ui/switch";
import { updateDefaultAccount } from "@backend/actions/dashboard";
import { useFetch } from "@frontend/hooks/use-fetch";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return; // Don't allow toggling off the default account directly
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="glass border-white/5 hover:border-cyan-500/30 transition-all shadow-lg group relative overflow-hidden bg-white/[0.02]">
      {/* Ambient glow inside card based on type */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${type === "SAVINGS" ? "bg-violet-500" : "bg-cyan-500"}`} />
      
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium capitalize flex items-center gap-2">
            {name}
          </CardTitle>
          <div
            className="flex items-center gap-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-muted-foreground font-medium">Default</span>
            <Switch
              checked={isDefault}
              onCheckedChange={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-cyan-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold font-mono tracking-tight">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {type.toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground relative z-10 border-t border-white/5 pt-4 mt-2">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
