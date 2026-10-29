import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const POSTS = [
  {
    title: "Planning Your Ruracio: A Complete Guide",
    slug: "planning-your-ruracio",
    category: "Tradition",
    excerpt: "What to expect at a Kikuyu ruracio ceremony, and how to choose attire that honours the occasion.",
    date: "August 10, 2025",
    readTime: "6 min read",
    coverLabel: "Ruracio guide",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_3851b913c4424a82bf7c48e596441bb9.jpg",
    featured: true,
  },
  {
    title: "2025 Bridal Trends in Nairobi",
    slug: "2025-bridal-trends-nairobi",
    category: "Trends",
    excerpt: "Lace, beadwork, and silhouette directions for Nairobi brides this season.",
    date: "June 20, 2025",
    readTime: "5 min read",
    coverLabel: "Bridal trends",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_39fc264967254df28e6483a58d268641.jpg",
  },
  {
    title: "The Senator Suit: Tailored for the Groom",
    slug: "the-senator-suit",
    category: "Menswear",
    excerpt: "A look at the Senator suit — formal, tailored, and unapologetically Kenyan.",
    date: "May 5, 2025",
    readTime: "4 min read",
    coverLabel: "Senator suit",
    imageSrc: "/gingerly-images/gingerlydesignsandfabrics_5d6a46d9a84a4d6e91a4e24d5c514bc1.jpg",
  },
];

export const metadata = {
  title: "Journal",
  description: "Editorials and guides from Gingerly Designs and Fabrics.",
};

export default function JournalPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] w-full overflow-hidden bg-espresso">
        <div className="absolute inset-0 z-0">
          <PlaceholderImage
            src="/gingerly-images/gingerlydesignsandfabrics_df9bf78d1cc84054872af897da797159.jpg"
            alt="Journal editorial hero"
            label="journal hero"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-espresso/30" />
        </div>
        <div className="relative z-10 page-container h-full flex flex-col justify-center pt-10 pb-12 md:pt-16 md:pb-20">
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-wide uppercase">
            Editorial
          </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-ivory tracking-tight mb-6">
            The Journal<span className="block text-gold italic"> · Stories from the atelier</span>
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mb-10">
            Guides, traditions, and editorials from Gingerly Designs and Fabrics.
            Stories behind the ceremonies, the fabrics, and the people we dress.
          </p>
          <Button variant="gold" size="medium" className="gold-foil" asChild>
            <Link href="/lookbook">Explore the lookbook <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          {/* Featured post */}
          <article className="mb-20 md:mb-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-border bg-espresso/5 image-frame group">
              <PlaceholderImage
                src={featured.imageSrc}
                alt={`${featured.coverLabel} (sample)`}
                label={featured.coverLabel}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 rounded-full bg-gold text-espresso text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                  Featured · {featured.category}
                </span>
              </div>
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur">
                <span className="text-[10px] text-espresso font-medium uppercase tracking-wider">{featured.date}</span>
                <span className="text-[10px] text-espresso/50">{featured.readTime}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-medium mb-3 block">Featured story</span>
              <h2 className="text-5xl md:text-6xl font-serif font-semibold text-espresso mb-5 tracking-tight">{featured.title}</h2>
              <p className="text-espresso/60 text-lg leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <Link href={`/journal/${featured.slug}`} className="inline-flex items-center gap-2 text-gold font-medium hover:underline tracking-wide">
                Read the story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>

          <div className="border-t border-border pt-16 mb-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-tight">Recent stories</h2>
              <Link href="/lookbook" className="text-xs text-gold font-medium hover:underline tracking-widest uppercase">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((p) => (
                <Card key={p.slug} className="group cursor-pointer border-border hover:border-gold-soft transition-all duration-300">
                  <Link href={`/journal/${p.slug}`} className="block">
                    <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-border bg-espresso/5 mb-5 group-hover:border-gold-soft transition-all duration-500 image-frame">
                      <PlaceholderImage
                        src={p.imageSrc}
                        alt={`${p.coverLabel} (sample)`}
                        label={p.coverLabel}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-gold text-espresso text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-[10px] text-espresso font-medium uppercase tracking-wider">{p.date}</span>
                      <span className="text-[10px] text-espresso/50 ml-1">{p.readTime}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-ink text-xl mb-2 leading-snug group-hover:text-gold transition-colors">{p.title}</h3>
                    <p className="text-espresso/60 text-sm leading-relaxed">{p.excerpt}</p>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
