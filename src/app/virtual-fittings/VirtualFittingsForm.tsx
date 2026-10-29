"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Play, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const STEPS = [
  { n: "01", title: "Consultation", desc: "Book a virtual consultation — we discuss your occasion, vision, and fabrics." },
  { n: "02", title: "Measurement guide", desc: "Measure at home using our illustrated guide. We review your measurements together on the call." },
  { n: "03", title: "Design discussion", desc: "Sketches, mood boards, and fabric swatches shared privately in your client portal." },
  { n: "04", title: "Fit review", desc: "Progress photos and virtual fit checkpoints before the garment is finished." },
  { n: "05", title: "Delivery", desc: "Your gown is finished, checked, and shipped worldwide with tracking." },
];

const MEASUREMENT_FIELDS = [
  { key: "bust", label: "Bust / chest", unit: "cm", hint: "Fullest part, tape level." },
  { key: "waist", label: "Natural waist", unit: "cm", hint: "Narrowest part of your torso." },
  { key: "hips", label: "Hips", unit: "cm", hint: "Fullest part, about 20 cm below waist." },
  { key: "height", label: "Height", unit: "cm", hint: "Barefoot, against a wall." },
  { key: "shoulderToWaist", label: "Shoulder to waist", unit: "cm", hint: "From neck point down to waist." },
  { key: "shoulderToFloor", label: "Shoulder to floor", unit: "cm", hint: "For gown length planning." },
  { key: "armLength", label: "Arm length", unit: "cm", hint: "Shoulder bone to wrist." },
];

