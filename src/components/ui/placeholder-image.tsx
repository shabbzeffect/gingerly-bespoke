"use client";

import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function PlaceholderImage({
  src,
  alt,
  label,
  className,
  width,
  height,
  priority,
}: PlaceholderImageProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        style={style}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  const bg = label ? hashToColor(label) : "#E9CFC0";
  return (
    <div
      className={cn("w-full h-full flex items-center justify-center rounded-3xl overflow-hidden relative", className)}
      style={{ backgroundColor: bg, ...style }}
    >
      <svg
        className="w-16 h-16 opacity-30"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "grayscale(1)" }}
      >
        <rect width="64" height="64" rx="20" fill="#D4A93C" fillOpacity="0.15" stroke="#D4A93C" strokeWidth="1" strokeOpacity="0.35" />
        <path d="M16 32L32 16L48 32" stroke="#D4A93C" strokeWidth="2" strokeOpacity="0.45" fill="none" />
        <circle cx="32" cy="32" r="4" fill="#D4A93C" fillOpacity="0.55" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-ink/25 text-xs font-sans tracking-wide uppercase z-10 pointer-events-none">
        <span>Sample imagery</span>
        <span className="mt-1 text-[10px] opacity-50">replace with brand photography</span>
      </div>
    </div>
  );
}

function hashToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash & 0xffffff;
  return `#${("000000" + h.toString(16)).slice(-6)}`;
}
