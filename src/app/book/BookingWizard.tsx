"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowLeft, MapPin, Play, Mail, Phone, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const OCCASIONS = [
  { value: "ruracio", label: "Ruracio", hint: "Kikuyu traditional introduction" },
  { value: "nyombo", label: "Nyombo", hint: "Luo heritage" },
  { value: "koito", label: "Koito", hint: "Kalenjin celebration" },
  { value: "bukhwi", label: "Bukhwi", hint: "Luhya tradition" },
  { value: "white_wedding", label: "White Wedding", hint: "Lace, trains, cathedral veils" },
  { value: "bridesmaid", label: "Bridesmaids", hint: "Coordinated squad looks" },
  { value: "prom", label: "Prom", hint: "Evening occasion wear" },
  { value: "menswear", label: "Menswear", hint: "Senator suits and tailored grooms" },
  { value: "other", label: "Other Occasion", hint: "Birthday, anniversary, guest" },
];

const GARMENT_TYPES = [
  { value: "traditional_attire", label: "Traditional attire" },
  { value: "bridal_gown", label: "Bridal gown" },
  { value: "white_wedding", label: "White wedding gown" },
  { value: "bridesmaid", label: "Bridesmaid dress" },
  { value: "prom", label: "Prom / occasion wear" },
  { value: "menswear", label: "Menswear" },
  { value: "senator_suit", label: "Senator suit" },
  { value: "other", label: "Other" },
];

function weeksUntil(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.round((d - now) / (7 * 24 * 60 * 60 * 1000)));
}

