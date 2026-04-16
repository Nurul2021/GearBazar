import { NextResponse } from "next/server";
import { mockUsers, mockVendors, mockAnalytics } from "@/lib/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  if (type === "vendors") {
    return NextResponse.json({ success: true, data: mockVendors });
  }

  return NextResponse.json({
    success: true,
    data: mockUsers.filter((u) => u.role !== "admin"),
  });
}
