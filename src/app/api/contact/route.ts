import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = "/tmp/gps-leads.json";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  orgType: string;
  message: string;
  timestamp: string;
  status: "new" | "contacted" | "closed";
}

async function getLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone, organization, orgType } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      name,
      email,
      phone: phone || "",
      organization: organization || "",
      orgType: orgType || "",
      message,
      timestamp: new Date().toISOString(),
      status: "new",
    };

    // Save lead
    const leads = await getLeads();
    leads.unshift(lead);
    await saveLeads(leads);

    console.log(`[GPS Lead] New inquiry from ${name} (${email}) - ${organization}`);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("[GPS Contact Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
