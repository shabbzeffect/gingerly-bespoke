"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { NAVIGATION } from "@/lib/config";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-border bg-ivory/90 backdrop-blur-md transition-colors">
        <div className="page-container flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Gingerly Designs and Fabrics — Home"
          >
            <span className="font-display font-semibold text-ink tracking-tight text-xl">
              Gingerly
            </span>
            <span className="text-xs font-sans uppercase tracking-widest text-gold">
              atelier
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-ink-soft">
            {NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2.5 transition-all duration-300",
                    isActive
                      ? "text-gold font-semibold"
                      : "hover:text-gold hover:bg-gold/5",
                    !isActive && "rounded-xl"
                  )}
                >
                  <span className="block">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="small" asChild>
              <Link href="/book">Book Consultation</Link>
            </Button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-ink-soft hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Diaspora banner */}
        <div className="bg-espresso text-cowrie text-[10px] md:text-sm font-medium tracking-widest px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold"></span>
            Based in Nairobi.
          </div>
          <Link
            href="/virtual-fittings"
            className="flex items-center gap-1 underline underline-offset-4 hover:text-gold transition-colors decoration-gold/40 decoration-underline"
          >
            <span>Virtual Fittings</span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-1 pt-4 pb-8">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 text-base font-medium transition-all",
                  isActive
                    ? "bg-gold/10 text-gold border-r-4 border-gold"
                    : "text-ink-soft hover:bg-gold/5 hover:text-gold"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-6 border-t border-border">
            <Button variant="gold" size="medium" className="gold-foil w-full" asChild>
              <Link href="/book">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
