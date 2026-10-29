import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About the Atelier",
  description: "Gingerly Designs and Fabrics — a Nairobi-based bespoke bridal and fashion atelier.",
};

export default function AboutPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-espresso">
        <div className="absolute inset-0 z-0">
          <PlaceholderImage
            src="/gingerly-images/gracembote_f82ff24839e24cd69f35dad724280e03.jpg"
            alt="Atelier workshop hero"
            label="about hero"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-espresso/30" />
        </div>
        <div className="relative z-10 page-container h-full flex flex-col justify-center pt-10 pb-12 md:pt-16 md:pb-20">
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-wide uppercase">
            About Gingerly
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight text-ivory tracking-tight mb-6">
            Where every thread<span className="block text-gold italic"> tells a story</span>
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mb-10">
            A Nairobi-based bespoke fashion house creating made-to-measure attire for life&apos;s
            most important ceremonies — Ruracio, Nyombo, Koito, Bukhwi, white weddings, and
            occasion wear — with the same care whether the client is across town or across
            the world.
          </p>
          <Button variant="gold" size="medium" className="gold-foil" asChild>
            <Link href="/book">Book a consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-4 tracking-tight">Our approach</h2>
              <p className="text-espresso/70 text-lg leading-relaxed max-w-xl">
                We design with you, not for you. Every commission begins with a conversation —
                your ceremony, your body, your story — and ends with a garment made individually
                for you. Nothing is mass-produced; nothing is taken off a rack.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Made to measure",
                desc: "Each garment is cut and sewn to your exact measurements. No off-the-rack pieces, ever.",
              },
              {
                title: "Heritage honoured",
                desc: "We work with Ankara, lace, beadwork, cowrie shells, and textured fabrics rooted in Kenyan and East African traditions.",
              },
              {
                title: "Designed with you",
                desc: "Sketches, mood boards, and fabric swatches shared privately before anything is cut.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-8 rounded-[1.75rem] border border-border shadow-sm hover:border-gold-soft transition-all duration-300">
                <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center mb-5 font-serif font-bold text-gold mx-auto shadow-sm">
                  ✦
                </div>
                <h3 className="font-serif font-semibold text-ink text-xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-espresso/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Approach image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2 relative">
              <div className="image-frame aspect-[4/5]">
                <PlaceholderImage
                  src="/gingerly-images/gracembote_e4727d52f20946fc963e7bdfe634adfa.jpg"
                  alt="Atelier interior"
                  label="about"
                  className="w-full h-full object-cover"
                />
                <div className="absolute -inset-px bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] rounded-[1.75rem] -z-10 opacity-50" />
              </div>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-espresso mb-5 tracking-tight">Craftsmanship in every detail</h2>
              <p className="text-espresso/70 leading-relaxed mb-7 max-w-xl">
                From the first sketch to the final fitting, each garment is made individually in our
                Nairobi studio. We source fabrics with care, apply beadwork by hand, and refine the
                silhouette through fit checkpoints — because bespoke means made for you, and only you.
              </p>
              <Link href="/lookbook" className="inline-flex items-center gap-2 text-gold font-medium hover:underline tracking-wide">
                Explore the lookbook <span className="text-gold">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit us */}
      <section className="section bg-ivory/30">
        <div className="page-container">
          <div className="soft-panel rounded-[2rem] p-8 md:p-14 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-4 tracking-tight">Visit us</h2>
                <p className="text-espresso/60 text-lg leading-relaxed max-w-md mb-6">
                  Consultations are by appointment, in our Nairobi studio or virtually from anywhere.
                  Contact details below are configured by the atelier — please check them before your visit.
                </p>
              </div>
              <div className="space-y-6 text-sm text-espresso/70">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-gold-soft transition-all duration-300">
                  <MapPin className="h-5 w-5 mt-0.5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold/70 font-medium">Studio</div>
                    <div className="text-sm font-medium text-espresso">Nairobi, Kenya</div>
                    <div className="text-xs text-espresso/50">By appointment</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-gold-soft transition-all duration-300">
                  <Phone className="h-5 w-5 mt-0.5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold/70 font-medium">WhatsApp</div>
                    <div className="text-sm font-medium text-espresso">Enquiries &amp; bookings</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-gold-soft transition-all duration-300">
                  <Mail className="h-5 w-5 mt-0.5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold/70 font-medium">Email</div>
                    <div className="text-sm font-medium text-espresso">atelier enquiries</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-gold-soft transition-all duration-300">
                  <Clock className="h-5 w-5 mt-0.5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold/70 font-medium">Hours</div>
                    <div className="text-sm font-medium text-espresso">By appointment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
