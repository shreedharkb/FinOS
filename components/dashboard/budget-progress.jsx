"use client";

import { useState, useEffect } from "react";
import { Check, Pencil, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { updateBudget } from "@backend/actions/budget";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: updateBudgetLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const budget = updatedBudget?.data || initialBudget;
  const budgetAmount = budget?.amount ?? 0;
  const percentUsed = budgetAmount > 0 ? (currentExpenses / budgetAmount) * 100 : 0;
  const remaining = budgetAmount - currentExpenses;
  const isOverBudget = percentUsed > 100;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to update budget");
  }, [error]);

  const getProgressColor = () => {
    if (percentUsed >= 90) return "bg-rose-500";
    if (percentUsed >= 75) return "bg-amber-500";
    return "bg-cyan-500";
  };

  return (
    <Card className="border border-border/40 bg-[#0D0B12]/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-6 w-6 text-cyan-400" />
            Monthly Budget
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (!isEditing) {
                setNewBudget(budget?.amount?.toString() || "");
              }
              setIsEditing(!isEditing);
            }}
            className="h-10 px-4 text-sm hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            <Pencil className="h-4 w-4 mr-1" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-base">$</span>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="pl-7 bg-white/5 border-border/50 focus:border-cyan-500/50"
                placeholder="Enter monthly budget"
              />
            </div>
            <Button
              onClick={handleUpdateBudget}
              disabled={updateBudgetLoading}
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-3"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-sm text-muted-foreground mb-1">Budget</p>
              <p className="text-xl font-bold">
                {budgetAmount > 0 ? `$${budgetAmount.toLocaleString()}` : "—"}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-sm text-muted-foreground mb-1">Spent</p>
              <p className="text-xl font-bold text-rose-400">
                ${currentExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-sm text-muted-foreground mb-1">Remaining</p>
              <p className={`text-xl font-bold ${isOverBudget ? "text-rose-400" : "text-emerald-400"}`}>
                {isOverBudget ? "-" : ""}${Math.abs(remaining).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}

        {budgetAmount > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{Math.min(percentUsed, 100).toFixed(1)}% used</span>
              {isOverBudget && (
                <span className="text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Over budget!
                </span>
              )}
            </div>
            <div className="relative h-3 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
          </div>
        )}

        {!budget && (
          <p className="text-sm text-muted-foreground text-center py-2">
            No budget set yet. Click Edit to set your monthly budget.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
