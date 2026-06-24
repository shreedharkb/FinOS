"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@backend/actions/dashboard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z
    .string()
    .min(1, "Initial balance is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Balance must be a non-negative number",
    }),
  isDefault: z.boolean().default(false),
});

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully!");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to create account");
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-4 pb-6">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-cyan-400">Create New Account</DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-4">
          {/* Account Name */}
          <div className="space-y-2">
            <label className="text-base font-medium text-muted-foreground">Account Name</label>
            <Input
              placeholder="e.g. Main Checking"
              className="bg-white/5 border-border/50 focus:border-cyan-500/50"
              {...register("name")}
            />
            {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <label className="text-base font-medium text-muted-foreground">Account Type</label>
            <Select
              defaultValue="CURRENT"
              onValueChange={(value) => setValue("type", value)}
            >
              <SelectTrigger className="bg-white/5 border-border/50 focus:border-cyan-500/50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="SAVINGS">Savings</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-400">{errors.type.message}</p>}
          </div>

          {/* Initial Balance */}
          <div className="space-y-2">
            <label className="text-base font-medium text-muted-foreground">Initial Balance</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="bg-white/5 border-border/50 focus:border-cyan-500/50"
              {...register("balance")}
            />
            {errors.balance && <p className="text-sm text-red-400">{errors.balance.message}</p>}
          </div>

          {/* Default Account Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 border border-border/30 p-5">
            <div>
              <p className="text-base font-medium">Set as Default</p>
              <p className="text-sm text-muted-foreground">This account will be pre-selected for transactions</p>
            </div>
            <Switch
              checked={watch("isDefault")}
              onCheckedChange={(checked) => setValue("isDefault", checked)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <DrawerClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border/50 bg-transparent hover:bg-white/5"
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              disabled={createAccountLoading}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              {createAccountLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
