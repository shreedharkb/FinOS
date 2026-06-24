"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) onOpenChange?.(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </div>
  );
};

const DialogTrigger = React.forwardRef(({ className, onClick, children, asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick, ref, ...props });
  }
  return (
    <button ref={ref} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
});
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 w-full max-w-lg rounded-xl border border-border/50 bg-[#0D0B12] shadow-2xl shadow-black/50 p-6 animate-in fade-in-0 zoom-in-95",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />
);

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}
    {...props}
  />
);

const DialogClose = React.forwardRef(({ className, onClick, ...props }, ref) => (
  <button ref={ref} className={cn("absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100", className)} onClick={onClick} {...props}>
    <X className="h-4 w-4" />
  </button>
));
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
