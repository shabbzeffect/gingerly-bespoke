"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const CONTACT_DETAILS = [
  { icon: <MapPin className="h-5 w-5" />, label: "Studio", value: "Nairobi, Kenya \u2014 by appointment" },
  { icon: <Phone className="h-5 w-5" />, label: "WhatsApp", value: "Enquiries & bookings (configured by the atelier)" },
  { icon: <Mail className="h-5 w-5" />, label: "Email", value: "Atelier enquiries (configured by the atelier)" },
  { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "By appointment" },
];

export function ContactForm() {
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-8 ring-4 ring-gold/20">
              <ShieldCheck className="h-9 w-9 text-gold" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-espresso mb-4 tracking-tight">Message sent.</h1>
            <p className="text-espresso/60 text-lg leading-relaxed mb-12 max-w-md mx-auto">
              Thank you for reaching out. The Gingerly atelier will review your message and reply
              as soon as possible.
            </p>
            <Button variant="gold" className="gold-foil w-auto" asChild onClick={() => setSubmitted(false)}>
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-espresso">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-espresso/30" />
        </div>
        <div className="relative z-10 page-container h-full flex flex-col justify-center pt-10 pb-12 md:pt-16 md:pb-20">
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-wide uppercase">
            Contact
          </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-ivory tracking-tight mb-6">
            Get in touch<span className="block text-gold italic"> with the atelier</span>
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mb-10">
            For consultation bookings, virtual fitting enquiries, rental questions, or anything
            else \u2014 we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Form column */}
            <Card className="p-10 md:p-14 rounded-[1.75rem] shadow-sm">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-6 tracking-tight">Send us a message</h2>
              <p className="text-espresso/60 text-lg mb-10 leading-relaxed">
                Complete the form below and we&apos;ll get back to you within two business days.
                All enquiries are handled privately by the design team.
              </p>
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="rounded-xl border border-clay/30 bg-clay/10 p-5 text-clay text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-clay">⚠</span>
                    <span>{error}</span>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-6">
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
                  <Label>How can we help?</Label>
                  <Textarea value="" onChange={() => {}} rows={4} placeholder="Your questions, dates, and ideas\u2026" />
                </div>
                <p className="text-[10px] text-espresso/50 uppercase tracking-widest font-medium mb-1">
                  Submitting this form is an enquiry, not a confirmed booking. We&apos;ll reply with next steps.
                </p>
                <Button variant="gold" disabled={submitting} className="w-full gold-foil">
                  {submitting ? "Sending\u2026" : "Send message"}
                </Button>
              </form>
            </Card>

            {/* Details column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-6 tracking-tight">Contact details</h2>
                <p className="text-espresso/60 text-lg mb-8">
                  WhatsApp, email, and Instagram are our preferred channels. All details below are
                  configured by the atelier.
                </p>
              </div>
              <div className="space-y-5">
                {CONTACT_DETAILS.map((c, i) => (
                  <Card key={i} className="p-6 flex items-start gap-4 border-border hover:border-gold-soft transition-all duration-300 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-espresso transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-gold/70 font-medium">{c.label}</div>
                      <div className="text-sm font-medium text-espresso">{c.value}</div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="pt-8 border-t border-border">
                <p className="text-[10px] text-espresso/50 leading-relaxed">
                  All contact details above are configured by the atelier and must be supplied before
                  launch. WhatsApp, email, and Instagram are the preferred channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
