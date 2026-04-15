/**
 * Protected Route Component
 * Wraps content requiring authentication
 */

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

export default function ProtectedRoute({ children, fallback = "/login" }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`${fallback}?redirect=${pathname}`);
    }
  }, [isAuthenticated, router, pathname, fallback]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
