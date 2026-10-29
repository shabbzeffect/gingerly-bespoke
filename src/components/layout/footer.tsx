"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C8.74 0 0 8.74 0 12c0 3.25 2.65 5.9 5.92 6.48V16.92h1.87v-3.04c0-1.45.69-2.67 1.93-2.67.57 0 1.12.23 1.12.23v3.76h1.87v-3.76c0-.01.23-.01.23-.01 0-2.28-1.27-4.22-3.13-4.22-2.28 0-3.13 1.95-3.13 4.22v3.41h-1.87v-3.41c0-1.77-.7-3.23-2.06-3.23-1.29 0-2.06 1.46-2.06 3.23v3.41H1.92v-3.41C1.92 8.74 8.74 0 12 0zm0 2.14c-3.46 0-6.26 2.8-6.26 6.25s2.8 6.25 6.26 6.25 6.26-2.8 6.26-6.25-2.8-6.25-6.26-6.25z"/><path d="M12 15.62c-1.96 0-3.56-1.6-3.56-3.57s1.6-3.57 3.56-3.57 3.56 1.6 3.56 3.57-1.6 3.57-3.56 3.57zm0-5.42c-1.02 0-1.85.83-1.85 1.85s.83 1.85 1.85 1.85 1.85-.83 1.85-1.85-.83-1.85-1.85-1.85z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.29 3.28c-2.11-1.36-4.47-.59-6.55 1.28l-.68.61c-3.02 2.72-3.58 6.74-1.68 10.14l.7 1.26c-3.17 1.8-5.2 5.43-4.47 8.86l.27.94c.41 1.93 2.66 3.31 5.14 2.67l.97-.25c2.49-.47 4.86-2.54 6.12-5.08l.4-.78c2.12 1.51 5.03 1.53 7.58 0l.99-.57c2.64-1.46 3.25-5.42 1.78-8.36l-.7-1.37c1.27-2.83.17-5.93-1.66-8.13l-.7-.83c-2.14-1.27-4.55-2.1-6.59-2.53zm-2.42 14.51c-.41-.41-.67-1.02-.67-1.62s.25-1.21.67-1.62c.83-.83 2.13-.83 2.96 0 .41.41.67 1.02.67 1.62s-.25 1.21-.67 1.62c-.41.41-1.02.67-1.62.67s-1.21-.25-1.62-.67zm-3.07-2.37c-.41-.41-.67-1.02-.67-1.62s.25-1.21.67-1.62c.83-.83 2.13-.83 2.96 0 .41.41.67 1.02.67 1.62s-.25 1.21-.67 1.62c-.41.41-1.02.67-1.62.67s-1.21-.25-1.62-.67z"/>
  </svg>
);

const FOOTER_LINKS = [
  {
    heading: "The Atelier",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Services", href: "/services" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Collections",
    links: [
      { label: "The Lookbook", href: "/lookbook" },
      { label: "Ruracio", href: "/lookbook/ruracio" },
      { label: "Nyombo", href: "/lookbook/nyombo" },
      { label: "Koito", href: "/lookbook/koito" },
      { label: "Bukhwi", href: "/lookbook/bukhwi" },
      { label: "White Weddings", href: "/lookbook/white-wedding" },
      { label: "Bridesmaids", href: "/lookbook/bridesmaid" },
      { label: "Menswear & Senator Suits", href: "/lookbook/menswear" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Bespoke Consultation", href: "/book" },
      { label: "Virtual Fittings", href: "/virtual-fittings" },
      { label: "Rentals", href: "/rentals" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Rental Terms", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "WhatsApp", Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-espresso text-ivory">
      <div className="page-container pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        {/* Top divider */}
        <div className="flex items-center justify-center mb-16 md:mb-20">
          <div className="w-full max-w-xs relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="border-t border-border w-full" />
            </div>
            <div className="relative z-10 bg-espresso px-3 text-[10px] font-medium text-cowrie/50 uppercase tracking-widest">
              Gingerly Designs and Fabrics
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display font-semibold text-ivory text-xl tracking-tight">Gingerly</span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-gold">atelier</span>
            </div>
            <p className="text-cowrie/60 text-sm leading-relaxed max-w-md mb-6">
              Nairobi&apos;s bespoke bridal atelier. Custom attire for Ruracio, Nyombo, Koito,
              Bukhwi, white weddings, and occasion wear — made to measure, designed with you.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-9 h-9 rounded-full border border-cowrie/30 flex items-center justify-center text-cowrie/60 hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter column */}
          <div className="md:col-span-4">
            <div className="soft-panel rounded-[1.75rem] p-8 md:p-10 border border-border">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">Join the atelier&apos;s journal</h3>
              <p className="text-cowrie/60 text-sm leading-relaxed mb-6 max-w-md">
                Receive seasonal collections and ceremony guides. Your details stay private.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-11 rounded-xl border border-border bg-surface text-ink placeholder:text-cowrie/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-all duration-200"
                />
                <Button variant="gold" size="small">Subscribe</Button>
              </form>
              <p className="text-[10px] text-cowrie/40 leading-relaxed mt-4">
                By subscribing you agree to receive updates from Gingerly Designs and Fabrics.
              </p>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOOTER_LINKS.map((column) => (
              <div key={column.heading}>
                <h3 className="label-caps text-xs mb-6">{column.heading}</h3>
                <ul className="space-y-4 text-sm leading-relaxed">
                  {column.links.map((link, i) => (
                    <li key={`${i}-${link.href}`}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-cowrie/60 hover:text-gold transition-colors duration-300 relative inline-block",
                          (link.href.startsWith("http") || link.href.startsWith("#")) &&
                            "text-cowrie/50 cursor-not-allowed"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-12 md:pt-16 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-cowrie/40">
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-start">
            <Link href="#" className="hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-gold/40">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-gold/40">Terms of Service</Link>
            <Link href="#" className="hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-gold/40">Cookie Policy</Link>
          </div>
          <p className="text-center md:text-start">
            Gingerly Designs and Fabrics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