export function VirtualFittingsForm() {
  const [step, setStep] = useState(1);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));

  return (
    <div className="flex-1">
      {!submitted ? (
        <section className="section pt-0">
          <div className="page-container max-w-5xl mx-auto">
            <div className="mb-14">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold text-espresso mb-4 tracking-tight">Virtual fittings</h1>
              <p className="text-espresso/60 text-lg leading-relaxed max-w-2xl">
                Based in Nairobi, dressing brides worldwide. Our virtual fitting process is human-led — consultation, measurement guidance, design discussion, fit review, and follow-up. We never promise that remote measurements guarantee a perfect fit; instead, we review them together and adjust.
              </p>
            </div>

            <nav className="flex items-center justify-between mb-12 text-[9px] text-espresso/40 uppercase tracking-widest font-medium">
              {STEPS.map((s, i) => {
                const isDone = step > i + 1;
                const isActive = step === i + 1;
                const stepClass = cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold relative z-10 transition-all duration-300",
                  isDone ? "bg-gold text-espresso border-gold shadow-lg ring-4 ring-gold/20" : isActive ? "bg-espresso text-ivory border-espresso" : "border-espresso/20 text-espresso/40");
                const titleClass = cn("mt-1 text-center leading-none text-[9px]", isDone ? "text-espresso font-medium" : "text-espresso/40");
                return (
                  <div key={s.n} className="flex flex-col items-center relative group">
                    {i < STEPS.length - 1 && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full h-px bg-espresso/10 z-0" />
                    )}
                    <div className={stepClass}>{s.n.charAt(0)}</div>
                    <span className={titleClass}>{s.title}</span>
                  </div>
                );
              })}
            </nav>

            <Card className="bg-surface shadow-sm shadow-atelier-lg">
              <div className="p-10 md:p-14">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-2 tracking-tight">{STEPS[step - 1].title}</h2>
                    <p className="text-espresso/60 text-sm leading-relaxed">{STEPS[step - 1].desc}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold">{step}</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 pt-6">
                  {error && (
                    <div className="rounded-xl border border-clay/30 bg-clay/10 p-5 text-clay text-sm leading-relaxed flex items-start gap-3">
                      <span className="text-clay">⚠</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="text-center mb-12">
                      <MapPin className="h-8 w-8 text-espresso mb-4" />
                      <h3 className="text-xl font-serif font-semibold text-espresso mb-2">Book your consultation</h3>
                      <p className="text-espresso/60 leading-relaxed max-w-lg mx-auto">
                        Schedule a virtual consultation — we&apos;ll discuss your occasion, vision, fabrics, and measurement process together.
                      </p>
                      <Button variant="gold" className="w-full gold-foil mt-6" asChild>
                        <Link href="/book">Book a Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-14">
                        <Card>
                          <div className="p-8">
                            <h3 className="text-xl font-serif font-semibold text-espresso mb-6">Measurement guide</h3>
                            <p className="text-espresso/70 leading-relaxed mb-8">
                              Download our illustrated measurement sheet and take your measurements at home. We&apos;ll walk through them together on your consultation call. All fields are optional — provide what you can comfortably measure.
                            </p>
                            <Button variant="outline" className="w-full mb-8 flex items-center justify-center gap-2" asChild>
                              <Link href="#">Download measurement sheet (PDF)</Link>
                            </Button>
                            <div className="space-y-3">
                              {MEASUREMENT_FIELDS.map((f) => (
                                <div key={f.key} className="flex justify-between items-center p-4 rounded-xl border border-border bg-ivory">
                                  <div>
                                    <div className="text-sm font-medium text-espresso">{f.label}</div>
                                    <div className="text-xs text-espresso/50">{f.hint}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      value={measurements[f.key] || ""}
                                      onChange={(e) => setMeasurements({ ...measurements, [f.key]: e.target.value })}
                                      placeholder={f.unit}
                                      className="w-20 h-10 rounded-xl border border-border bg-surface text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
                                    />
                                    <span className="text-xs text-espresso/40">{f.unit}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                        <Card>
                          <div className="p-8">
                            <h3 className="text-xl font-serif font-semibold text-espresso mb-6">What to expect</h3>
                            <ul className="space-y-4">
                              {[
                                { t: "Book your consultation", d: "We discuss your occasion, vision, and fabric choices." },
                                { t: "Measure at home together", d: "Take your measurements while we guide you on video." },
                                { t: "Review on the call", d: "We review your measurements together and flag any adjustments." },
                                { t: "Adjust & confirm", d: "Final measurements confirmed before production begins." },
                              ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-espresso/70 leading-relaxed">
                                  <Camera className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="text-sm font-medium text-espresso">{item.t}</div>
                                    <div className="text-xs text-espresso/50 mt-1">{item.d}</div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-14">
                        <Card>
                          <div className="p-8">
                            <h3 className="text-xl font-serif font-semibold text-espresso mb-6">Design discussion</h3>
                            <p className="text-espresso/70 leading-relaxed mb-6">
                              Sketches, mood boards, and fabric swatches are shared privately in your client portal before anything is cut.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Play className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="text-sm font-medium text-espresso">Private client portal</div>
                                  <div className="text-xs text-espresso/50">Sketches and mood boards shared securely.</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Camera className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="text-sm font-medium text-espresso">Fabric swatches</div>
                                  <div className="text-xs text-espresso/50">Physical swatches mailed for your approval.</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="text-sm font-medium text-espresso">Video call review</div>
                                  <div className="text-xs text-espresso/50">Discuss designs together on your call.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                        <Card className="bg-espresso/5 border-espresso/10">
                          <div className="p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                              <Play className="h-8 w-8 text-gold" />
                            </div>
                            <h3 className="font-serif font-semibold text-espresso mb-3">Schedule design call</h3>
                            <p className="text-espresso/60 text-sm mb-6">Ready to discuss your design? Book a virtual design discussion.</p>
                            <Button variant="gold" className="w-full gold-foil" asChild>
                              <Link href="/book">Book consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-14">
                        <Card>
                          <div className="p-8">
                            <h3 className="text-xl font-serif font-semibold text-espresso mb-6">Fit review</h3>
                            <p className="text-espresso/70 leading-relaxed mb-6">Progress photos and virtual fit checkpoints before the garment is finished.</p>
                            <ul className="space-y-4 text-espresso/70 text-sm">
                              {[
                                { t: "Progress photos", d: "Shared at key production milestones." },
                                { t: "Virtual fit checkpoints", d: "Review fit together on video calls." },
                                { t: "Final approval", d: "Confirm fit before shipping." },
                              ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-espresso/70 text-sm">
                                  <Camera className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="text-sm font-medium text-espresso">{item.t}</div>
                                    <div className="text-xs text-espresso/50">{item.d}</div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                        <Card className="bg-espresso/5 border-espresso/10">
                          <div className="p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                              <ShieldCheck className="h-8 w-8 text-gold" />
                            </div>
                            <h3 className="font-serif font-semibold text-espresso mb-3">Ready to proceed?</h3>
                            <p className="text-espresso/60 text-sm mb-6">Your measurements are ready. Move to delivery details.</p>
                            <Button variant="gold" className="w-full gold-foil" onClick={() => nextStep()}>
                              Continue to delivery <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-14">
                        <Card>
                          <div className="p-8">
                            <h3 className="text-xl font-serif font-semibold text-espresso mb-6">Submit your details</h3>
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
                                <Label>Reference photos (optional)</Label>
                                <p className="text-xs text-espresso/50 mb-3 uppercase tracking-widest font-medium">Front, side, and back — well lit, plain background. Stored privately.</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => setFiles(e.target.files)}
                                  className="block w-full text-sm text-espresso file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gold file:text-espresso hover:file:bg-gold-dark transition-all duration-200"
                                />
                                {files && files.length > 0 && (
                                  <p className="mt-3 text-xs text-savanna">{files.length} photo(s) selected</p>
                                )}
                              </div>
                              <div>
                                <Label>Message to the atelier</Label>
                                <Textarea value="" onChange={() => {}} rows={3} placeholder="Your occasion, event date, and any questions…" />
                              </div>
                              <p className="text-xs text-espresso/50 italic">
                                Your measurements and photos are stored privately and are only accessible to you and the design team. Not shared with any third party.
                              </p>
                              <Button variant="gold" disabled={submitting} className="w-full gold-foil">
                                {submitting ? "Submitting…" : "Send to the atelier"}
                              </Button>
                            </form>
                          </div>
                        </Card>
                        <Card className="bg-espresso/5 border-espresso/10 p-8 md:p-12">
                          <div className="flex items-start gap-4 mb-8">
                            <ShieldCheck className="h-5 w-5 text-gold mt-0.5" />
                            <div>
                              <h3 className="font-serif font-semibold text-espresso">Privacy by design</h3>
                              <p className="text-espresso/60 text-sm leading-relaxed">
                                Body measurements, event details, and personal photos are sensitive. We collect only what&apos;s needed, obtain your consent, restrict access to the design team, and retain data per the atelier&apos;s approved retention process.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-espresso/60">
                            <Clock className="h-4 w-4" />
                            <span>Virtual consultations are shown in your time zone and Nairobi time.</span>
                          </div>
                        </Card>
                      </div>
                    </>
                  )}

                  <div className="mt-14 flex justify-between items-center pt-10 border-t border-border">
                    {step > 1 && step < STEPS.length && (
                      <Button variant="outline" onClick={() => setStep(step - 1)} className="w-auto" asChild>
                        <Link href="#" onClick={(e) => { e.preventDefault(); setStep(step - 1); }}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Link>
                      </Button>
                    )}
                    {step === STEPS.length && (
                      <Button variant="outline" onClick={() => setStep(1)} className="w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Start over
                      </Button>
                    )}
                    {step < STEPS.length && (
                      <Button variant="gold" className="w-auto gold-foil" onClick={() => nextStep()}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-8 text-[10px] text-espresso/40 uppercase tracking-widest">
                    <span>Step {step} of {STEPS.length}</span>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </section>
      ) : (
        <section className="section py-24">
          <div className="page-container max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-8 ring-4 ring-gold/20">
              <ShieldCheck className="h-9 w-9 text-gold" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-espresso mb-4 tracking-tight">Sent securely.</h1>
            <p className="text-espresso/60 text-lg leading-relaxed mb-12 max-w-md mx-auto">
              Your measurements and photos have been received by the design team. We&apos;ll be in touch to schedule your virtual consultation, in your time zone.
            </p>
            <Button variant="gold" className="gold-foil w-auto" asChild onClick={() => { setSubmitted(false); setMeasurements({}); setFiles(null); setStep(1); }}>
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}



