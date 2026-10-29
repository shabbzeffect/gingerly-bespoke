import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF6F0",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Gingerly Designs and Fabrics",
    default: "Gingerly Designs and Fabrics — Bespoke Bridal Atelier, Nairobi",
  },
  description:
    "Nairobi's bespoke bridal atelier. Custom attire for Ruracio, Nyombo, Koito, Bukhwi, white weddings, bridesmaids, prom, occasion wear, and Senator suits. Virtual fittings worldwide.",
  openGraph: {
    siteName: "Gingerly Designs and Fabrics",
    title: "Gingerly Designs and Fabrics — Bespoke Bridal Atelier, Nairobi",
    description:
      "Nairobi's bespoke bridal atelier. Custom attire for Ruracio, Nyombo, Koito, Bukhwi, white weddings, bridesmaids, prom, occasion wear, and Senator suits. Virtual fittings worldwide.",
    type: "website",
    locale: "en-KE",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gingerlydesigns",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <Providers session={session}>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
