import { pgTable, serial, text, timestamp, integer, boolean, pgEnum, real } from "drizzle-orm/pg-core";
import { z } from "zod";

// ============================================================================
// Enums
// ============================================================================

export const consultationStatusEnum = pgEnum("consultation_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "rescheduled",
]);

export const appointmentTypeEnum = pgEnum("appointment_type", [
  "in_person",
  "virtual",
]);

export const garmentTypeEnum = pgEnum("garment_type", [
  "bridal_gown",
  "traditional_attire",
  "white_wedding",
  "bridesmaid",
  "prom",
  "occasion_wear",
  "menswear",
  "senator_suit",
  "other",
]);

export const occasionEnum = pgEnum("occasion", [
  "ruracio",
  "nyombo",
  "koito",
  "bukhwi",
  "white_wedding",
  "bridesmaid",
  "prom",
  "birthday",
  "anniversary",
  "guest",
  "other",
]);

export const rentalStatusEnum = pgEnum("rental_status", [
  "available",
  "reserved",
  "out",
  "maintenance",
  "retired",
]);

// ============================================================================
// Tables
// ============================================================================

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  role: text("role").notNull().default("client"), // client | admin | atelier
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  timeZone: text("time_zone").default("Africa/Nairobi"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  bust: real("bust"),
  waist: real("waist"),
  hips: real("hips"),
  height: real("height"),
  shoulderToWaist: real("shoulder_to_waist"),
  shoulderToFloor: real("shoulder_to_floor"),
  armLength: real("arm_length"),
  notes: text("notes"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  timeZone: text("time_zone").default("Africa/Nairobi"),
  occasion: occasionEnum("occasion").notNull(),
  garmentType: garmentTypeEnum("garment_type").notNull(),
  eventDate: timestamp("event_date", { withTimezone: true }),
  appointmentType: appointmentTypeEnum("appointment_type").default("virtual"),
  preferredDate: timestamp("preferred_date", { withTimezone: true }),
  preferredTime: text("preferred_time"),
  inspiration: text("inspiration"),
  budget: text("budget"),
  message: text("message"),
  referenceImageUrl: text("reference_image_url"),
  status: consultationStatusEnum("status").default("pending"),
  internalNotes: text("internal_notes"),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lookbookItems = pgTable("lookbook_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  occasion: occasionEnum("occasion").notNull(),
  garmentType: garmentTypeEnum("garment_type").notNull(),
  description: text("description"),
  culturalContext: text("cultural_context"),
  fabrics: text("fabrics").array(),
  details: text("details").array(),
  featured: boolean("featured").default(false),
  priceNote: text("price_note"), // e.g. "Bespoke — quoted individually"
  currency: text("currency").default("KES"),
  coverImageUrl: text("cover_image_url"),
  altText: text("alt_text"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lookbookImages = pgTable("lookbook_images", {
  id: serial("id").primaryKey(),
  lookbookItemId: integer("lookbook_item_id").notNull().references(() => lookbookItems.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  position: integer("position").default(0),
  isPrivate: boolean("is_private").default(false), // client-only progress photos
});

export const rentalItems = pgTable("rental_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  occasion: occasionEnum("occasion").notNull(),
  garmentType: garmentTypeEnum("garment_type").notNull(),
  description: text("description"),
  sizes: text("sizes").array(),
  colors: text("colors").array(),
  deposit: text("deposit"), // editable, marked for review
  currency: text("currency").default("KES"),
  terms: text("terms"),
  careInstructions: text("care_instructions"),
  status: rentalStatusEnum("status").default("available"),
  coverImageUrl: text("cover_image_url"),
  altText: text("alt_text"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  position: integer("position").default(0),
  verified: boolean("verified").default(false), // flagged for owner review
});

export const journalPosts = pgTable("journal_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImageUrl: text("cover_image_url"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================================
// Zod schemas
// ============================================================================

export const consultationStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled", "rescheduled"]),
  internalNotes: z.string().optional(),
});

// ============================================================================
// Types
// ============================================================================

export type Consultation = typeof consultations.$inferSelect;
export type NewConsultation = typeof consultations.$inferInsert;
export type LookbookItem = typeof lookbookItems.$inferSelect;
export type NewLookbookItem = typeof lookbookItems.$inferInsert;
export type RentalItem = typeof rentalItems.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
export type User = typeof users.$inferSelect;
export type Client = typeof clients.$inferSelect;
