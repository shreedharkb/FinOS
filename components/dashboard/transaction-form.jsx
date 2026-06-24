"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Camera,
  Loader2,
  RefreshCw,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import {
  createTransaction,
  updateTransaction,
  getTransaction,
  scanReceipt,
} from "@backend/actions/transaction";
import { getUserAccounts } from "@backend/actions/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Gift",
  "Other Income",
];

const EXPENSE_CATEGORIES = [
  "Housing",
  "Transportation",
  "Groceries",
  "Dining Out",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal Care",
  "Travel",
  "Insurance",
  "Gifts & Donations",
  "Bills & Fees",
  "Other Expense",
];

const RECURRING_INTERVALS = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.string().min(1, "Amount is required").refine(
    (v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0,
    "Amount must be greater than 0"
  ),
  description: z.string().min(1, "Description is required"),
  accountId: z.string().min(1, "Account is required"),
  category: z.string().min(1, "Category is required"),
  date: z.date({ required_error: "Date is required" }),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).optional(),
});

export function TransactionForm({ accounts, editId }) {
  const router = useRouter();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: accounts?.find((a) => a.isDefault)?.id || accounts?.[0]?.id || "",
      category: "",
      date: new Date(),
      isRecurring: false,
      recurringInterval: undefined,
    },
  });

  // Load existing transaction for editing
  const { loading: loadingTx, fn: loadTxFn, data: existingTx } = useFetch(getTransaction);
  useEffect(() => {
    if (editId) loadTxFn(editId);
  }, [editId]);

  useEffect(() => {
    if (existingTx) {
      reset({
        type: existingTx.type,
        amount: existingTx.amount.toString(),
        description: existingTx.description,
        accountId: existingTx.accountId,
        category: existingTx.category,
        date: new Date(existingTx.date),
        isRecurring: existingTx.isRecurring,
        recurringInterval: existingTx.recurringInterval || undefined,
      });
    }
  }, [existingTx, reset]);

  const { loading: createLoading, fn: createFn, data: createData } = useFetch(createTransaction);
  const { loading: updateLoading, fn: updateFn, data: updateData } = useFetch(updateTransaction);

  const isLoading = createLoading || updateLoading || loadingTx;

  useEffect(() => {
    if (createData?.success || updateData?.success) {
      toast.success(editId ? "Transaction updated!" : "Transaction created!");
      router.push("/dashboard");
    }
  }, [createData, updateData]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
    };
    if (editId) {
      await updateFn(editId, payload);
    } else {
      await createFn(payload);
    }
  };

  // Receipt scanner
  const handleReceiptUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setIsScanning(true);
    try {
      const data = await scanReceipt(file);
      if (data.amount) setValue("amount", data.amount.toString());
      if (data.date) setValue("date", new Date(data.date));
      if (data.description) setValue("description", data.description);
      if (data.category) setValue("category", data.category);
      toast.success("Receipt scanned successfully!");
    } catch (err) {
      toast.error("Failed to scan receipt: " + err.message);
    } finally {
      setIsScanning(false);
      e.target.value = "";
    }
  };

  const watchType = watch("type");
  const watchIsRecurring = watch("isRecurring");
  const watchDate = watch("date");
  const categories = watchType === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  if (loadingTx) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* AI Receipt Scanner */}
      <div>
        <label className={`flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold h-12 gap-2 shadow-lg rounded-lg cursor-pointer transition-all ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}>
          {isScanning ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Scanning Receipt...</>
          ) : (
            <><Camera className="h-5 w-5" /> Scan Receipt with AI</>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
        </label>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="text-base font-medium text-muted-foreground">Type</label>
        <Select
          value={watch("type")}
          onValueChange={(v) => setValue("type", v)}
        >
          <SelectTrigger className="bg-white/5 border-border/50 focus:border-cyan-500/50">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amount */}
        <div className="space-y-2">
          <label className="text-base font-medium text-muted-foreground">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="pl-7 bg-white/5 border-border/50 focus:border-cyan-500/50"
              {...register("amount")}
            />
          </div>
          {errors.amount && <p className="text-sm text-rose-400">{errors.amount.message}</p>}
        </div>

        {/* Account */}
        <div className="space-y-2">
          <label className="text-base font-medium text-muted-foreground">Account</label>
          <Select
            value={watch("accountId")}
            onValueChange={(v) => setValue("accountId", v)}
          >
            <SelectTrigger className="bg-white/5 border-border/50 focus:border-cyan-500/50">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts?.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name} (${acc.balance.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.accountId && <p className="text-sm text-rose-400">{errors.accountId.message}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-base font-medium text-muted-foreground">Category</label>
        <Select
          value={watch("category")}
          onValueChange={(v) => setValue("category", v)}
        >
          <SelectTrigger className="bg-white/5 border-border/50 focus:border-cyan-500/50">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="max-h-56">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-rose-400">{errors.category.message}</p>}
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-base font-medium text-muted-foreground">Date</label>
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="w-full justify-between text-left font-normal bg-white/5 border-border/50 hover:bg-white/10 hover:border-cyan-500/50 h-11 px-4 text-base"
            >
              {watchDate ? format(watchDate, "PPP") : "Pick a date"}
              <CalendarIcon className="h-5 w-5 text-muted-foreground opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              selected={watchDate}
              onSelect={(date) => {
                setValue("date", date);
                setIsDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {errors.date && <p className="text-sm text-rose-400">{errors.date.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-base font-medium text-muted-foreground">Description</label>
        <Input
          placeholder="e.g. Monthly grocery run at Whole Foods"
          className="bg-white/5 border-border/50 focus:border-cyan-500/50"
          {...register("description")}
        />
        {errors.description && <p className="text-sm text-rose-400">{errors.description.message}</p>}
      </div>

      {/* Recurring Toggle */}
      <div className="rounded-xl border border-border/30 bg-white/5 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium flex items-center gap-2">
              Recurring Transaction
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Set up a recurring schedule for this transaction
            </p>
          </div>
          <Switch
            checked={watchIsRecurring}
            onCheckedChange={(v) => setValue("isRecurring", v)}
            className="data-[state=checked]:bg-cyan-500"
          />
        </div>

        {watchIsRecurring && (
          <div className="space-y-2 pt-4 border-t border-border/30">
            <label className="text-base font-medium text-muted-foreground">Interval</label>
            <Select
              value={watch("recurringInterval") || ""}
              onValueChange={(v) => setValue("recurringInterval", v)}
            >
              <SelectTrigger className="bg-white/5 border-border/50 focus:border-cyan-500/50">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {RECURRING_INTERVALS.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.recurringInterval && (
              <p className="text-sm text-rose-400">{errors.recurringInterval.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 text-base font-medium border-border/50 bg-transparent hover:bg-white/5"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-12 text-base font-medium bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white shadow-md border border-white/10"
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
          ) : editId ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}
