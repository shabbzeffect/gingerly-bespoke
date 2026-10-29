import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverDb } from "@/lib/server-db";
import { mockDb, consultations } from "@/lib/db";


const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Please enter a phone number."),
  country: z.string().optional(),
  timeZone: z.string().default("Africa/Nairobi"),
  occasion: z.enum(["ruracio","nyombo","koito","bukhwi","white_wedding","bridesmaid","prom","birthday","anniversary","guest","other"]),
  garmentType: z.enum(["bridal_gown","traditional_attire","white_wedding","bridesmaid","prom","occasion_wear","menswear","senator_suit","other"]),
  eventDate: z.string().datetime({ message: "Please enter a valid event date." }).optional(),
  appointmentType: z.enum(["in_person","virtual"]).default("virtual"),
  preferredDate: z.string().datetime({ message: "Please enter a valid preferred date." }).optional(),
  preferredTime: z.string().optional(),
  inspiration: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  referenceImageUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;
    let createdId: number | null = null;

    const d = serverDb();
    if (d) {
      const result = await d.insert(consultations).values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country || null,
        timeZone: data.timeZone,
        occasion: data.occasion,
        garmentType: data.garmentType,
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        appointmentType: data.appointmentType,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredTime: data.preferredTime || null,
        inspiration: data.inspiration || null,
        budget: data.budget || null,
        message: data.message || null,
        referenceImageUrl: data.referenceImageUrl || null,
      }).returning({ id: consultations.id });
      createdId = result[0]?.id ?? null;
    } else {
      const row = await mockDb.insertConsultation({
        ...data,
        status: "pending",
        preferredTime: data.preferredTime ?? null,
        eventDate: data.eventDate ? new Date(data.eventDate).toISOString() : null,
        preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : null,
      });
      createdId = row.id;
    }

    return NextResponse.json({ ok: true, id: createdId }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Could not submit booking. Please try again." }, { status: 500 });
  }
}
