import { NextResponse } from "next/server";

const mockUsers = [
  {
    id: "1",
    email: "admin@gearbazar.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "vendor@gearbazar.com",
    password: "vendor123",
    role: "vendor",
    name: "Test Vendor",
    shopName: "Auto Parts Shop",
  },
  {
    id: "3",
    email: "user@gearbazar.com",
    password: "user123",
    role: "customer",
    name: "Test Customer",
  },
];

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      token: "mock-jwt-token-" + user.id,
      refreshToken: "mock-refresh-token-" + user.id,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        shopName: user.shopName || null,
      },
    },
  });
}
