"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Camera, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { useFetch } from "@frontend/hooks/use-fetch";
import { createTransaction, scanReceipt } from "@backend/actions/transaction";
import { transactionSchema } from "@frontend/types/schema";
import { defaultCategories } from "@frontend/shared/constants/categories";

import { Input } from "@frontend/components/ui/input";
import { Button } from "@frontend/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@frontend/components/ui/select";
import { Switch } from "@frontend/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@frontend/components/ui/popover";
import { Calendar } from "@frontend/components/ui/calendar";

export function TransactionForm({ accounts }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: "",
      description: "",
      date: new Date(),
      accountId: accounts.find((a) => a.isDefault)?.id || accounts[0]?.id || "",
      category: "",
      isRecurring: false,
    },
  });

  const transactionType = watch("type");
  const isRecurring = watch("isRecurring");
  const selectedDate = watch("date");

  const filteredCategories = defaultCategories.filter(
    (c) => c.type === transactionType
  );

  const {
    loading: createTxLoading,
    fn: createTxFn,
  } = useFetch(createTransaction);

  const onSubmit = async (data) => {
    try {
      const res = await createTxFn(data);
      if (res?.success) {
        toast.success("Transaction created successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      // Error handled by useFetch
    }
  };

  const handleScanReceipt = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    toast.info("Scanning receipt with FinOS AI...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const parsedData = await scanReceipt(file);

      if (parsedData.amount) setValue("amount", parsedData.amount.toString());
      if (parsedData.description) setValue("description", parsedData.description);
      if (parsedData.date) setValue("date", new Date(parsedData.date));
      
      if (parsedData.category) {
        // Try to match category
        const match = filteredCategories.find(
          (c) => c.name.toLowerCase() === parsedData.category.toLowerCase()
        );
        if (match) setValue("category", match.id);
      }

      toast.success("Receipt scanned successfully");
    } catch (error) {
      toast.error("Failed to scan receipt: " + error.message);
    } finally {
      setScanning(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Add Transaction</h2>
        
        {/* Receipt Scanner Button */}
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleScanReceipt}
          />
          <Button
            type="button"
            variant="outline"
            className="glass border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={scanning}
          >
            {scanning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Camera className="w-4 h-4" />
            )}
            {scanning ? "Scanning..." : "Scan Receipt (AI)"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5 glass">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <Select onValueChange={(val) => setValue("type", val)} defaultValue={watch("type")}>
              <SelectTrigger className="glass border-white/10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="glass bg-background/95 backdrop-blur-xl border-white/10">
                <SelectItem value="EXPENSE">Expense</SelectItem>
                <SelectItem value="INCOME">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="glass border-white/10 font-mono text-lg"
              {...register("amount")}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          {/* Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Account</label>
            <Select onValueChange={(val) => setValue("accountId", val)} defaultValue={watch("accountId")}>
              <SelectTrigger className="glass border-white/10">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="glass bg-background/95 backdrop-blur-xl border-white/10">
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} (${parseFloat(acc.balance).toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.accountId && <p className="text-sm text-red-500">{errors.accountId.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <Select onValueChange={(val) => setValue("category", val)} defaultValue={watch("category")}>
              <SelectTrigger className="glass border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass bg-background/95 backdrop-blur-xl border-white/10 max-h-[300px]">
                {filteredCategories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`glass border-white/10 justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass bg-background/95 backdrop-blur-xl border-white/10" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setValue("date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Description (Optional)</label>
            <Input
              placeholder="e.g. Coffee with client"
              className="glass border-white/10"
              {...register("description")}
            />
          </div>
        </div>

        {/* Recurring Switch */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between rounded-lg glass border border-white/10 p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium text-foreground">Recurring Transaction</label>
              <p className="text-sm text-muted-foreground">Set up a recurring schedule for this transaction</p>
            </div>
            <Switch
              checked={isRecurring}
              onCheckedChange={(val) => setValue("isRecurring", val)}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>

          {isRecurring && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-muted-foreground">Recurring Interval</label>
              <Select onValueChange={(val) => setValue("recurringInterval", val)} defaultValue={watch("recurringInterval")}>
                <SelectTrigger className="glass border-white/10 max-w-sm">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent className="glass bg-background/95 backdrop-blur-xl border-white/10">
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.recurringInterval && <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>}
            </div>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-white/10 glass hover:bg-white/5 flex-1 md:flex-none md:w-32"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="gradient-btn flex-1 md:flex-none md:w-48" disabled={createTxLoading}>
            {createTxLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Transaction"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
