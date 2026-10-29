"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { OCCASIONS } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-espresso">
        <div className="absolute inset-0 z-0">
          <PlaceholderImage
            src="/gingerly-images/gingerlydesignsandfabrics_fec73383ee9341089a75de3dde9d3ac5.jpg"
            alt="Cinematic hero: bride in motion"
            label="hero"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />
        </div>
        <div className="relative z-10 page-container h-full flex flex-col pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
            <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-wide uppercase">
              Nairobi · Bespoke Bridal
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-ivory tracking-tight mb-6">
              Where Heritage<span className="block text-gold italic"> Meets Couture</span>
            </h1>
            <p className="text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mx-auto sm:mx-0 mb-10">
              A Nairobi atelier crafting custom attire for Ruracio, Nyombo, Koito, Bukhwi,
              white weddings, and occasion wear. Each design is individual — drawn from your story,
              your ceremony, your measurements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Button variant="gold" size="large" className="gold-foil" asChild>
                <Link href="/book">
                  Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="large" asChild>
                <Link href="/lookbook">
                  Explore the Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="large" asChild>
                <Link href="/virtual-fittings">
                  <Play className="mr-2 h-4 w-4" /> Virtual Fittings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Diaspora banner */}
      <section className="bg-gold text-espresso py-6 md:py-8 text-center border-b border-gold/30">
        <div className="page-container flex flex-col items-center justify-center gap-2 text-[10px] md:text-sm font-medium uppercase tracking-widest">
          <span className="text-xl">🌍</span>
          Based in Nairobi. Dressing brides in London, Sydney, and beyond.
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
          <div className="page-container grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-4">The atelier</h2>
            <p className="text-espresso/70 leading-relaxed mb-5">
              Gingerly Designs and Fabrics is a Nairobi-based bespoke fashion house. We create
              made-to-measure attire for life&apos;s most important ceremonies — from traditional
              introductions to white weddings — working with lace, Ankara, beadwork, rhinestones,
              cowrie shells, and textured fabrics.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-5">
              Every garment is individual. Designs, fit, and quotes are tailored to you rather than
              taken off a rack. We serve clients in Nairobi and through virtual consultations for the
              diaspora in the UK, Australia, and the USA.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-gold font-medium hover:underline tracking-wide">
              About the atelier <span className="text-gold">→</span>
            </Link>
          </div>
          <div className="relative">
            <div className="image-frame aspect-[4/5]">
              <PlaceholderImage
                src="/gingerly-images/gracembote_f82ff24839e24cd69f35dad724280e03.jpg"
                alt="Atelier workspace"
                label="atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute -inset-px bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] rounded-[1.75rem] -z-10 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section bg-ivory/30">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h2 className="text-h2 font-serif font-semibold text-ink tracking-tight">Collections by ceremony</h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">Each tradition has its own visual identity.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCCASIONS.map((occ, i) => {
              const occasionImages = [
                "/gingerly-images/gingerlydesignsandfabrics_06f82de6265f44939e59d4c65d28dd57.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_2e9528e2542a405dbb6dbee0e19082ab.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_3851b913c4424a82bf7c48e596441bb9.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_39fc264967254df28e6483a58d268641.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_5d6a46d9a84a4d6e91a4e24d5c514bc1.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_6d4ae594814f4acb819f06ce66a378e8.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_73bc19ef9f2e42ea96b93bd4a67c53f3.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_c0a5d3a6d01e43fc959826a3b6a35a27.jpg",
                "/gingerly-images/gingerlydesignsandfabrics_d742fab90e47415bb71c4609e9e07a7c.jpg",
              ];
              return (
                <div
                  key={occ.value}
                  className="group cursor-pointer"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <Card className="hover:border-gold-soft hover:shadow-atelier">
                    <Link href={`/lookbook/${occ.value}`}>
                      <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-border bg-espresso/5 group-hover:border-gold-soft transition-all duration-500 mb-5 image-frame">
                        <PlaceholderImage src={occasionImages[i] || occasionImages[0]} alt={`${occ.label} collection`} label={occ.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-ink group-hover:text-gold transition-colors leading-snug mb-2">{occ.label}</h3>
                        <p className="text-[10px] text-gold/70 uppercase tracking-widest font-medium">{occ.hint}</p>
                      </div>
                    </Link>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h2 className="text-h2 font-serif font-semibold text-ink tracking-tight">The craft</h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">Silhouette, fabric, embellishment, collaboration.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Silhouette", text: "Made-to-measure shapes that honour the body." },
              { title: "Fabric", text: "Lace, Ankara, tulle, and textured cloths." },
              { title: "Embellishment", text: "Beadwork, rhinestones, cowrie shells." },
              { title: "Collaboration", text: "Your vision, refined with the atelier." },
            ].map((item, i) => (
              <Card key={item.title} className="p-8 text-center border border-border hover:border-gold-soft transition-all duration-300" style={{ transitionDelay: `${i * 80}ms` }}>
                <h3 className="font-serif font-semibold text-ink mb-2 tracking-tight">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission process */}
      <section className="section bg-espresso text-ivory">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ivory">How a commission works</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { n: "01", t: "Consult", d: "In Nairobi or virtual, worldwide." },
              { n: "02", t: "Design", d: "Mood boards, sketches, fabric." },
              { n: "03", t: "Measure", d: "Guided self-measurement kit." },
              { n: "04", t: "Fit virtually", d: "Progress photos, checkpoints." },
              { n: "05", t: "Deliver", d: "Shipped worldwide with care." },
            ].map((step, i) => (
              <div key={step.n} className="relative flex flex-col items-center text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-4 font-serif font-bold text-gold shadow-sm hover:shadow-gold/20 transition-all duration-300">
                  {step.n}
                </div>
                <h4 className="font-serif font-semibold text-ivory mb-2">{step.t}</h4>
                <p className="text-xs text-ivory/60 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual fittings */}
      <section className="section">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-5">Virtual fittings for the diaspora</h2>
            <p className="text-espresso/70 leading-relaxed mb-10 max-w-lg mx-auto">
              Based in Nairobi, dressing brides worldwide. Consultation, measurement guidance,
              design discussion, fit review, and follow-up — all online, in your time zone.
            </p>
            <Button variant="gold" size="medium" className="gold-foil" asChild>
              <Link href="/virtual-fittings">Learn about virtual fittings <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured lookbook + CTA */}
      <section className="section bg-ivory/30">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-5">Featured work</h2>
              <p className="text-espresso/70 leading-relaxed mb-7">
                A selection from the atelier. Authentic brand photography from recent commissions.
              </p>
              <Link href="/lookbook" className="inline-flex items-center gap-2 text-gold font-medium hover:underline tracking-wide">
                View full lookbook <span className="text-gold">→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="image-frame aspect-[4/5] rounded-[1.5rem]">
                  <PlaceholderImage src="/gingerly-images/gingerlydesignsandfabrics_fd2bfcaaf02349b58edd546ce738b266.jpg" alt="Featured look 1" label="featured1" className="w-full h-full object-cover" />
                </div>
                <div className="image-frame aspect-[4/5] rounded-[1.5rem]">
                  <PlaceholderImage src="/gingerly-images/gingerlydesignsandfabrics_df9bf78d1cc84054872af897da797159.jpg" alt="Featured look 2" label="featured2" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="mt-6 p-7 rounded-[1.75rem] border border-espresso/10 bg-ivory soft-panel">
                <h3 className="font-serif font-semibold text-espresso mb-2">New: Ruracio collection</h3>
                <p className="text-espresso/60 text-sm leading-relaxed mb-4">
                  Hand-applied beadwork on earthy Ankara. Available for bespoke commission.
                </p>
                <Link href="/lookbook/ruracio" className="text-[10px] font-medium text-gold uppercase tracking-widest hover:underline">
                  Explore Ruracio →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section py-24 bg-espresso text-ivory">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ivory mb-5 tracking-tight">Begin your commission</h2>
          <p className="text-ivory/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Every garment is individual — drawn from your story, your ceremony, your measurements.
            Book your consultation and we&apos;ll design something made only for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button variant="gold" size="large" className="gold-foil" asChild>
              <Link href="/book">Book your consultation</Link>
            </Button>
            <Button variant="outline" size="large" asChild>
              <Link href="/lookbook">Explore the work</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
