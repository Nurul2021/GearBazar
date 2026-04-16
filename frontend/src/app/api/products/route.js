import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const search = searchParams.get("q");

  let products = [...mockProducts];

  if (category) {
    products = products.filter(
      (p) => p.category.name.toLowerCase() === category.toLowerCase(),
    );
  }

  if (featured === "true") {
    products = products.filter((p) => p.isFeatured);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  return NextResponse.json({ success: true, data: products });
}
