import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SERVICES = [
  {
    id: "bridal",
    title: "Bridal & traditional gowns",
    occasion: "Ruracio · Nyombo · Koito · Bukhwi",
    desc: "Made-to-measure attire for traditional ceremonies, designed around your culture, your measurements, and your vision.",
    fabrics: ["Beadwork", "Cowrie shells", "Ankara", "Lace"],
    imageLabel: "Traditional gown",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_d9fccdffea204786b368091d449bd7e1.jpg",
    includes: ["Consultation", "Mood board", "Fabric sourcing", "Two fittings", "Final delivery"],
  },
  {
    id: "white-wedding",
    title: "White wedding & bridal gowns",
    occasion: "Cathedral veils · Lace · Trains",
    desc: "Classic and contemporary white wedding gowns, with full-length trains, lace bodices, and hand-applied embellishment.",
    fabrics: ["Lace", "Tulle", "Rhinestones", "Beadwork"],
    imageLabel: "White wedding gown",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_daa9eb3f2e464b38900b4d6f73b7eece.jpg",
    includes: ["Consultation", "Sketch approval", "Lace selection", "Bustle fitting", "Preservation box"],
  },
  {
    id: "bridesmaid",
    title: "Bridesmaids & wedding guests",
    occasion: "Coordinated squad looks · Ankara sets",
    desc: "Coordinated bridesmaid and guest attire in matching or complementary palettes, from Ankara sets to lace dresses.",
    fabrics: ["Ankara", "Lace", "Chiffon"],
    imageLabel: "Bridesmaid dresses",
    imageSrc: "/gingerly-images/gracembote_ed10d66f181948b59204ea72f96daa51.jpg",
    includes: ["Group consultation", "Color palette", "Size range", "Bulk ordering", "Delivery coordination"],
  },
  {
    id: "occasion",
    title: "Prom · birthday · anniversary · guest",
    occasion: "Evening occasion wear",
    desc: "Occasion wear for prom, birthday photoshoots, anniversaries, and wedding guests — elegant, individual, and made to order.",
    fabrics: ["Lace", "Ankara", "Satin"],
    imageLabel: "Occasion wear",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_06f82de6265f44939e59d4c65d28dd57.jpg",
    includes: ["Consultation", "Sketch", "Fabric choice", "Single fitting", "Express delivery"],
  },
  {
    id: "menswear",
    title: "Menswear & Senator suits",
    occasion: "Tailored grooms & groomsmen",
    desc: "Bespoke Senator suits and tailored menswear for grooms, groomsmen, and formal occasions.",
    fabrics: ["Linen", "Worsted wool", "Ankara accents"],
    imageLabel: "Senator suit",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_2e9528e2542a405dbb6dbee0e19082ab.jpg",
    includes: ["Consultation", "Measurements", "Fabric sourcing", "Fitting", "Alterations"],
  },
];

const FABRICS = [
  { name: "Lace", note: "For bodices, veils, and overlays." },
  { name: "Ankara", note: "Vibrant wax prints for ceremony and occasion wear." },
  { name: "Beadwork", note: "Hand-applied embellishment for traditional attire." },
  { name: "Rhinestones", note: "Sparkle for evening and bridal looks." },
  { name: "Cowrie shells", note: "Symbolic accents rooted in coastal tradition." },
  { name: "Sisal textures", note: "Earthy, tactile detailing." },
];

export const metadata = {
  title: "Bespoke Services",
  description: "Custom bridal, traditional, occasion, and menswear from Gingerly Designs and Fabrics, Nairobi.",
};

export default function ServicesPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-espresso">
        <div className="absolute inset-0 z-0">
          <PlaceholderImage
            src="/gingerly-images/gingerlydesignsandfabrics_fd2bfcaaf02349b58edd546ce738b266.jpg"
            alt="Atelier bridal collection hero"
            label="services hero"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-espresso/30" />
        </div>
        <div className="relative z-10 page-container h-full flex flex-col justify-center pt-10 pb-12 md:pt-16 md:pb-20">
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-wide uppercase">
            Bespoke Services
          </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-ivory tracking-tight mb-6">
            Made for you<span className="block text-gold italic"> · Nothing off the rack</span>
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mb-10">
            Every garment is individual — drawn from your story, your ceremony, your measurements.
            From traditional ceremonies to white weddings, we design with you, not for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Button variant="gold" size="large" className="gold-foil" asChild>
              <Link href="/book">Book a consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="large" asChild>
              <Link href="/lookbook">Explore the lookbook <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-tight mb-2">
                Our services
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                Choose your ceremony. We handle everything from sketch to delivery.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Card
                key={s.id}
                className="group cursor-pointer border-border hover:border-gold-soft hover:shadow-atelier transition-all duration-300"
              >
                <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-border bg-espresso/5 mb-5 group-hover:border-gold-soft transition-all duration-500 image-frame">
                  <PlaceholderImage src={s.imageSrc} alt={`${s.imageLabel} (sample)`} label={s.imageLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-serif font-semibold text-ink text-xl mb-2 tracking-tight group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold font-medium mb-3">{s.occasion}</p>
                <p className="text-muted text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.fabrics.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded border border-border text-[10px] text-muted-soft uppercase tracking-wider group-hover:border-gold/40 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50 space-y-1">
                  {s.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-espresso/60">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      {inc}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fabrics & details */}
      <section className="section bg-ivory/30">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-14 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-tight mb-2">
                Fabrics & details
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                We work with the materials below. The full fabric library is available in the atelier;
                macro photography and swatches can be shared during your consultation.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FABRICS.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-3 p-6 rounded-[1.5rem] border border-border bg-surface group hover:border-gold-soft transition-all duration-300"
              >
                <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold text-xs group-hover:bg-gold group-hover:text-espresso transition-colors">
                  •
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{f.name}</div>
                  <div className="text-xs text-muted">{f.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to commission */}
      <section className="section">
        <div className="page-container">
          <div className="soft-panel rounded-[1.75rem] p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-tight mb-4">
                  How to commission
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-8 max-w-xl">
                  Designs, fit, and quotes are individual. Nothing pictured is guaranteed to be
                  available to buy — each garment is made for you after a consultation. Prices are
                  confirmed by the atelier and are not published here.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="medium" className="gold-foil" asChild>
                  <Link href="/book">Book a consultation</Link>
                </Button>
                <Button variant="outline" size="medium" asChild>
                  <Link href="/virtual-fittings">Virtual consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
