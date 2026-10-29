export const metadata = {
  title: "Process",
  description: "How a commission works at Gingerly Designs and Fabrics — from consultation to delivery.",
};

export default function ProcessPage() {
  const STEPS = [
    { n: "01", t: "Consultation", d: "Book in person in Nairobi or virtual from anywhere. We discuss your occasion, vision, fabrics, and budget." },
    { n: "02", t: "Design", d: "Mood boards, sketches, and fabric selections are shared for your feedback before anything is cut." },
    { n: "03", t: "Measurements", d: "Guided self-measurement at home, or in-studio fitting. We review measurements together." },
    { n: "04", t: "Production", d: "Your garment is made individually, with progress photos and fit checkpoints along the way." },
    { n: "05", t: "Fitting & delivery", d: "Final fitting, adjustments, and delivery — in studio or shipped worldwide with tracking." },
  ];

  return (
    <div className="flex-1">
      <section className="section pt-0">
        <div className="page-container">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-4 tracking-tight">How a commission works</h1>
          <p className="text-muted text-lg max-w-2xl mb-16 leading-relaxed">
            Timelines, deposits, and turnaround are confirmed by the atelier and are marked below for
            owner review. Each commission is individual.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="p-8 rounded-[1.75rem] border border-border bg-ivory group hover:border-gold-soft transition-all duration-300" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-5 font-serif font-bold text-gold shadow-sm group-hover:shadow-gold/20 transition-all duration-300">
                  {step.n}
                </div>
                <h3 className="font-serif font-semibold text-ink text-xl mb-3">{step.t}</h3>
                <p className="text-sm text-espresso/70 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-border">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-6 tracking-tight">Timelines & deposits</h2>
            <p className="text-espresso/60 text-sm mb-10 max-w-xl leading-relaxed">
              Turnaround depends on the ceremony, fabric availability, and the atelier&apos;s schedule.
              Deposit amounts and payment milestones are confirmed at consultation. These figures are
              not yet configured — please check with the atelier before relying on them.
            </p>
            <div className="rounded-[1.75rem] border border-espresso/10 bg-ivory p-8 md:p-12">
              <p className="text-[10px] text-espresso/50 uppercase tracking-widest font-medium mb-5">To be confirmed by the atelier</p>
              <ul className="space-y-3 text-sm text-espresso/70 leading-relaxed">
                <li>Typical commission lead time — to be confirmed.</li>
                <li>Deposit amount — to be confirmed.</li>
                <li>Payment milestones — to be confirmed.</li>
                <li>Rush timelines — to be confirmed.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
