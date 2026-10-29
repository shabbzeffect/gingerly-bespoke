import * as schema from "./schema";
import { eq, desc, asc, and, ilike, or, sql, inArray, count } from "drizzle-orm";

// Re-export schema tables and helpers for convenience.
export { schema };
export { consultations, lookbookItems, lookbookImages, rentalItems, faqs, users, clients, siteSettings, measurements, accounts, sessions, verificationTokens } from "./schema";
export { consultationStatusSchema } from "./schema";
export type { Consultation, NewConsultation, LookbookItem, NewLookbookItem, RentalItem, FAQ, User, Client } from "./schema";
export { eq, desc, asc, and, ilike, or, sql, inArray, count };

// Shape of the real Drizzle db, used only for type-checking the defensive
// `if (d)` branches in client components. At runtime `getDb()` always returns
// null in the browser so the Node-only `pg` driver is never bundled.
type DbLike = {
  query: {
    consultations: { findMany: () => unknown[] };
    clients: { findMany: () => unknown[] };
    lookbookItems: { findMany: () => unknown[]; findFirst: (args: unknown) => unknown };
    siteSettings: { findMany: () => unknown[]; findFirst: (args: unknown) => unknown };
  };
  insertLookbookItem?: (data: unknown) => unknown;
  updateConsultation?: (id: number, data: unknown) => unknown;
  updateSiteSettings?: (data: unknown) => unknown;
  insertSiteSettings?: (data: unknown) => unknown;
};

// Client-safe database accessor. In the browser / client components this returns
// null so the Node-only `pg` driver is never bundled. Real PostgreSQL access is
// provided by src/lib/server-db.ts (server-only).
export function getDb(): DbLike | null {
  return null;
}

// Alias for callers that prefer `db()`.
export const db = getDb;

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

type MockConsultation = {
  id: number;
  clientId?: number | null;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  timeZone: string;
  occasion: string;
  garmentType: string;
  eventDate: string | null;
  appointmentType: string;
  preferredDate: string | null;
  preferredTime: string | null;
  inspiration?: string | null;
  budget?: string | null;
  message?: string | null;
  referenceImageUrl?: string | null;
  status: string;
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
};

type MockLookbookItem = {
  id: number;
  title: string;
  slug: string;
  occasion: string;
  garmentType: string;
  position: number;
  description?: string | null;
  culturalContext?: string | null;
  fabrics: string[];
  details: string[];
  featured: boolean;
  priceNote?: string | null;
  currency: string;
  coverImageUrl?: string | null;
  altText?: string | null;
  createdAt: string;
  updatedAt: string;
};

type MockRentalItem = {
  id: number;
  title: string;
  slug: string;
  occasion: string;
  garmentType: string;
  description?: string | null;
  sizes: string[];
  colors: string[];
  deposit?: string | null;
  currency: string;
  terms?: string | null;
  careInstructions?: string | null;
  status: string;
  coverImageUrl?: string | null;
  altText?: string | null;
  createdAt: string;
};

type MockFaq = {
  id: number;
  question: string;
  answer: string;
  category?: string | null;
  position: number;
  verified: boolean;
};

type MockClient = {
  id?: number | null;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  createdAt?: string | null;
};

// In-memory mock store for demo/development without a live Postgres.
// Clearly marked: never use for production client data.
const mockStore: {
  consultations: MockConsultation[];
  lookbookItems: MockLookbookItem[];
  rentalItems: MockRentalItem[];
  faqs: MockFaq[];
  users: unknown[];
  clients: MockClient[];
  siteSettings: Record<string, string>;
} = {
  consultations: [],
  lookbookItems: [],
  rentalItems: [],
  faqs: [],
  users: [],
  clients: [],
  siteSettings: {},
};

let mockIdCounter = 1;

type QueryFilters = {
  status?: string;
  occasion?: string;
  garmentType?: string;
};

export class MockDb {
  private nextId() { return mockIdCounter++; }

  async queryConsultations({ where, limit, offset }: { where?: QueryFilters; limit?: number; offset?: number } = {}) {
    let rows = [...mockStore.consultations];
    if (where) {
      rows = rows.filter((r) => {
        if (where.status && r.status !== where.status) return false;
        if (where.occasion && r.occasion !== where.occasion) return false;
        return true;
      });
    }
    rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (offset) rows = rows.slice(offset);
    if (limit) rows = rows.slice(0, limit);
    return rows;
  }

