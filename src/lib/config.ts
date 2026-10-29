export const SITE = {
  name: "Gingerly Designs and Fabrics",
  tagline: "Where heritage meets couture",
  baseLocation: "Nairobi, Kenya",
  defaultCurrency: "KES" as const,
  currencies: ["KES", "GBP", "AUD", "USD"] as const,
  timezone: "Africa/Nairobi",
} as const;

export const NAVIGATION = [
  { href: "/lookbook", label: "The Lookbook" },
  { href: "/services", label: "Bespoke Services" },
  { href: "/book", label: "Book a Consultation" },
  { href: "/virtual-fittings", label: "Virtual Fittings" },
  { href: "/rentals", label: "Rentals" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const OCCASIONS = [
  { value: "ruracio", label: "Ruracio", hint: "Kikuyu traditional introduction" },
  { value: "nyombo", label: "Nyombo", hint: "Luo heritage" },
  { value: "koito", label: "Koito", hint: "Kalenjin celebration" },
  { value: "bukhwi", label: "Bukhwi", hint: "Luhya tradition" },
  { value: "white_wedding", label: "White Wedding", hint: "Lace, trains, cathedral veils" },
  { value: "bridesmaid", label: "Bridesmaids", hint: "Coordinated squad looks" },
  { value: "prom", label: "Prom", hint: "Evening occasion wear" },
  { value: "menswear", label: "Menswear", hint: "Senator suits & tailored grooms" },
  { value: "other", label: "Other Occasion", hint: "Birthday, anniversary, guest" },
] as const;

export const CEREMONY_PAGES: Record<string, { title: string; subtitle: string; path: string }> = {
  ruracio: { title: "Ruracio", subtitle: "Kikuyu traditional introduction", path: "/lookbook/ruracio" },
  nyombo: { title: "Nyombo", subtitle: "Luo heritage", path: "/lookbook/nyombo" },
  koito: { title: "Koito", subtitle: "Kalenjin celebration", path: "/lookbook/koito" },
  bukhwi: { title: "Bukhwi", subtitle: "Luhya tradition", path: "/lookbook/bukhwi" },
  white_wedding: { title: "White Weddings", subtitle: "Lace, trains, cathedral veils", path: "/lookbook/white-wedding" },
  bridesmaid: { title: "Bridesmaids", subtitle: "Coordinated squad looks", path: "/lookbook/bridesmaids" },
  prom: { title: "Prom & Occasion Wear", subtitle: "Evening elegance", path: "/lookbook/prom" },
  menswear: { title: "Menswear & Senator Suits", subtitle: "Tailored grooms & groomsmen", path: "/lookbook/menswear" },
};
