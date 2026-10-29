"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function Dialog({ open, onOpenChange, children, title, description }: DialogProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onKeyDown={handleKeyDown}>
        <div
          className={cn(
            "w-full max-w-lg rounded-[2rem] border border-border bg-surface shadow-2xl p-8 scale-95 opacity-0 transition-all duration-300 ease-out",
            open ? "scale-100 opacity-100" : "",
            "focus-visible:outline-none"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "dialog-title" : undefined}
          aria-describedby={description ? "dialog-description" : undefined}
        >
          {title && (
            <h2 id="dialog-title" className="text-h3 font-serif font-semibold text-ink mb-2 tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p id="dialog-description" className="text-sm text-muted leading-relaxed mb-8">
              {description}
            </p>
          )}
          <div className="flex justify-end">{children}</div>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 rounded-full p-2 text-muted-soft hover:text-ink hover:bg-espresso/5 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Dialog };
