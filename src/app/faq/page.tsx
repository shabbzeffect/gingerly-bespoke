export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about commissions, fittings, rentals, and virtual consultations.",
};

const FAQS = [
  {
    q: "How do I start a commission?",
    a: "Book a consultation — in person in Nairobi or virtual from anywhere. Share your occasion, inspiration, and measurements so we can design something individual to you.",
  },
  {
    q: "Can I book a virtual consultation from the UK or Australia?",
    a: "Yes. Virtual consultations are available worldwide and we display times in your local time zone as well as Nairobi time.",
  },
  {
    q: "Do you offer rentals?",
    a: "Rental enquiries are welcome. Contact the atelier to confirm current availability, terms, and deposit — rental inventory is owner-managed and not published as live stock.",
  },
  {
    q: "Are the garments pictured available to buy?",
    a: "No. Images show examples of the atelier&apos;s work. Designs, fit, and quotes are individual; nothing is sold off the rack.",
  },
  {
    q: "What fabrics do you use?",
    a: "Lace, Ankara, beadwork, rhinestones, cowrie shells, and textured fabrics. The full list is confirmed by the atelier and shared during your consultation.",
  },
  {
    q: "Is my measurement data private?",
    a: "Yes. Measurements and photos are stored privately and only accessible to you and the design team. We do not share them with third parties.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex-1">
      <section className="section pt-0">
        <div className="page-container max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-2">Frequently asked questions</h1>
          <p className="text-espresso/60 text-lg max-w-2xl mb-12">
            Answers below reflect how the atelier generally works. Operational details (prices,
            timelines, policies) are configured by the owner and marked for review before launch.
          </p>

          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="border-b border-espresso/10 pb-6 last:border-0">
                <h3 className="font-serif font-semibold text-espresso text-lg mb-2">{q}</h3>
                <p className="text-espresso/70 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-espresso/10 bg-ivory p-8 md:p-12">
            <h3 className="font-serif font-semibold text-espresso mb-4">Still have a question?</h3>
            <p className="text-espresso/60 text-sm mb-6">Contact the atelier directly — details on the contact page.</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-gold font-medium hover:underline">
              Contact us →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
