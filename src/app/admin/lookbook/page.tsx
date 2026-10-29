"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { db, SEED_CONTENT } from "@/lib/db";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { OCCASIONS } from "@/lib/config";
import { LookbookItem } from "@/lib/schema";

const GARMENT_TYPES = ["traditional_attire","bridal_gown","white_wedding","bridesmaid","prom","occasion_wear","menswear","senator_suit","other"];

type LookbookForm = {
  title: string;
  slug: string;
  occasion: string;
  garmentType: string;
  description: string;
  culturalContext: string;
  fabrics: string;
  details: string;
  featured: string;
  priceNote: string;
  currency: string;
  coverImageUrl: string;
  altText: string;
};

async function fetchItems() {
  const d = db();
  if (d) {
    return d.query.lookbookItems.findMany() as unknown as LookbookItem[];
  }
  return SEED_CONTENT.lookbookItems as unknown as LookbookItem[];
}

async function createItem(data: LookbookItem) {
  const d = db();
  if (d) {
    return d.insertLookbookItem?.(data);
  }
  // In-memory demo store does not persist new lookbook items across restarts.
  return data;
}

export default function LookbookAdminPage() {
  const [items, setItems] = useState<LookbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<LookbookForm>({
    title: "", slug: "", occasion: "ruracio", garmentType: "traditional_attire",
    description: "", culturalContext: "", fabrics: "", details: "",
    featured: "false", priceNote: "", currency: "KES", coverImageUrl: "", altText: "",
  });

  useEffect(() => {
    let mounted = true;
    fetchItems().then((rows) => { if (mounted) setItems(rows); if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fabrics = form.fabrics.split(",").map((s: string) => s.trim()).filter(Boolean);
      const details = form.details.split(",").map((s: string) => s.trim()).filter(Boolean);
      await createItem({
        ...form,
        fabrics,
        details,
        featured: form.featured === "true",
      } as LookbookItem);
      setOpenDialog(false);
      const rows = await fetchItems();
      setItems(rows);
    } catch {
      setError("Failed to create item.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-2">Lookbook manager</h1>
        <p className="text-espresso/60">Add and edit lookbook projects, images, and categories.</p>
      </div>

      <div className="flex justify-between items-end mb-6">
        <Button variant="gold" onClick={() => { setForm({ title: "", slug: "", occasion: "ruracio", garmentType: "traditional_attire", description: "", culturalContext: "", fabrics: "", details: "", featured: "false", priceNote: "", currency: "KES", coverImageUrl: "", altText: "" }); setOpenDialog(true); }}>
          Add lookbook item
        </Button>
        <Link href="/admin"><Button variant="outline" size="small">Back to dashboard</Button></Link>
      </div>

      <div className="rounded-2xl border border-espresso/10 bg-ivory overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-espresso/10 bg-espresso/5">
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Title</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Occasion</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Garment type</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Featured</th>
                <th className="px-6 py-3 text-xs uppercase tracking-widest text-espresso/50 font-medium">Cover</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center"><div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-espresso/40">No lookbook items yet.</td></tr>
              ) : (
                items.map((i: LookbookItem) => (
                  <tr key={i.id} className="border-b border-espresso/10 hover:bg-espresso/3 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-espresso">{i.title}</td>
                    <td className="px-6 py-4 text-espresso/70 text-sm">{i.occasion?.replace(/_/g, " ")}</td>
                    <td className="px-6 py-4 text-espresso/70 text-sm">{i.garmentType?.replace(/_/g, " ")}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs border ${
                        i.featured ? "border-gold bg-gold/10 text-gold" : "border-espresso/20 text-espresso/50 bg-espresso/5"
                      }`}>{i.featured ? "Yes" : "No"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <PlaceholderImage src={i.coverImageUrl || undefined} alt={i.altText || i.title} label={i.title} className="w-16 h-20 object-cover rounded-lg" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog} title="Add lookbook item">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {error && <div className="rounded-xl border border-clay/30 bg-clay/10 p-4 text-clay text-sm">{error}</div>}
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Label>Slug (URL-friendly)</Label>
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. ruracio-beaded-gown" />
          <Label>Occasion</Label>
          <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className="w-full h-10 rounded-xl border border-espresso/20 bg-ivory text-espresso">
            {OCCASIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <Label>Garment type</Label>
          <select value={form.garmentType} onChange={(e) => setForm({ ...form, garmentType: e.target.value })} className="w-full h-10 rounded-xl border border-espresso/20 bg-ivory text-espresso">
            {GARMENT_TYPES.map((g) => <option key={g} value={g}>{g.replace(/_/g, " ")}</option>)}
          </select>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <Label>Cultural context</Label>
          <Textarea value={form.culturalContext} onChange={(e) => setForm({ ...form, culturalContext: e.target.value })} rows={2} />
          <Label>Fabrics (comma separated)</Label>
          <Input value={form.fabrics} onChange={(e) => setForm({ ...form, fabrics: e.target.value })} placeholder="e.g. lace, ankara" />
          <Label>Design details (comma separated)</Label>
          <Input value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="e.g. beadwork, rhinestones" />
          <Label>Featured</Label>
          <select value={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.value })} className="w-full h-10 rounded-xl border border-espresso/20 bg-ivory text-espresso">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <Label>Cover image URL</Label>
          <Input value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} />
          <Label>Alt text</Label>
          <Input value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} placeholder="Describe the image for accessibility" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="gold" type="submit" disabled={submitting}>{submitting ? "Saving…" : "Add item"}</Button>
          </div>
        </form>
      </Dialog>

      <p className="mt-6 text-xs text-espresso/40 text-center">
        Images are referenced by URL. Configure private storage (S3/Cloudinary signed URLs) for production uploads.
      </p>
    </div>
  );
}
