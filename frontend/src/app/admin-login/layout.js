"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export default function AdminLoginLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in as admin
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.role === "admin") {
        router.push("/admin");
      }
    }
  }, [router]);

  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
