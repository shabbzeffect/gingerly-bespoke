"use client";

import { useEffect, useState } from "react";
import { db, mockDb } from "@/lib/db";
import Link from "next/link";

type ClientRow = {
  id?: number | null;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  createdAt?: string | null;
};

async function fetchClients() {
  const d = db();
  if (d) {
    return await (d.query.clients.findMany() as unknown as ClientRow[]);
  }
  // Derive clients from mock consultations.
  const consults = await mockDb.queryConsultations();
  const byEmail: Record<string, ClientRow> = {};
  for (const c of consults) {
    if (!byEmail[c.email]) {
      byEmail[c.email] = {
        id: c.clientId,
        name: c.name,
        email: c.email,
        phone: c.phone,
        country: c.country,
        createdAt: c.createdAt,
      };
    }
  }
  return Object.values(byEmail);
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchClients().then((rows) => { if (mounted) setClients(rows); if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="flex-1">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-2">Clients</h1>
          <p className="text-espresso/60">Client profiles from consultation enquiries.</p>
        </div>
        <Link href="/admin"><button className="text-espresso/60 hover:text-gold transition-colors text-sm">← Back</button></Link>
      </div>

      <div className="rounded-2xl border border-espresso/10 bg-ivory overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-espresso/10 bg-espresso/5">
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Name</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Email</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Phone</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Country</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center"><div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : clients.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-espresso/40">No clients yet.</td></tr>
              ) : (
                clients.map((c: ClientRow) => (
                  <tr key={c.id || c.email} className="border-b border-espresso/10 hover:bg-espresso/3 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-espresso">{c.name}</td>
                    <td className="px-6 py-4 text-espresso/70 text-sm">{c.email}</td>
                    <td className="px-6 py-4 text-espresso/70 text-sm">{c.phone || "—"}</td>
                    <td className="px-6 py-4 text-espresso/70 text-sm">{c.country || "—"}</td>
                    <td className="px-6 py-4 text-xs text-espresso/40">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
