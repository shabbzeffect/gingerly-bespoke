import { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://gingerly.example.com";

const routes = ["", "/about", "/process", "/services", "/lookbook", "/book", "/virtual-fittings", "/rentals", "/journal", "/faq", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
