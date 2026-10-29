"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-border bg-surface text-ink shadow-sm placeholder:text-muted-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full min-h-[96px] rounded-xl border border-border bg-surface text-ink shadow-sm placeholder:text-muted-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn("text-sm font-medium text-ink-soft mb-2 block tracking-normal", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Input, Textarea, Label };
