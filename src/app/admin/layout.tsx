"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/consultations", label: "Consultations", icon: FileText },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/lookbook", label: "Lookbook", icon: Calendar },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex h-full bg-espresso">
      <aside className={cn("hidden lg:flex flex-col w-64 border-r border-espresso/20", open ? "" : "w-20")}>
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-display font-semibold text-ivory text-lg tracking-tight">Gingerly</span>
          {open && <button onClick={() => setOpen(false)} className="text-espresso/40 hover:text-ivory"><span className="sr-only">Collapse</span><span className="h-0.5 w-6 bg-espresso/40 rounded-full" /></button>}
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                active ? "bg-gold text-espresso font-semibold" : "text-espresso/50 hover:bg-espresso/10 hover:text-ivory")}>
                <Icon className="h-5 w-5" />
                {open && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-espresso/20">
          <button onClick={() => signOut()} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-espresso/50 hover:bg-espresso/10 hover:text-ivory transition-colors">
            <LogOut className="h-5 w-5" />
            {open && <span className="text-sm">Sign out</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 border-b border-espresso/10 bg-espresso/90 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen((o) => !o)} className="lg:hidden text-ivory">
              <span className="sr-only">Toggle menu</span>
              <div className="w-6 h-0.5 bg-ivory relative">
                <div className="absolute inset-0 h-0.5 bg-ivory -translate-y-2" />
                <div className="absolute inset-0 h-0.5 bg-ivory translate-y-2" />
              </div>
            </button>
            {open && (
              <span className="font-display font-semibold text-ivory tracking-tight text-lg">Admin</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-espresso/40 uppercase tracking-widest">
              {session?.user?.name || "Admin"} · {session?.user?.role}
            </span>
            <button onClick={() => signOut()} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-espresso/50 hover:bg-espresso/10 hover:text-ivory text-xs transition-colors">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
