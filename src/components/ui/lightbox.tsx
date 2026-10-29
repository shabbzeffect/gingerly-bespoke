"use client";

import * as React from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: { url: string; alt: string }[];
  currentIndex: number;
}

export function Lightbox({ open, onOpenChange, images, currentIndex }: LightboxProps) {
  const [idx, setIdx] = React.useState(currentIndex);
  const [zoomed, setZoomed] = React.useState(false);

  if (!open) return null;

  const image = images[idx];
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onOpenChange(false);
    if (e.key === "ArrowLeft") setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
    if (e.key === "ArrowRight") setIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 left-4 z-20 rounded-full p-2 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4">
        <button
          onClick={() => setIdx((i) => (i === 0 ? images.length - 1 : i - 1))}
          disabled={images.length === 1}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors opacity-50 sm:opacity-100 disabled:hidden"
          aria-label="Previous"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div
          className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10"
          onDoubleClick={() => setZoomed(!zoomed)}
          style={{ maxWidth: zoomed ? "100vw" : "90vw", maxHeight: zoomed ? "100vh" : "90vh" }}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-contain bg-black"
            style={{
              transform: zoomed ? "scale(2)" : "scale(1)",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: zoomed ? "zoom-out" : "zoom-in",
            }}
          />
        </div>

        <button
          onClick={() => setIdx((i) => (i === images.length - 1 ? 0 : i + 1))}
          disabled={images.length === 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors opacity-50 sm:opacity-100 disabled:hidden"
          aria-label="Next"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 text-white/70 text-xs">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === idx ? "bg-gold" : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
