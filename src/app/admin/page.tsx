import { db, mockDb } from "@/lib/db";
import { Consultation } from "@/lib/schema";

const STATUSES = ["pending", "confirmed", "completed", "cancelled", "rescheduled"] as const;

type ConsultationRow = Consultation & {
  occasion?: string | null;
  appointmentType?: string | null;
};

async function getStats() {
  const d = db();
  if (d) {
    const consults = await d.query.consultations.findMany() as unknown as ConsultationRow[];
    return { consultations: consults.length };
  }
  return { consultations: (await mockDb.queryConsultations()).length };
}

async function getConsultations() {
  const d = db();
  if (d) {
    const rows = await d.query.consultations.findMany() as unknown as ConsultationRow[];
    return rows.sort((a: ConsultationRow, b: ConsultationRow) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return mockDb.queryConsultations() as unknown as ConsultationRow[];
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const consultations = await getConsultations();

  const byStatus = STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: consultations.filter((c: ConsultationRow) => c.status === s).length }),
    {} as Record<string, number>,
  );

  return (
    <div className="flex-1">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-2 tracking-tight">Admin dashboard</h1>
        <p className="text-espresso/60">Consultation pipeline and client management.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-[1.75rem] border border-border bg-ivory shadow-sm">
          <div className="text-xs uppercase tracking-widest text-espresso/50 font-medium mb-3">Total consultations</div>
          <div className="text-4xl font-serif font-bold text-espresso">{stats.consultations}</div>
        </div>
        <div className="p-8 rounded-[1.75rem] border border-border bg-ivory shadow-sm">
          <div className="text-xs uppercase tracking-widest text-espresso/50 font-medium mb-3">Pending</div>
          <div className="text-4xl font-serif font-bold text-gold">{byStatus.pending}</div>
        </div>
        <div className="p-8 rounded-[1.75rem] border border-border bg-ivory shadow-sm">
          <div className="text-xs uppercase tracking-widest text-espresso/50 font-medium mb-3">Confirmed</div>
          <div className="text-4xl font-serif font-bold text-savanna">{byStatus.confirmed}</div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-ivory overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border flex flex-col sm:flex-row justify-between items-end gap-4">
          <h2 className="font-serif font-semibold text-ink text-xl tracking-tight">Consultation pipeline</h2>
          <div className="flex gap-2">
            {STATUSES.map((s) => (
              <button key={s} className="px-3 py-1.5 rounded-full text-xs border transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-espresso/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Client</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Occasion</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Type</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Event date</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-espresso/50 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {consultations.slice(0, 20).map((c: ConsultationRow) => (
                <tr key={c.id} className="border-b border-border hover:bg-espresso/3 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-espresso">{c.name}</td>
                  <td className="px-6 py-4 text-espresso/70">{c.occasion?.replace(/_/g, " ")}</td>
                  <td className="px-6 py-4 text-espresso/70">{c.appointmentType?.replace(/_/g, " ")}</td>
                  <td className="px-6 py-4 text-espresso/70">{c.eventDate ? new Date(c.eventDate).toLocaleDateString() : "\u2014"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusChip(c.status ?? "pending")}`}>
                      {c.status ?? "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-espresso/40">{c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "\u2014"}</td>
                </tr>
              ))}
              {consultations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-espresso/40">No consultations yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-10 text-[10px] text-espresso/40 text-center">
        Data shown is from the live database when DATABASE_URL is configured; otherwise it is the in-memory demo store (resets on restart).
      </p>
    </div>
  );
}

function statusChip(status: string) {
  const base = "border text-espresso";
  switch (status) {
    case "pending": return `${base} border-gold/30 bg-gold/10`;
    case "confirmed": return `${base} border-savanna/30 bg-savanna/10`;
    case "completed": return `${base} border-espresso/30 bg-espresso/10`;
    case "cancelled": return `${base} border-clay/30 bg-clay/10`;
    case "rescheduled": return `${base} border-espresso/30 bg-espresso/10`;
    default: return `${base} border-espresso/20 bg-espresso/5`;
  }
}