  async insertConsultation(data: Omit<MockConsultation, "id" | "createdAt" | "updatedAt">) {
    const row: MockConsultation = { ...data, id: this.nextId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    mockStore.consultations.push(row);
    return row;
  }

  async updateConsultation(id: number, data: Partial<MockConsultation>) {
    const idx = mockStore.consultations.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    mockStore.consultations[idx] = { ...mockStore.consultations[idx], ...data, updatedAt: new Date().toISOString() };
    return mockStore.consultations[idx];
  }

  async queryLookbookItems({ where, featured }: { where?: { occasion?: string; garmentType?: string }; featured?: boolean } = {}) {
    let rows = [...mockStore.lookbookItems];
    if (where?.occasion) rows = rows.filter((r) => r.occasion === where.occasion);
    if (where?.garmentType) rows = rows.filter((r) => r.garmentType === where.garmentType);
    if (featured) rows = rows.filter((r) => r.featured === true);
    rows.sort((a, b) => b.position - a.position || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return rows;
  }

  async insertLookbookItem(data: Omit<MockLookbookItem, "id" | "createdAt" | "updatedAt">) {
    const row: MockLookbookItem = { ...data, id: this.nextId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    mockStore.lookbookItems.push(row);
    return row;
  }

  async queryRentalItems({ where }: { where?: { status?: string; occasion?: string } } = {}) {
    let rows = [...mockStore.rentalItems];
    if (where?.status) rows = rows.filter((r) => r.status === where.status);
    if (where?.occasion) rows = rows.filter((r) => r.occasion === where.occasion);
    return rows;
  }

  async insertRentalItem(data: Omit<MockRentalItem, "id" | "createdAt">) {
    const row: MockRentalItem = { ...data, id: this.nextId(), createdAt: new Date().toISOString() };
    mockStore.rentalItems.push(row);
    return row;
  }

  async queryFaqs() {
    return [...mockStore.faqs].sort((a, b) => a.position - b.position);
  }

  async upsertSiteSetting(key: string, value: string) {
    mockStore.siteSettings[key] = value;
    return { key, value };
  }

  async querySiteSettings() {
    return Object.entries(mockStore.siteSettings).map(([key, value]) => ({ key, value }));
  }
}

export const mockDb = new MockDb();

// Seeded sample content — clearly marked as sample, not verified business data.
export const SEED_CONTENT = {
  siteSettings: {
    "brand_name": "Gingerly Designs and Fabrics",
    "brand_tagline": "Where heritage meets couture",
    "default_currency": "KES",
    "base_location": "Nairobi, Kenya",
    "consultation_fee": "To be confirmed — contact the atelier",
    "virtual_consultation_fee": "To be confirmed — contact the atelier",
    "whatsapp_number": "", // owner must supply
    "instagram_handle": "", // owner must supply
    "email": "", // owner must supply
    "rentals_enabled": "false",
  },
  lookbookItems: [
    {
      id: 1,
      title: "Ruracio — Beaded Ceremony Gown",
      slug: "ruracio-beaded-ceremony-gown",
      occasion: "ruracio",
      garmentType: "traditional_attire",
      description: "A bespoke Kikuyu ruracio gown featuring hand-applied beadwork and earthy tones. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Ruracio is the Kikuyu traditional introduction and dowry negotiation ceremony. Attire honours both families and celebrates union.",
      fabrics: ["Ankara", "lace"],
      details: ["beadwork", "hand-embroidery"],
      featured: true,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_7ce073ce5e7d49048057834b016e48d4.jpg",
      altText: "Ruracio beaded ceremony gown",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "White Wedding — Cathedral Veil Gown",
      slug: "white-wedding-cathedral-veil-gown",
      occasion: "white_wedding",
      garmentType: "bridal_gown",
      description: "Classic white wedding silhouette with lace bodice and cathedral veil. Sample imagery — replace with authentic brand photography.",
      culturalContext: "",
      fabrics: ["lace", "tulle"],
      details: ["rhinestones", "beadwork"],
      featured: true,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_95ac841a53894459bd02809f51599a49.jpg",
      altText: "White wedding gown with cathedral veil",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Senator Suit — Tailored Menswear",
      slug: "senator-suit-tailored-menswear",
      occasion: "other",
      garmentType: "senator_suit",
      description: "Tailored Senator suit for grooms and groomsmen. Sample imagery — replace with authentic brand photography.",
      culturalContext: "The Senator suit is a formal tailored ensemble worn across Nigerian and East African occasions.",
      fabrics: ["linen", "worsted wool"],
      details: ["bespoke tailoring"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_632765d3d26b4df9a4edd6c5d753ecbf.jpg",
      altText: "Tailored Senator suit",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Nyombo — Beaded Luo Bridal Ensemble",
      slug: "nyombo-beaded-luo-bridal",
      occasion: "nyombo",
      garmentType: "traditional_attire",
      description: "A bespoke Luo nyombo bridal ensemble featuring intricate beadwork and flowing silhouettes that honour Luo heritage. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Nyombo is a Luo traditional wedding ceremony that celebrates union through music, dance, and symbolic attire honouring both families.",
      fabrics: ["Ankara", "beadwork", "lace"],
      details: ["hand-beadwork", "cowrie shells", "embroidery"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_d9fccdffea204786b368091d449bd7e1.jpg",
      altText: "Nyombo beaded Luo bridal ensemble",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Koito — Kalenjin Celebration Gown",
      slug: "koito-kalenjin-celebration-gown",
      occasion: "koito",
      garmentType: "traditional_attire",
      description: "A bespoke Kalenjin koito gown in earthy tones with traditional embellishment and contemporary cut. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Koito is a Kalenjin celebration ceremony marking marriage union, where attire reflects the richness of Kalenjin cultural heritage.",
      fabrics: ["linen", "Ankara"],
      details: ["beadwork", "tailored fit"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_daa9eb3f2e464b38900b4d6f73b7eece.jpg",
      altText: "Koito Kalenjin celebration gown",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 6,
      title: "Bukhwi — Luhya Traditional Attire",
      slug: "bukhwi-luhya-traditional-attire",
      occasion: "bukhwi",
      garmentType: "traditional_attire",
      description: "A bespoke Luhya bukhui attire featuring vibrant Ankara and intricate detailing for traditional ceremonies. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Bukhwi is a Luhya traditional ceremony celebrating marriage and family union, with attire that honours cultural roots and contemporary elegance.",
      fabrics: ["Ankara", "lace"],
      details: ["hand-embroidery", "beadwork"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gingerlydesignsandfabrics_acb442d1c1db4197a65b6d962587b5c9.jpg",
      altText: "Bukhwi Luhya traditional attire",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 7,
      title: "Bridesmaids — Coordinated Ankara Ensemble",
      slug: "bridesmaids-coordinated-ankara",
      occasion: "bridesmaid",
      garmentType: "bridesmaid",
      description: "Coordinated bridesmaid dresses in matching Ankara prints, designed for harmony and individual elegance across the bridal party. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Bridesmaid attire coordinates with the bridal gown while celebrating each bridesmaid's individual style within the wedding party.",
      fabrics: ["Ankara", "chiffon"],
      details: ["coordinated prints", "flowing silhouettes"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gracembote_4ef3f6d5393c476d8f463b383dd99207.jpg",
      altText: "Coordinated Ankara bridesmaid ensemble",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 8,
      title: "Prom — Evening Occasion Gown",
      slug: "prom-evening-occasion-gown",
      occasion: "prom",
      garmentType: "prom",
      description: "A bespoke prom evening gown in lace and tulle, designed for elegance and memorable occasions. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Prom and occasion wear celebrates milestone moments with elegant, made-to-measure evening attire.",
      fabrics: ["lace", "tulle", "satin"],
      details: ["rhinestones", "beadwork", "cathedral train"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gracembote_e4727d52f20946fc963e7bdfe634adfa.jpg",
      altText: "Prom evening occasion gown",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 9,
      title: "Menswear — Bespoke Groom's Attire",
      slug: "menswear-bespoke-grooms-attire",
      occasion: "menswear",
      garmentType: "menswear",
      description: "A bespoke groom's attire in linen and worsted wool, tailored for the modern groom with traditional African elegance. Sample imagery — replace with authentic brand photography.",
      culturalContext: "Menswear for grooms and groomsmen blends formal tailoring with African fabric traditions for wedding and occasion wear.",
      fabrics: ["linen", "worsted wool", "Ankara accents"],
      details: ["bespoke tailoring", "custom fit"],
      featured: false,
      priceNote: "Bespoke — quoted individually",
      currency: "KES",
      coverImageUrl: "/gingerly-images/gracembote_ed10d66f181948b59204ea72f96daa51.jpg",
      altText: "Bespoke groom's attire",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  faqs: [
    {
      question: "How do I start a commission?",
      answer: "Book a consultation — in person in Nairobi or virtual from anywhere. Share your occasion, inspiration, and measurements so we can design something individual to you.",
      category: "commissions",
      position: 1,
      verified: false,
    },
    {
      question: "Can I book a virtual consultation from the UK or Australia?",
      answer: "Yes. Virtual consultations are available worldwide and we display times in your local time zone as well as Nairobi time.",
      category: "virtual",
      position: 2,
      verified: false,
    },
    {
      question: "Do you offer rentals?",
      answer: "Rental enquiries are welcome. Please contact the atelier to confirm current availability, terms, and deposit — rental inventory is owner-managed and not published as live stock.",
      category: "rentals",
      position: 3,
      verified: false,
    },
  ],
};
