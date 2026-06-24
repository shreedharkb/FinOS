"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Landmark, PiggyBank } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@backend/actions/dashboard";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to update default account");
  }, [error]);

  return (
    <Card className="group relative overflow-hidden border border-border/40 bg-[#0D0B12]/80 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
      {/* Subtle glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-foreground">{name}</CardTitle>
          <p className="text-xs text-muted-foreground capitalize">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isDefault && (
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] px-2">
              Default
            </Badge>
          )}
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
            className="data-[state=checked]:bg-cyan-500"
          />
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <Link href={`/account/${id}`}>
          <div className="space-y-1 cursor-pointer">
            <div className="flex items-center gap-2">
              {type === "SAVINGS" ? (
                <PiggyBank className="h-5 w-5 text-cyan-400" />
              ) : (
                <Landmark className="h-5 w-5 text-cyan-400" />
              )}
              <span className="text-2xl font-bold tracking-tight">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>Income</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-400">
          <ArrowDownRight className="h-3.5 w-3.5" />
          <span>Expenses</span>
        </div>
      </CardFooter>
    </Card>
  );
}
