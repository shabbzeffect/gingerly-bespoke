"use client";

import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { db, SEED_CONTENT } from "@/lib/db";
import { LookbookItem } from "@/lib/schema";
import { OCCASIONS } from "@/lib/config";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Lightbox } from "@/components/ui/lightbox";

export function LookbookGallery() {
  const [items, setItems] = useState<LookbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [occasionFilter, setOccasionFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; alt: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const d = db();
        let rows: LookbookItem[] = [];
        if (d) {
          rows = (await d.query.lookbookItems.findMany()) as unknown as LookbookItem[];
        } else {
          rows = SEED_CONTENT.lookbookItems as unknown as LookbookItem[];
        }
        if (mounted) setItems(rows);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (occasionFilter !== "all" && i.occasion !== occasionFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          i.title.toLowerCase().includes(s) ||
          (i.description || "").toLowerCase().includes(s) ||
          (i.fabrics || []).some((f) => f.toLowerCase().includes(s))
        );
      }
      return true;
    });
  }, [items, occasionFilter, search]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxImages(items.filter((i) => i.coverImageUrl).map((i) => ({ url: i.coverImageUrl!, alt: i.altText || i.title })));
    setLightbox(true);
  };

  return (
    <div className="flex-1">
      <section className="section pt-0">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-espresso mb-2">The Lookbook</h1>
              <p className="text-espresso/60">Bespoke bridal and traditional-occasion collections.</p>
            </div>
            <div className="flex flex-wrap sm:flex-row gap-2">
              <button
                onClick={() => setOccasionFilter("all")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  occasionFilter === "all"
                    ? "bg-espresso text-ivory shadow-sm"
                    : "border border-border bg-ivory text-espresso hover:bg-espresso/5 hover:border-gold/40"
                }`}
              >
                All
              </button>
              {OCCASIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setOccasionFilter(o.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    occasionFilter === o.value
                      ? "bg-gold text-espresso shadow-sm"
                      : "border border-border bg-ivory text-espresso hover:bg-espresso/5 hover:border-gold/40"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-12">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="search"
              placeholder="Search looks, fabrics, details…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-xl border border-border bg-ivory text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
            />
          </div>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <div className="h-8 w-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="mt-12 text-center text-espresso/50 text-lg">No looks match your filters.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(filtered.findIndex((x) => x.id === item.id))}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden border border-border bg-espresso/5 group-hover:border-gold-soft transition-all duration-500 image-frame">
                    <PlaceholderImage
                      src={item.coverImageUrl || undefined}
                      alt={item.altText || item.title}
                      label={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {item.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-espresso text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <h3 className="font-serif font-semibold text-ink group-hover:text-gold transition-colors leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted mt-1">
                      {item.occasion.replace(/_/g, " ")} · {item.garmentType.replace(/_/g, " ")}
                    </p>
                    {(item.fabrics || []).length > 0 && (
                      <p className="text-[10px] text-gold/80 uppercase tracking-widest mt-2 font-medium">
                        {(item.fabrics || []).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        open={lightbox}
        onOpenChange={setLightbox}
        images={lightboxImages}
        currentIndex={lightboxIndex}
      />
    </div>
  );
}