export const metadata = {
  title: "Book a Consultation",
  description: "Book a bridal or design consultation — in person in Nairobi or virtual from anywhere.",
};

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<{
    occasion: string;
    garmentType: string;
    eventDate: string;
    appointmentType: string;
    timeZone: string;
    preferredDate: string;
    preferredTime: string;
    inspiration: string;
    budget: string;
    message: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    referenceImage: File | null;
    referenceImageUrl: string;
  }>({
    occasion: "",
    garmentType: "",
    eventDate: "",
    appointmentType: "virtual",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferredDate: "",
    preferredTime: "",
    inspiration: "",
    budget: "",
    message: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    referenceImage: null as File | null,
    referenceImageUrl: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const totalSteps = 5;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    let referenceImageUrl = form.referenceImageUrl;
    if (form.referenceImage) {
      const file = form.referenceImage;
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
      if (!validTypes.includes(file.type)) {
        setUploadError("Please upload a JPEG, PNG, WebP, or HEIC image.");
        setSubmitting(false);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be under 5 MB.");
        setSubmitting(false);
        return;
      }
      referenceImageUrl = URL.createObjectURL(file);
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          referenceImage: undefined,
          referenceImageUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Submission failed.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Could not submit. Please try again.");
      setSubmitting(false);
    }
  };

  const STEP_TITLES = [
    "Your occasion",
    "Your event date",
    "Where and when",
    "Your vision",
    "Your details",
  ];
  const STEP_SUBTITLES = [
    "Which ceremony are we designing for?",
    "When is your big day?",
    "Nairobi studio or virtual consultation — and your time zone.",
    "Tell us about the design you have in mind.",
    "Who should we contact?",
  ];

  return (
    <div className="flex-1">
      {submitted ? (
        <section className="section py-24">
          <div className="page-container max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-8 ring-4 ring-gold/20">
              <Play className="h-9 w-9 text-gold" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-espresso mb-4 tracking-tight">Thank you.</h1>
            <p className="text-espresso/60 text-lg leading-relaxed mb-12 max-w-md mx-auto">
              Your consultation request has been received. The Gingerly atelier will review your
              details and respond within two business days. Your appointment is not confirmed until
              we reply — we&apos;ll suggest available slots and confirm the time in your time zone
              and Nairobi time.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left mb-16">
              <div className="flex items-center gap-3 text-espresso/70 text-sm">
                <Mail className="h-4 w-4 text-espresso" /> You&apos;ll receive an email confirmation.
              </div>
              <div className="flex items-center gap-3 text-espresso/70 text-sm">
                <Phone className="h-4 w-4 text-espresso" /> WhatsApp confirmation follows.
              </div>
            </div>
            <Button variant="gold" className="gold-foil w-auto" asChild onClick={() => { setSubmitted(false); setStep(1); setForm({ ...form, occasion: "", garmentType: "" }); }}>
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="section pt-0">
          <div className="page-container max-w-4xl mx-auto">
            {/* Animated progress steps */}
            <nav className="flex items-center justify-between mb-10 text-[9px] text-espresso/40 uppercase tracking-widest font-medium">
              {[1, 2, 3, 4, 5].map((n, i) => (
                <div key={n} className="flex flex-col items-center relative group">
                  {n < 5 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full h-px bg-espresso/10 z-0" />
                  )}
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold relative z-10 transition-all duration-300",
                    step > n ? "bg-gold text-espresso border-gold shadow-lg ring-4 ring-gold/20" : step === n ? "bg-espresso text-ivory border-espresso" : "border-espresso/20 text-espresso/40")}>
                    {n}
                  </div>
                  <span className="mt-1 text-center leading-none text-[9px] {step > n ? 'text-espresso font-medium' : 'text-espresso/40'}">{n < 5 ? n === 1 ? 'Occasion' : n === 2 ? 'Date' : n === 3 ? 'Where' : 'Details' : n === 5 ? 'Details' : ''}</span>
                </div>
              ))}
            </nav>

            <Card className="bg-surface shadow-sm shadow-atelier-lg">
              <div className="p-10 md:p-14">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-2 tracking-tight">{STEP_TITLES[step - 1]}</h2>
                    <p className="text-espresso/60 text-sm leading-relaxed">{STEP_SUBTITLES[step - 1]}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold">
                    {step}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 pt-6">
                  {error && (
                    <div className="rounded-xl border border-clay/30 bg-clay/10 p-5 text-clay text-sm leading-relaxed flex items-start gap-3">
                      <span className="text-clay">⚠</span>
                      <span>{error}</span>
                    </div>
                  )}
                  {uploadError && (
                    <div className="rounded-xl border border-clay/30 bg-clay/10 p-5 text-clay text-sm leading-relaxed flex items-start gap-3">
                      <span className="text-clay">⚠</span>
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {OCCASIONS.map((o) => {
                          const selected = form.occasion === o.value;
                          return (
                            <button
                              key={o.value}
                              type="button"
                              onClick={() => setForm({ ...form, occasion: o.value, garmentType: "" })}
                              className={cn("flex flex-col items-center gap-2 p-5 rounded-xl border transition-all duration-300 hover:border-gold/40",
                                selected
                                  ? "bg-gold/10 border-gold text-espresso shadow-lg ring-2 ring-gold/20"
                                  : "border-espresso/10 bg-ivory text-espresso/70")}
                              aria-pressed={selected}
                            >
                              <div className="w-12 h-12 rounded-xl border border-espresso/20 flex items-center justify-center mb-2 bg-espresso/5 group-hover:border-gold/40 transition-colors">
                                <span className="text-xs font-medium">{o.label.charAt(0)}</span>
                              </div>
                              <span className="text-xs font-medium">{o.label}</span>
                              <span className="text-[10px] text-espresso/40 leading-none">{o.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-8">
                        <Label>Garment type</Label>
                        <div className="mt-3 grid sm:grid-cols-3 gap-2">
                          {GARMENT_TYPES.map((g) => {
                            const selected = form.garmentType === g.value;
                            return (
                              <button
                                key={g.value}
                                type="button"
                                onClick={() => setForm({ ...form, garmentType: g.value })}
                                className={cn("py-3 rounded-xl border text-sm transition-all duration-300 hover:border-gold/40",
                                  selected
                                    ? "bg-gold text-espresso border-gold font-semibold shadow-lg ring-2 ring-gold/20"
                                    : "border-espresso/10 bg-ivory text-espresso/70")}
                              >
                                {g.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {form.occasion && !form.garmentType && (
                        <p className="mt-4 text-xs text-clay italic">Please select a garment type to continue.</p>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Label>Event date</Label>
                      <div className="mt-3 relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso/40" />
                        <input
                          type="date"
                          value={form.eventDate}
                          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                          className="w-full h-12 rounded-xl pl-10 pr-4 border border-border bg-surface text-ink placeholder:text-muted-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
                        />
                      </div>
                      {form.eventDate && (
                        <>
                          {(() => {
                            const w = weeksUntil(form.eventDate);
                            const isSoon = w !== null && w < 8;
                            const colorClass = isSoon ? "text-clay" : "text-savanna";
                            const text = w === null
                              ? "Please select a date."
                              : isSoon
                                ? `Approximately ${w} week(s) away — we&apos;ll flag this to the atelier for timeline planning.`
                                : `Approximately ${w} week(s) away.`;
                            return (
                              <p className={`mt-4 text-sm font-medium leading-relaxed ${colorClass}`}>
                                {text}
                              </p>
                            );
                          })()}
                        </>
                      )}
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <Label>Consultation type</Label>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        {[
                          { value: "in_person", label: "In person", desc: "Nairobi studio", icon: <MapPin className="h-5 w-5" /> },
                          { value: "virtual", label: "Virtual", desc: "Worldwide", icon: <Play className="h-5 w-5" /> },
                        ].map((o) => {
                          const selected = form.appointmentType === o.value;
                          return (
                            <button
                              key={o.value}
                              type="button"
                              onClick={() => setForm({ ...form, appointmentType: o.value })}
                              className={cn("flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-300 hover:border-gold/40",
                                selected
                                  ? "bg-gold/10 border-gold text-espresso shadow-lg ring-2 ring-gold/20"
                                  : "border-espresso/10 bg-ivory text-espresso/70")}
                            >
                              <div className="w-10 h-10 rounded-full border border-espresso/20 flex items-center justify-center bg-espresso/5 group-hover:border-gold/40 transition-colors">
                                {o.icon}
                              </div>
                              <span className="text-sm font-medium">{o.label}</span>
                              <span className="text-[10px] text-espresso/40">{o.desc}</span>
                            </button>
                          );
                        })}
                      </div>

                      <Label className="mt-10">Your time zone</Label>
                      <p className="text-[10px] text-espresso/50 mb-3 uppercase tracking-widest font-medium">We&apos;ll show availability in your time zone and Nairobi time.</p>
                      <div className="mt-3 relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso/40" />
                        <input
                          type="text"
                          value={form.timeZone}
                          onChange={(e) => setForm({ ...form, timeZone: e.target.value })}
                          className="w-full h-12 rounded-xl pl-10 pr-4 border border-border bg-surface text-ink placeholder:text-muted-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
                          placeholder="e.g. Europe/London, Australia/Sydney, America/New_York"
                        />
                      </div>
                      <p className="mt-3 text-xs text-espresso/40">
                        Detected: {Intl.DateTimeFormat().resolvedOptions().timeZone} · Nairobi: Africa/Nairobi
                      </p>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <Label>Inspiration</Label>
                      <Textarea
                        value={form.inspiration}
                        onChange={(e) => setForm({ ...form, inspiration: e.target.value })}
                        placeholder="Pinterest links, photos, colours, fabrics, mood…"
                        className="min-h-[120px]"
                      />
                      <Label className="mt-10">Budget (optional)</Label>
                      <Input
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        placeholder="e.g. KES 150,000–250,000"
                      />
                      <Label className="mt-10">Reference image (optional)</Label>
                      <p className="text-xs text-espresso/50 mb-3 uppercase tracking-widest font-medium">JPEG, PNG, WebP, HEIC — under 5 MB. Stored privately; only the atelier can access it.</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setForm({ ...form, referenceImage: e.target.files[0], referenceImageUrl: "" });
                        }}
                        className="block w-full text-sm text-espresso file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gold file:text-espresso hover:file:bg-gold-dark transition-all duration-200"
                      />
                      {form.referenceImage && (
                        <p className="mt-3 text-xs text-savanna">{form.referenceImage.name} ({Math.round(form.referenceImage.size / 1024)} KB)</p>
                      )}
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Full name</Label>
                          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6 mt-6">
                        <div>
                          <Label>Phone</Label>
                          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div>
                          <Label>Country</Label>
                          <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                        </div>
                      </div>
                      <Label className="mt-10">Preferred date and time</Label>
                      <div className="mt-3 grid sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <CalendarIcon />
                          <input
                            type="datetime-local"
                            value={form.preferredDate}
                            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                            className="w-full h-12 rounded-xl pl-10 pr-4 border border-border bg-surface text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
                          />
                        </div>
                        <Input value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} placeholder="e.g. 10:00 AM" />
                      </div>
                      <Label className="mt-10">Anything else we should know?</Label>
                      <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Any special requests, cultural considerations, or ideas…" />
                      <p className="mt-3 text-xs text-espresso/50 italic">
                        This is a request. The appointment is confirmed once the atelier replies with available slots.
                      </p>
                    </>
                  )}
                </form>

                <div className="mt-14 flex justify-between items-center pt-10 border-t border-border">
                  {step > 1 && (
                    <Button variant="outline" onClick={(e) => { e.preventDefault(); back(); }} className="w-auto" asChild>
                      <Link href="#" onClick={(e) => { e.preventDefault(); back(); }}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Link>
                    </Button>
                  )}
                  <Button variant="gold" disabled={submitting} className="w-auto gold-foil" type={step < totalSteps ? "button" : "submit"} onClick={(e) => { if (step < totalSteps) { e.preventDefault(); next(); } }}>
                    {step < totalSteps ? "Next step" : "Submit request"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-8 text-[10px] text-espresso/40 uppercase tracking-widest">
                  <span>Step {step} of {totalSteps}</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
