import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET(request, { params }) {
  const { id } = params;
  const product = mockProducts.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: product });
}
