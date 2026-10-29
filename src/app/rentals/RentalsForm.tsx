"use client";

import Link from "next/link";
import { useState } from "react";
import { Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RentalsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex-1">
        <section className="section py-24">
          <div className="page-container max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
              <Truck className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-4 tracking-tight">Enquiry received.</h1>
            <p className="text-espresso/60 leading-relaxed mb-10">
              Thank you. The atelier will confirm availability, sizes, terms, and deposit for the
              items you&apos;re interested in. Rental availability is owner-managed \u2014 we don&apos;t
              publish live stock, so nothing is guaranteed until we reply.
            </p>
            <Button variant="gold" className="gold-foil" asChild onClick={() => setSubmitted(false)}>
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <section className="section pt-0">
        <div className="page-container max-w-3xl mx-auto">
          <div className="mb-14">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-4 tracking-tight">Rentals</h1>
            <p className="text-espresso/60 leading-relaxed max-w-2xl">
              Borrowed elegance for your occasion. Rental enquiries are welcome for bridal and
              occasion wear. Availability, sizes, deposit, and care terms are confirmed by the
              atelier \u2014 we do not publish live inventory or invent prices.
            </p>
          </div>

          <Card className="bg-espresso/5 border-espresso/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-6">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { n: "01", t: "Enquire", d: "Tell us the occasion, date, and sizes you need." },
                { n: "02", t: "Confirm", d: "The atelier checks availability and replies with options." },
                { n: "03", t: "Reserve", d: "Pay a deposit to hold your item. Try-on by appointment." },
              ].map((s, i) => (
                <div key={s.n} className="flex flex-col items-center text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center mb-4 font-serif font-bold text-gold shadow-sm">
                    {s.n}
                  </div>
                  <h4 className="font-serif font-semibold text-espresso mb-2">{s.t}</h4>
                  <p className="text-xs text-espresso/60 text-center">{s.d}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl border border-clay/30 bg-clay/10 p-4 text-clay text-sm">{error}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label>Full name</Label>
                  <Input value="" onChange={() => {}} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value="" onChange={() => {}} />
                </div>
              </div>
              <div>
                <Label>Occasion</Label>
                <Input value="" onChange={() => {}} placeholder="e.g. Ruracio, white wedding, prom" />
              </div>
              <div>
                <Label>Event date</Label>
                <Input type="date" value="" onChange={() => {}} />
              </div>
              <div>
                <Label>Sizes needed (if known)</Label>
                <Input value="" onChange={() => {}} placeholder="e.g. 36, 38, 40" />
              </div>
              <div>
                <Label>Items of interest</Label>
                <Textarea value="" onChange={() => {}} rows={3} placeholder="e.g. bridal gown, bridesmaid dresses, Senator suit" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea value="" onChange={() => {}} rows={3} placeholder="Anything else we should know?" />
              </div>
              <p className="text-xs text-espresso/50">
                Deposit, rental fee, dates, and care terms are confirmed by the atelier before any payment.
              </p>
              <Button variant="gold" disabled={submitting} className="w-full gold-foil">
                {submitting ? "Sending\u2026" : "Send enquiry"}
              </Button>
            </form>
          </Card>

          <div className="mt-12 flex items-center gap-3 text-sm text-espresso/60">
            <ShieldCheck className="h-4 w-4" />
            <span>Rental enquiries are handled privately \u2014 your details are not shared with any third party.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
