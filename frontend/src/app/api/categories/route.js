import { NextResponse } from "next/server";
import { mockCategories } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ success: true, data: mockCategories });
}
