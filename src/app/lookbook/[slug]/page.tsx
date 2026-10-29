import { notFound } from "next/navigation";
import { db, SEED_CONTENT } from "@/lib/db";
import { LookbookItem } from "@/lib/schema";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getItem(slug: string): Promise<LookbookItem | null> {
  const d = db();
  if (d) {
    const items = await d.query.lookbookItems.findMany();
    const item = items.find((i) => (i as { slug: string }).slug === slug);
    return (item as LookbookItem | null) ?? null;
  }
  return (SEED_CONTENT.lookbookItems as unknown as LookbookItem[]).find((i: LookbookItem) => i.slug === slug) ?? null;
}

export const metadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return { title: "Look not found" };
  return {
    title: `${item.title} | Gingerly Designs and Fabrics`,
    description: item.description || `Bespoke ${item.occasion} attire from Gingerly Designs and Fabrics.`,
    openGraph: { images: item.coverImageUrl ? [{ url: item.coverImageUrl! }] : [] },
  };
};

export default async function LookbookItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <div className="flex-1">
      <section className="section">
        <div className="page-container">
          <nav className="mb-8 text-xs text-espresso/50 uppercase tracking-widest font-medium">
            <Link href="/lookbook" className="hover:text-gold transition-colors">Lookbook</Link>
            <span className="mx-2 text-gold">/</span>
            <span className="text-espresso">{item.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-espresso/10 bg-espresso/5">
              <PlaceholderImage
                src={item.coverImageUrl || undefined}
                alt={item.altText || item.title}
                label={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-h1 font-serif font-semibold text-ink mb-4 leading-tight tracking-tight">
                {item.title}
              </h1>
              <p className="text-xs uppercase tracking-widest text-gold font-medium mb-6">
                {item.occasion.replace(/_/g, " ")} · {item.garmentType.replace(/_/g, " ")}
              </p>

              {item.description && (
                <div className="mb-8 text-muted leading-relaxed">
                  <p className="text-lg font-serif text-ink mb-3">{item.description}</p>
                  {item.culturalContext && (
                    <>
                      <p className="text-muted text-sm mb-2 font-medium uppercase tracking-wide label-caps">Cultural context</p>
                      <p className="text-muted leading-relaxed">{item.culturalContext}</p>
                    </>
                  )}
                </div>
              )}

              {(item.fabrics || []).length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-muted-soft font-medium mb-2 label-caps">Fabrics</p>
                  <div className="flex flex-wrap gap-2">
                    {(item.fabrics || []).map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full border border-border text-xs text-muted bg-surface">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(item.details || []).length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-muted-soft font-medium mb-2 label-caps">Design details</p>
                  <div className="flex flex-wrap gap-2">
                    {(item.details || []).map((d) => (
                      <span key={d} className="px-3 py-1 rounded-full border border-border text-xs text-muted bg-surface">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Link href="/book" className="text-center">
                  <button className="w-full py-4 rounded-xl bg-gold text-espresso font-semibold hover:bg-gold-dark transition-colors">
                    Book this look
                  </button>
                </Link>
                <p className="text-sm text-espresso/60">
                  {item.priceNote || "Bespoke — quoted individually"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
