"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db, mockDb, consultationStatusSchema } from "@/lib/db";
import { Search } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Consultation } from "@/lib/schema";

const STATUSES = ["pending", "confirmed", "completed", "cancelled", "rescheduled"] as const;

type ConsultationRow = Consultation & {
  occasion?: string | null;
  appointmentType?: string | null;
};

async function fetchConsultations() {
  const d = db();
  if (d) {
    return d.query.consultations.findMany() as unknown as ConsultationRow[];
  }
  return mockDb.queryConsultations() as unknown as ConsultationRow[];
}

async function updateStatus(id: number, data: { status: string; internalNotes?: string }) {
  const d = db();
  if (d) {
    return d.updateConsultation?.(id, data);
  }
  return mockDb.updateConsultation(id, data);
}

function labelHtml(children: React.ReactNode) {
  return <div className="text-xs uppercase tracking-widest text-espresso/50 font-medium mb-1 block">{children}</div>;
}

function statusChip(status: string) {
  const base = "border text-espresso";
  switch (status) {
    case "pending": return `${base} border-gold/30 bg-gold/10`;
    case "confirmed": return `${base} border-savanna/30 bg-savanna/10`;
    case "completed": return `${base} border-espresso/30 bg-espresso/10`;
    case "cancelled": return `${base} border-clay/30 bg-clay/10`;
    default: return `${base} border-espresso/20 bg-espresso/5`;
  }
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<ConsultationRow | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchConsultations().then((rows) => {
      if (mounted) setConsultations(rows);
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const filtered = consultations.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (c.name || "").toLowerCase().includes(s) || (c.email || "").toLowerCase().includes(s);
    }
    return true;
  });

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const status = formData.get("status") as string | null;
    const notes = formData.get("notes") as string | null;
    const parsed = consultationStatusSchema.safeParse({ status, internalNotes: notes || undefined });
    if (!parsed.success || !editing) { setSubmitting(false); return; }
    try {
      await updateStatus(editing.id, parsed.data);
      setOpenDialog(false);
      setEditing(null);
      const rows = await fetchConsultations();
      setConsultations(rows);
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-2">Consultations</h1>
        <p className="text-espresso/60">Review, filter, and update consultation enquiries.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-end mb-6 gap-4">
        <div className="relative w-full lg:w-80">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-xl border border-espresso/20 bg-ivory text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                statusFilter === s
                  ? "bg-gold text-espresso border-gold font-semibold"
                  : "border-espresso/10 bg-ivory text-espresso/70 hover:bg-espresso/5"
              }`}
            >
              {s}
            </button>
          ))}
          <Link href="/admin">
            <Button variant="outline" size="small">Back to dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-espresso/10 bg-ivory overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-espresso/10 bg-espresso/5">
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Client</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Occasion</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Type</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Event date</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Status</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Updated</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center"><div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-espresso/40">No consultations match your filters.</td></tr>
              ) : (
                filtered.map((c: ConsultationRow) => (
                  <tr key={c.id} className="border-b border-espresso/10 hover:bg-espresso/3 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-espresso">{c.name}</div>
                      <div className="text-xs text-espresso/50">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-espresso/70">{c.occasion?.replace(/_/g, " ")}</td>
                    <td className="px-6 py-4 text-espresso/70">{c.appointmentType?.replace(/_/g, " ")}</td>
                    <td className="px-6 py-4 text-espresso/70">{c.eventDate ? new Date(c.eventDate).toLocaleDateString() : "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusChip(c.status ?? "pending")}`}>
                        {c.status ?? "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-espresso/40">{c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "—"}</td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="small" onClick={() => { setEditing(c); setOpenDialog(true); }}>
                        Update status
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        title="Update consultation status"
        description={editing ? `Updating status for ${editing.name}.` : undefined}
      >
        <form onSubmit={handleStatusUpdate}>
          <div className="space-y-4">
            {labelHtml("Status")}
            <select name="status" defaultValue={editing?.status ?? ""} className="w-full h-10 rounded-xl border border-espresso/20 bg-ivory text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {labelHtml("Internal notes")}
            <textarea name="notes" defaultValue={editing?.internalNotes || ""} rows={3} className="w-full rounded-xl border border-espresso/20 bg-ivory text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="gold" type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save"}</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
