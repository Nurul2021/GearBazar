import { NextResponse } from "next/server";
import { mockOrders, mockProducts } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ success: true, data: mockOrders });
}

export async function POST(request) {
  const body = await request.json();
  const newOrder = {
    id: "ORD-" + String(mockOrders.length + 1).padStart(3, "0"),
    ...body,
    status: "processing",
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, data: newOrder });
}
