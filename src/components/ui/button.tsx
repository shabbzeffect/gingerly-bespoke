"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "gold" | "outline" | "ghost" | "secondary";
  size?: "small" | "medium" | "large";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "medium", asChild = false, children, ...props }, ref) => {
    const variants = {
      default:
        "bg-espresso text-ivory hover:bg-espresso-600 shadow-sm hover:shadow-espresso/30 transition-all duration-300",
      gold:
        "bg-gold text-espresso hover:bg-gold-dark shadow-sm hover:shadow-gold/30 transition-all duration-300 gold-foil",
      outline:
        "border border-border bg-surface text-espresso hover:bg-gold/5 hover:border-gold/40 transition-all duration-300",
      ghost: "text-espresso hover:bg-gold/5 hover:text-gold transition-colors duration-300",
      secondary: "bg-savanna text-ivory hover:bg-savanna/90 shadow-sm hover:shadow-savanna/30 transition-all duration-300",
    };

    const sizes = {
      small: "h-9 px-3 text-xs font-medium",
      medium: "h-11 px-5 text-sm font-medium",
      large: "h-12 px-7 text-base font-semibold",
    };

    const base = cn(
      "inline-flex items-center justify-center rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild) {
      if (children == null) {
        return null;
      }
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(child.props.className, base),
        ...props,
      });
    }

    return <button className={base} ref={ref} {...props}>{children}</button>;
  }
);

Button.displayName = "Button";

export { Button };
