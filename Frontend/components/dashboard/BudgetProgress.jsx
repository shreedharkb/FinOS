"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";

import { useFetch } from "@frontend/hooks/use-fetch";
import { updateBudget } from "@backend/actions/budget";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import { Progress } from "@frontend/components/ui/progress";
import { Input } from "@frontend/components/ui/input";
import { Button } from "@frontend/components/ui/button";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(initialBudget?.amount || 0);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: initialBudget?.amount || 0,
    },
  });

  const { loading: updateLoading, fn: updateBudgetFn } = useFetch(updateBudget);

  const onSubmit = async (data) => {
    try {
      const newAmount = parseFloat(data.amount);
      const res = await updateBudgetFn(newAmount);
      if (res?.success) {
        setBudgetAmount(newAmount);
        setIsEditing(false);
        toast.success("Budget updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update budget");
    }
  };

  const percentUsed = budgetAmount > 0 ? (currentExpenses / budgetAmount) * 100 : 0;
  const isOverBudget = percentUsed > 100;
  const isWarning = percentUsed >= 80 && percentUsed <= 100;

  let progressColor = "bg-cyan-500";
  if (isOverBudget) progressColor = "bg-rose-500";
  else if (isWarning) progressColor = "bg-amber-500";

  return (
    <Card className="glass border-white/5 bg-white/[0.02] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Monthly Budget</CardTitle>
          <CardDescription>Monitor your spending limits</CardDescription>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-cyan-500"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 mt-4">
            <Input
              type="number"
              step="0.01"
              className="glass border-white/10"
              {...register("amount", { required: true, min: 0 })}
            />
            <Button
              type="submit"
              size="icon"
              disabled={updateLoading}
              className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border border-emerald-500/50"
            >
              {updateLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset({ amount: budgetAmount });
              }}
              className="glass hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="flex justify-between text-sm font-medium">
              <span>
                Spent: <span className="text-foreground">${currentExpenses.toFixed(2)}</span>
              </span>
              <span className="text-muted-foreground">
                Budget: ${budgetAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                    isOverBudget ? "text-rose-500 bg-rose-500/10" : 
                    isWarning ? "text-amber-500 bg-amber-500/10" : 
                    "text-cyan-500 bg-cyan-500/10"
                  }`}>
                    {percentUsed.toFixed(1)}% Used
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10">
                <div
                  style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${progressColor}`}
                />
              </div>
            </div>
            {isOverBudget && (
              <p className="text-xs text-rose-500 mt-2">
                You have exceeded your monthly budget by ${(currentExpenses - budgetAmount).toFixed(2)}.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
