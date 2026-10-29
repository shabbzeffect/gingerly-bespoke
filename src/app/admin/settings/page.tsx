"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { db, mockDb } from "@/lib/db";

const SETTING_KEYS = [
  "brand_name",
  "brand_tagline",
  "default_currency",
  "base_location",
  "consultation_fee",
  "virtual_consultation_fee",
  "whatsapp_number",
  "instagram_handle",
  "email",
  "rentals_enabled",
];

type SiteSettingRow = { key: string; value: string };

async function fetchSettings() {
  const d = db();
  if (d) {
    const rows = await d.query.siteSettings.findMany();
    return Object.fromEntries((rows as unknown as SiteSettingRow[]).map((r) => [r.key, r.value]));
  }
  return (await mockDb.querySiteSettings()).reduce((acc: Record<string, string>, { key, value }) => ({ ...acc, [key]: value }), {});
}

async function upsert(key: string, value: string) {
  const d = db();
  if (d) {
    const existing = await d.query.siteSettings.findFirst({ where: { key } });
    if (existing) {
      return d.updateSiteSettings?.({ key, value });
    }
    return d.insertSiteSettings?.({ key, value });
  }
  return mockDb.upsertSiteSetting(key, value);
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchSettings().then((s) => { if (mounted) setSettings(s); if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (const key of SETTING_KEYS) {
        const input = document.querySelector(`input[name="${key}"]`) as HTMLInputElement | null;
        await upsert(key, input ? input.value : "");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="flex-1">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-2">Settings</h1>
        <p className="text-espresso/60">Configure brand details, contact channels, and enabled services.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {saved && <div className="rounded-xl border border-savanna/30 bg-savanna/10 p-4 text-savanna text-sm">Settings saved.</div>}
        <div className="grid sm:grid-cols-2 gap-6">
          {SETTING_KEYS.map((key) => (
            <div key={key} className="col-span-1 sm:col-span-1">
              <Label>{key.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</Label>
              <Input
                name={key}
                defaultValue={settings[key] || ""}
                className="w-full h-10 rounded-xl border border-espresso/20 bg-ivory text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              />
              <p className="text-[10px] text-espresso/40 mt-1">{keyHint(key)}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-espresso/50">
          Contact details (WhatsApp, email, Instagram) and pricing are configurable here and must be supplied by the atelier before launch.
        </p>
        <Button variant="gold" disabled={submitting} className="w-auto">
          {submitting ? "Saving…" : "Save settings"}
        </Button>
      </form>
    </div>
  );
}

function keyHint(key: string) {
  const hints: Record<string, string> = {
    brand_name: "Display name across the site.",
    brand_tagline: "Short brand line, shown in the hero.",
    default_currency: "Default currency for quoted prices (e.g. KES).",
    base_location: "Atelier base location (e.g. Nairobi, Kenya).",
    consultation_fee: "Consultation fee, or 'Free'.",
    virtual_consultation_fee: "Virtual consultation fee, or 'Free'.",
    whatsapp_number: "WhatsApp Business number (country code, no spaces).",
    instagram_handle: "Instagram handle without @.",
    email: "Atelier enquiry email.",
    rentals_enabled: "Set to 'true' to enable the rental enquiry flow.",
  };
  return hints[key] || "";
}
